import { Component, Input, Pipe } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/core/auth/auth-service';

import { ClientStore } from 'app/core/client/client-store';
import { NotificationStore } from 'app/core/notification/notification-store';
import { PlaceStore } from 'app/core/place/place-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';
import { WorkoutStore } from 'app/core/workout/workout-store';

import { TrainingReserveModal } from '../training-reserve/training-reserve';


@Pipe({
  name: 'groupWorkouts'
})
export class GroupWorkoutsPipe {
  transform(workouts) {
    if (workouts) {
      let lastMonth = null;
      moment.locale('pl');
      workouts.forEach((workout) => {
        workout.monthId = moment(workout.date).format('YYYYMM');
        if (lastMonth !== workout.monthId) {
          lastMonth = workout.monthId;
          workout.nextMonth = true;
          workout.month = moment(workout.date).format('MMMM').toUpperCase();
        }
      });
      return workouts;
    }
  }
}

@Component({
  templateUrl: 'training-list.html'
})
export class TrainingListClientPage {
  @Input() workouts: ReplaySubject<List<any>>;
  dates: any;
  trainings: any;
  clients: any;
  dayIndex: any;
  queryText: any;
  excludeTracks: any;
  filterTracks: any;
  shownSessions: any;
  place: any;
  events: any;
  forceSub: any;
  loaded: any;
  changeDate: any;
  currentDate: any;
  calendar: any;
  sub: any;
  subTrainers: any;
  subPlaces: any;
  editing: any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private utils: Utils,
    private clientStore: ClientStore,
    private notificationStore: NotificationStore,
    private placeStore: PlaceStore,
    private trainerStore: TrainerStore,
    public workoutStore: WorkoutStore,
    public auth: AuthService
  ) {
    this.dates = [];
    this.trainings = [];
    this.clients = [];
    this.dayIndex = 0;
    this.queryText = '';
    this.excludeTracks = [];
    this.filterTracks = [];
    this.shownSessions = 0;

    this.place = 1;
    this.events = [];
    this.forceSub = false;

    this.loaded = {
      places: false,
      trainers: false,
      workouts: false
    };
    let changeHour = 21;
    this.changeDate = new Date();
    this.changeDate.setHours(changeHour);
    this.changeDate.setMinutes(0);
    this.currentDate = new Date();
    if (this.currentDate.getHours() >= changeHour) {
      this.changeDate.setTime(this.changeDate.getTime() + 24*60*60*1000);
    }
  }

  ngOnInit(): void {
    this.utils.presentLoading('Ładowanie treningów...');
    this.sub = this.workoutStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.loaded = true;
      this.init();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  init(): void {
    this.utils.stopLoading();
  }

  showTrainingForm(workout): void {
    if (workout && workout.hasOwnProperty('key')) {
      this.editing = true;
    }

    let modal = this.modalCtrl.create(TrainingReserveModal, workout);
    modal.onDidDismiss(this.saveTraining.bind(this));
    modal.present();
  }

  saveTraining(data): void {
    if (data) {
      this.utils.presentLoading('Zapisywanie zmian...');

      if (data[0].hasOwnProperty('delete')) {
        data.forEach(training => {
          this.workoutStore.removeWorkout(training)
            .then((res) => {
              let notification = {
                workout: {
                  key: training.key,
                  trainer: training.trainerKey || '',
                  client: training.clientKey || '',
                  date: training.date.date || training.date || '',
                  dateTime: training.date.dateTime || training.dateTime || '',
                  timeStart: training.date.timeStart || training.timeStart || '',
                  timeEnd: training.date.timeEnd || training.timeEnd || '',
                  place: training.place || ''
                },
                admin: null,
                client: null
              };
              if (this.auth.isAdmin) {
                notification.admin = this.auth.key || true;
              } else if (this.auth.isClient) {
                notification.client = this.auth.key;
              }
              this.notificationStore.createNotification('workoutRemoved', notification);
            });
        });
        this.deleteTrainingAlert(data[0]);
      } else if (this.editing) {
        data.forEach(training => {
          let changes = {
            trainer: training.trainer || '',
            client: training.client || '',
            date: training.date.date || '',
            dateTime: training.date.dateTime || '',
            timeStart: training.date.timeStart || '',
            timeEnd: training.date.timeEnd || '',
            repeat: training.repeat || false,
            place: null
          };
          if (training.trainer) {
            changes.place = this.trainerStore.getItem(training.trainer).place;
          }
          this.workoutStore.updateWorkout(training, changes);
        });
      } else {
        let client = data[0].client || '';
        data.forEach(training => {
          let place = this.trainerStore.getItem(training.trainer).place;
          this.workoutStore.createWorkout(
            place,
            training.trainer || '',
            client,
            training.date.date || '',
            training.date.dateTime || '',
            training.date.timeStart || '',
            training.date.timeEnd || '',
            training.repeat || false)
            .then((res) => {
              let notification = {
                workout: {
                  // key: res.getKey(),
                  trainer: training.trainer || '',
                  client: client || '',
                  date: training.date.date || '',
                  dateTime: training.date.dateTime || '',
                  timeStart: training.date.timeStart || '',
                  timeEnd: training.date.timeEnd || '',
                  place: place || ''
                },
                admin: null,
                client: null
              };
              if (this.auth.isAdmin) {
                notification.admin = this.auth.key || true;
              } else if (this.auth.isClient) {
                notification.client = this.auth.key;
              }
              this.notificationStore.createNotification('workoutAdded', notification);
            });
        });

        this.saveTrainingAlert(data[0]);
      }
      this.utils.stopLoading();
    }
  }

  saveTrainingAlert(workout): void {
    if (this.auth.isClient) {
      let alert = this.alertCtrl.create({
        title: 'Dodano',
        message: 'Twój trening w terminie <strong>' + workout.date.dateTime + '</strong> został dodany.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  deleteTraining(workout): void {
    workout.delete = true;
    this.saveTraining([workout]);
  }

  deleteTrainingAlert(workout): void {
    if (this.auth.isClient) {
      let alert = this.alertCtrl.create({
        title: 'Odwołano',
        message: 'Twój trening został odwołany.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  deleteTrainingLate(workout): void {
    let prompt = this.alertCtrl.create({
      title: 'Podaj powód',
      message: "Trening można odwołać do godz. 21:00 dnia poprzedzającego termin. Po tym czasie należy podać powód, a zwrot zostanie indywidualnie rozpatrzony zgodnie z zasadami studia.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Powód odwołania'
        },
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {}
        },
        {
          text: 'Odwołaj',
          handler: data => {
            let date = moment().format('DD.MM.YYYY, HH:mm');
            this.workoutStore.updateWorkout(workout, {
              completed: '[' + date + '] ' + data.title
            });
            this.deleteTrainingAlert(workout);
          }
        }
      ]
    });
    prompt.present();
  }

  getEvents(start?, end?, timezone?, callback?): any {
    let events = [];
    this.workoutStore.list.forEach(workout => {
      if (workout.fixed || workout.timeStart === '' ||
        (start && workout.date < start.format('YYYY-MM-DD')) || (end && workout.date > end.format('YYYY-MM-DD'))) {
        return;
      }

      let client = this.clientStore.getItem(workout.clientId);
      let title = client.name + ' ' + client.lastname;
      let event = {
        id: workout.key,
        resourceId: workout.trainerId,
        title: title,
        start: workout.date + 'T' + workout.timeStart,
        end: workout.date + 'T' + workout.timeEnd,
        description: client.name + ' ' + client.lastname,
        color: null
      };

      if (workout.completed) {
        event.color = 'red';
      } else if (this.auth.isTrainer && workout.trainerId === this.auth.id) {
        event.color = this.auth.color;
      }
      events.push(event);
    });

    if (this.auth.isAdmin) {
      let hours = [
        { timeStart: '7:00', timeEnd: '08:00' },
        { timeStart: '8:00', timeEnd: '09:00' },
        { timeStart: '9:00', timeEnd: '10:00' },
        { timeStart: '10:00', timeEnd: '11:00' },
        { timeStart: '11:00', timeEnd: '12:00' },
        { timeStart: '12:00', timeEnd: '13:00' },
        { timeStart: '13:00', timeEnd: '14:00' },
        { timeStart: '16:00', timeEnd: '17:00' },
        { timeStart: '17:00', timeEnd: '18:00' },
        { timeStart: '18:00', timeEnd: '19:00' },
        { timeStart: '19:00', timeEnd: '20:00' },
        { timeStart: '20:00', timeEnd: '21:00' },
        { timeStart: '21:00', timeEnd: '22:00' }
      ];

      this.trainerStore.list.forEach(trainer => {
        for (let d = 1; d <= 62; d++) {
          let date = new Date('2017-01-01');
          date.setDate(d);
          let day = '' + date.getDate();
          if (parseInt(day) < 10) {
            day = '0' + day;
          }
          let year = 2016;
          let month = (date.getMonth()+1) + '';
          if (parseInt(month) > 12) {
            month = '1';
          }
          if (parseInt(month) < 10) {
            month = '0' + month;
            year = 2017;
          }
          let weekDay = date.getDay()-1;

          if (trainer.hours && trainer.hours[weekDay]) {
            hours.forEach(hour => {
              if (trainer.hours[weekDay][hour.timeStart]) {
                let time = hour.timeStart;
                if (time === '7:00' || time === '8:00' || time === '9:00') {
                  time = '0' + hour.timeStart;
                }
                let working = {
                  id: 'available',
                  resourceId: trainer.key,
                  start: year + '-' + month + '-' + day + 'T'+ time,
                  end: year + '-' + month + '-' + day + 'T'+ hour.timeEnd,
                  color: '#8fdf82',
                  rendering: 'background'
                };
                events.push(working);
              }
            });
          }
        }

        if (trainer.vacation) {
          trainer.vacation.forEach(vacation => {
            let event = {
              start: vacation.start,
              end: vacation.end,
              overlap: false,
              rendering: 'background',
              color: '#ff9f89',
              resourceId: trainer.key
            };
            events.push(event);
          });
        }
      });

      let w = [{
        id: 'available',
        resourceId: '-KEiiFLK6kxKsJoTGjKU',
        start: '2017-01-06T08:00',
        end: '2017-01-06T14:00',
        color: '#8fdf82',
        rendering: 'background'
      },{
        id: 'available',
        resourceId: '-KGHHXLT2oypqidXcL2T',
        start: '2017-02-04T08:00',
        end: '2017-02-04T13:00',
        color: '#8fdf82',
        rendering: 'background'
      },{
        id: 'available',
        resourceId: '-KGHHXLT2oypqidXcL2T',
        start: '2017-01-21T08:00',
        end: '2017-01-21T13:00',
        color: '#8fdf82',
        rendering: 'background'
      },{
        id: 'available',
        resourceId: 9,
        start: '2017-01-28T08:00',
        end: '2017-01-28T13:00',
        color: '#8fdf82',
        rendering: 'background'
      }];
      events.push(w[0]);
      events.push(w[1]);
      events.push(w[2]);
      events.push(w[3]);
    }

    return callback ? callback(events) : events;
  }

  getResources(callback: any): any {
    let resources = [];
    if (!this.trainerStore.list) {
      return;
    }

    this.trainerStore.list.forEach(trainer => {
      if (trainer.placeId !== parseInt(this.place)) {
        return;
      }

      let resource = {
        id: trainer.id,
        title: trainer.alias ? trainer.alias : trainer.name,
        eventColor: trainer.color
      };
      resources.push(resource);
    });

    return callback ? callback(resources) : resources;
  }

  getResourcesWithPlaces(callback: any): any {
    let resources = [];

    if (this.placeStore.size === 0) {
      callback([]);
      return false;
    }

    this.trainerStore.list.forEach(trainer => {
      let resource = {
        id: trainer.key,
        title: trainer.alias ? trainer.alias : trainer.title
      };
      resources.push(resource);
    });

    let i = 0, childrens = [];
    this.trainerStore.list.forEach(trainer => {
      if (i++ < 3) {
        let resource = {
          id: trainer.key,
          title: trainer.alias ? trainer.alias : trainer.title
        };
        childrens.push(resource);
      }
    });
    let place1 = this.placeStore.list.get(0);
    resources.push({
      id: place1.key,
      title: place1.title,
      children: childrens
    });

    i = 0;
    childrens = [];
    this.trainerStore.list.forEach(trainer => {
      if (i++ >= 3) {
        let resource = {
          id: trainer.key,
          title: trainer.alias ? trainer.alias : trainer.title
        };
        childrens.push(resource);
      }
    });
    let place2 = this.placeStore.list.get(1);
    resources.push({
      id: place2.key,
      title: place2.title,
      children: childrens
    });
    return callback ? callback(resources) : resources;
  }
}
