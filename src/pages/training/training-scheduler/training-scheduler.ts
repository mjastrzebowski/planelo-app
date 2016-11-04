import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { TrainingSchedulerFormModal } from '../training-scheduler-form/training-scheduler-form'


@Component({
  templateUrl: 'training-scheduler.html'
})
export class TrainingSchedulerPage {
  @Input() workouts: ReplaySubject<List<any>>;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private utils: Utils,
    private workoutStore: WorkoutStore,
    private clientStore: ClientStore,
    private placeStore: PlaceStore,
    private trainerStore: TrainerStore,
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

    this.place = '-KBHukjV0l8M-EkpTdI4';
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

  onPlaceChanged(event?): void {
    this.refreshCalendar(true);
  }

  ngOnInit(): void {
    this.utils.presentLoading('Ładowanie stałych treningów...');
    this.calendar = false;

    if (this.auth.isTrainer) {
      this.place = this.auth.place;
    }

    this.sub = this.workoutStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.loaded.workouts = true;
      this.init();
    });
    this.subTrainers = this.trainerStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.loaded.trainers = true;
      this.init();
    });
    this.subPlaces = this.placeStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.loaded.places = true;
      this.init();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subPlaces) {
      this.subPlaces.unsubscribe();
    }
    if (this.subTrainers) {
      this.subTrainers.unsubscribe();
    }
  }

  init(): void {
    if (this.loaded.trainers) {
      if (this.auth.isOwner || this.auth.isTrainer) {
        if (!this.calendar) {
          this.renderCalendar();
        } else {
          this.refreshCalendar();
        }
      }
    }

    if (this.loaded.places && this.loaded.trainers && this.loaded.workouts) {
      this.renderCalendar();
      this.utils.stopLoading();
    }
  }

  showTrainingSchedulerForm(workout): void {
    if (workout && workout.hasOwnProperty('key')) {
      this.editing = true;
    } else {
      this.editing = false;
    }

    let modal = this.modalCtrl.create(TrainingSchedulerFormModal, workout);
    modal.onDidDismiss(this.saveTraining.bind(this));
    setTimeout(() => {
      modal.present();
    }, 500);
  }

  saveTraining(data): void {
    if (data) {
      this.utils.presentLoading('Zapisywanie zmian...');

      if (data[0].hasOwnProperty('delete')) {
        data.forEach(training => {
          this.workoutStore.removeWorkout(training);
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
            fixed: true
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
            training.repeat || false,
            true);
        });

        this.saveTrainingAlert(data[0]);
      }
      this.refreshCalendar(true);
      setTimeout(() => {
        this.utils.stopLoading();
      }, 500);
    }
  }

  saveTrainingAlert(workout): void {
    if (this.auth.isClient) {
      let alert = this.alertCtrl.create({
        title: 'Dodano',
        message: 'Twój trening w terminie <strong>' + workout.date.dateTime + '</strong> został dodany.',
        buttons: ['Ok']
      });
      setTimeout(() => {
        alert.present();
      }, 1000);
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
      setTimeout(() => {
        alert.present();
      }, 1000);
    }
  }

  deleteTrainingLate(workout): void {
    let prompt = this.alertCtrl.create({
      title: 'Podaj powód',
      message: 'Trening można odwołać do godz. 21:00 dnia poprzedzającego termin. Po tym czasie należy podać powód, a zwrot zostanie indywidualnie rozpatrzony zgodnie z zasadami studia.',
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
    setTimeout(() => {
      prompt.present();
    }, 500);
  }

  refreshCalendar(force): void {
    let events = this.getEvents();

    if (!force && events.length === this.events.length) {
      return;
    }

    this.events = events;

    $('#scheduler-calendar').fullCalendar('refetchEvents');
    $('#scheduler-calendar').fullCalendar('refetchResources');
  }

  renderCalendar(): void {
    let baseDate = new Date('2016-06-05');
    let weekDay = (new Date()).getDay() || 7;
    baseDate.setDate(baseDate.getDate() + weekDay);
    let calendarOptions = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      now: baseDate,
      contentHeight: 'auto',
      lang: 'pl',

      allDaySlot: false,
      slotLabelFormat: 'HH:mm',
      scrollTime: '07:30',
      minTime: '07:00:00',
      maxTime: '23:00:00',
      firstDay: 1,
      nowIndicator: true,
      hiddenDays: [ 0 ],
      businessHours: {
        start: '08:00',
        end: '22:00',
        dow: [ 1, 2, 3, 4, 5 ]
      },

      eventOverlap: true,
      editable: true,
      eventDurationEditable: false,
      eventLimit: true,
      selectable: true,
      selectHelper: false,

      header: {
        left: '',
        center: '',
        right: ''
      },
      defaultView: 'agendaWeek',
      views: {
        agendaWeek: {
          groupByResource: true,
          groupByDateAndResource: true
        }
      },
      resourceLabelText: 'Trenerzy',
      resources: this.getResources.bind(this),
      events: this.getEvents.bind(this),

      eventClick: this.calendarEvent.bind(this),
      select: this.calendarSelect.bind(this),
      eventDrop: this.calendarDrag.bind(this)
    };

    $('#scheduler-calendar').fullCalendar(calendarOptions);
    this.calendar = true;
  }

  calendarDrag(event, delta, revertFunc): void {
    let index = this.workoutStore.findIndex(event.id);
    let workout = this.workoutStore.list.get(index);
    let changes = {
      trainer: event.resourceId,
      date: event.start.format('YYYY-MM-DD'),
      dateTime: event.start.format('YYYY-MM-DD') + ' ' + event.start.format('HH:00'),
      timeStart: event.start.format('HH:00'),
      timeEnd: event.start.add(1, 'hours').format('HH:00')
    };

    if (confirm('Czy na pewno przenieść stały trening?')) {
      this.workoutStore.updateWorkout(workout, changes);
    }
    this.refreshCalendar(true);
  }

  calendarSelect(start, end, event, view, resource): void {
    let workout = {
      trainerKey: resource.id,
      date: start.format('YYYY-MM-DD'),
      dateTime: start.format('YYYY-MM-DD') + ' ' + start.format('HH:00'),
      timeStart: start.format('HH:00'),
      timeEnd: start.add(1, 'hours').format('HH:00')
    };
    this.showTrainingSchedulerForm(workout);
  }

  calendarEvent(event): void {
    let index = this.workoutStore.findIndex(event.id);
    let workout = this.workoutStore.list.get(index);
    this.showTrainingSchedulerForm(workout);
  }

  showActionSheet(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Zmiana treningu',
      buttons: [
        {
          text: 'Usuń',
          role: 'destructive',
          handler: () => {}
        },{
          text: 'Edytuj',
          handler: () => {}
        },{
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

    setTimeout(() => {
      actionSheet.present();
    }, 500);
  }

  getEvents(start, end, timezone, callback): any {
    let events = [];
    this.workoutStore.list.forEach(workout => {
      if (!workout.fixed || workout.placeKey !== this.place) {
        return;
      }

      let client = this.clientStore.getItem(workout.clientKey);
      let title = client.name + ' ' + client.lastname;

      let event = {
        id: workout.key,
        resourceId: workout.trainerKey,
        title: title,
        start: workout.date + 'T' + workout.timeStart,
        end: workout.date + 'T' + workout.timeEnd,
        constraint: 'businessHours'
      };

      if (workout.completed) {
        event.color = 'red';
      }
      events.push(event);
    });

    if (this.auth.isOwner) {
      let hours = [
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
        for (let d = 6; d <= 12; d++) {
          let date = new Date('2016-06-06');
          date.setDate(d);
          let day = date.getDate();
          if (day < 10) {
            day = '0' + day;
          }
          let month = date.getMonth()+1;
          if (month < 10) {
            month = '0' + month;
          }
          let weekDay = date.getDay()-1;

          if (trainer.hours[weekDay]) {
            hours.forEach(hour => {
              if (trainer.hours[weekDay][hour.timeStart]) {
                let time = hour.timeStart;
                if (time === '8:00' || time === '9:00') {
                  time = '0' + hour.timeStart;
                }
                let working = {
                  id: 'available',
                  resourceId: trainer.key,
                  start: '2016-' + month + '-' + day + 'T'+ time,
                  end: '2016-' + month + '-' + day + 'T'+ hour.timeEnd,
                  color: '#8fdf82',
                  rendering: 'background'
                };
                events.push(working);
              }
            });
          }
        }
      });
    }

    return callback ? callback(events) : events;
  }

  getResources(callback: any): any {
    let resources = [];

    this.trainerStore.list.forEach(trainer => {
      if (trainer.place !== this.place) {
        return;
      }

      let resource = {
        id: trainer.key,
        title: trainer.alias ? trainer.alias : trainer.title,
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
