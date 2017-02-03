import { Component, Input, Pipe } from '@angular/core';
import { Platform, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';

import { BillStore } from '../../../core/bill/bill-store';
import { ClientStore } from '../../../core/client/client-store';
import { NotificationStore } from '../../../core/notification/notification-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { TrainingCreateModal } from '../training-create/training-create';
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
export class TrainingListPage {
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
    private platform: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private utils: Utils,
    private billStore: BillStore,
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
    this.utils.presentLoading('Ładowanie treningów...');
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
    if (this.loaded.places && this.loaded.trainers && this.loaded.workouts) {
      if (this.auth.isOwner || this.auth.isTrainer) {
        if (!this.calendar && !this.isCalendarRendered()) {
          this.renderCalendar();
        } else {
          this.refreshCalendar();
        }
      }
      this.utils.stopLoading();
    } else if (this.loaded.trainers && (this.auth.isOwner || this.auth.isTrainer)) {
      if (!this.calendar && !this.isCalendarRendered()) {
        this.renderCalendar();
      } else {
        this.refreshCalendar();
      }
    }
  }

  isCalendarRendered(): boolean {
    return $('#calendar').hasClass('fc');
  }

  // updateRepeat() {
  //   this.billStore.list.forEach(bill => {
  //     if (bill.month === '2017-01') {
  //       this.billStore.createBill(
  //         bill.client,
  //         '2017-02',
  //         bill.discount);
  //     }
  //   });
  // }
  // }
  //   this.workoutStore.list.forEach(workout => {
  //     //   // console.log(workout);

  //     //   // this.billStore.createBill(
  //     //   //   bill.client,
  //     //   //   '2016-11',
  //     //   //   bill.discount);

  //     if (workout.date === '2016-06-11' && workout.fixed) {
  //       let newDate0 = '2017-02-04';
  //       let newDateTime0 = newDate0 + ' ' + workout.timeStart;
  //       this.workoutStore.createWorkout(
  //         workout.placeKey,
  //         workout.trainerKey || '',
  //         workout.clientKey,
  //         newDate0 || '',
  //         newDateTime0 || '',
  //         workout.timeStart || '',
  //         workout.timeEnd || '',
  //         true);

  //       let newDate1 = '2017-02-11';
  //       let newDateTime1 = newDate1 + ' ' + workout.timeStart;
  //       this.workoutStore.createWorkout(
  //         workout.placeKey,
  //         workout.trainerKey || '',
  //         workout.clientKey,
  //         newDate1 || '',
  //         newDateTime1 || '',
  //         workout.timeStart || '',
  //         workout.timeEnd || '',
  //         true);

  //       let newDate2 = '2017-02-18';
  //       let newDateTime2 = newDate2 + ' ' + workout.timeStart;
  //       this.workoutStore.createWorkout(
  //         workout.placeKey,
  //         workout.trainerKey || '',
  //         workout.clientKey,
  //         newDate2 || '',
  //         newDateTime2 || '',
  //         workout.timeStart || '',
  //         workout.timeEnd || '',
  //         true);

  //       let newDate3 = '2017-02-25';
  //       let newDateTime3 = newDate3 + ' ' + workout.timeStart;
  //       this.workoutStore.createWorkout(
  //         workout.placeKey,
  //         workout.trainerKey || '',
  //         workout.clientKey,
  //         newDate3 || '',
  //         newDateTime3 || '',
  //         workout.timeStart || '',
  //         workout.timeEnd || '',
  //         true);

  //       // let newDate4 = '2017-01-31';
  //       // let newDateTime4 = newDate4 + ' ' + workout.timeStart;
  //       // this.workoutStore.createWorkout(
  //       //   workout.placeKey,
  //       //   workout.trainerKey || '',
  //       //   workout.clientKey,
  //       //   newDate4 || '',
  //       //   newDateTime4 || '',
  //       //   workout.timeStart || '',
  //       //   workout.timeEnd || '',
  //       //   true);
  //     }
  //   });
  // }


  showTrainingForm(workout): void {
    // this.updateRepeat();
    if (workout && workout.hasOwnProperty('key')) {
      this.editing = true;
    } else {
      this.editing = false;
    }

    let modal = null;
    if (this.auth.isOwner) {
      modal = this.modalCtrl.create(TrainingCreateModal, workout);
    } else {
      modal = this.modalCtrl.create(TrainingReserveModal, workout);
    }

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
                owner: null,
                client: null
              };
              if (this.auth.isOwner) {
                notification.owner = this.auth.key || true;
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
                  key: res.getKey(),
                  trainer: training.trainer || '',
                  client: client || '',
                  date: training.date.date || '',
                  dateTime: training.date.dateTime || '',
                  timeStart: training.date.timeStart || '',
                  timeEnd: training.date.timeEnd || '',
                  place: place || ''
                },
                owner: null,
                client: null
              };
              if (this.auth.isOwner) {
                notification.owner = this.auth.key || true;
              } else if (this.auth.isClient) {
                notification.client = this.auth.key;
              }
              this.notificationStore.createNotification('workoutAdded', notification);
            });
        });

        this.saveTrainingAlert(data[0]);
      }
      this.refreshCalendar(true);
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

  refreshCalendar(force?): void {
    let events = this.getEvents();

    if (!force && events.length === this.events.length) {
      return;
    }

    this.events = events;

    $('#calendar').fullCalendar('refetchEvents');
    $('#calendar').fullCalendar('refetchResources');
  }

  renderCalendar(): void {
    let calendarOptions;
    if (this.auth.isOwner) {
      calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',
        locale: 'pl',
        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '23:00:00',
        firstDay: 1,
        hiddenDays: [ 0 ],
        nowIndicator: true,
        businessHours: {
          start: '07:00',
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
          left: 'today prev,next',
          center: 'title',
          right: 'agendaDay,agendaTwoDay,agendaWeek'
        },
        defaultView: 'agendaTwoDay',
        views: {
          agendaDay: {
            titleFormat: 'dddd, DD MMMM YYYY',
          },
          agendaTwoDay: {
            type: 'agenda',
            titleFormat: 'dddd, DD MMM YYYY',
            duration: { days: 2 },
            groupByResource: true,
            groupByDateAndResource: true
          },
          agendaWeek: {
            groupByResource: true,
            groupByDateAndResource: true
          }
        },
        // resourceGroupField: 'place',
        resourceLabelText: 'Trenerzy',
        resources: this.getResources.bind(this),
        events: this.getEvents.bind(this),

        eventClick: this.calendarEvent.bind(this),
        select: this.calendarSelect.bind(this),
        eventDrop: this.calendarDrag.bind(this),
        eventRender: this.calendarTooltip.bind(this)
      };
    } else if (this.auth.isTrainer) {
      calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',
        locale: 'pl',
        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '23:00:00',
        firstDay: 1,
        hiddenDays: [ 0 ],
        nowIndicator: true,
        businessHours: {
          start: '07:00',
          end: '22:00',
          dow: [ 1, 2, 3, 4, 5 ]
        },

        eventOverlap: false,
        editable: false,
        eventLimit: true,
        selectable: false,
        selectHelper: false,
        header: {
          left: 'today prev,next',
          center: 'title',
          right: 'agendaDay,agendaTwoDay,agendaWeek'
        },
        defaultView: 'agendaTwoDay',
        views: {
          agendaTwoDay: {
            type: 'agenda',
            duration: { days: 2 }
          }
        },
        events: this.getEvents.bind(this)
      };
    }

    $('#calendar').fullCalendar(calendarOptions);
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

    if (confirm('Czy na pewno przenieść trening?')) {
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

    this.showTrainingForm(workout);
  }

  calendarEvent(event): void {
    let index = this.workoutStore.findIndex(event.id);
    let workout = this.workoutStore.list.get(index);
    let title = event.title + ' • ' + event.start.format('DD.MM.YYYY, HH:mm');
    if (workout.completed) {
      title += ' • Powód odwołania: ' + workout.completed;
    }
    this.showActionSheet(workout, title);
  }

  calendarTooltip(event, element, view): void {
    if (view.type === 'agendaWeek') {
      element.qtip({
        content: event.description,
        position: {
          my: 'top center',
          at: 'bottom center'
        },
        style: {
          classes: 'qtip-light qtip-rounded qtip-shadow'
        }
      });
    }
  }

  showActionSheet(workout, title): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Usuń',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deleteTraining(workout);
          }
        },{
          text: 'Edytuj',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.showTrainingForm(workout);
          }
        },{
          text: 'Anuluj',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {}
        }
      ]
    });

    actionSheet.present();
  }

  getEvents(start?, end?, timezone?, callback?): any {
    let events = [];
    this.workoutStore.list.forEach(workout => {
      if (workout.fixed || workout.timeStart === '' ||
        (start && workout.date < start.format('YYYY-MM-DD')) || (end && moment(workout.date) >= end.format('YYYY-MM-DD'))) {
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
        description: client.name + ' ' + client.lastname,
        color: null
      };

      if (workout.completed) {
        event.color = 'red';
      } else if (this.auth.isTrainer && workout.trainerKey === this.auth.key) {
        event.color = this.auth.color;
      }
      events.push(event);
    });

    if (this.auth.isOwner) {
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
          let month = '' + date.getMonth()+1;
          if (parseInt(month) > 12) {
            month = '1';
          }
          if (parseInt(month) < 10) {
            month = '0' + month;
            year = 2017;
          }
          let weekDay = date.getDay()-1;

          if (trainer.hours[weekDay]) {
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
        resourceId: '-KGHHXLT2oypqidXcL2T',
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
