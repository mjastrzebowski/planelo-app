import { Component, Input, } from '@angular/core';
import { Platform, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/core/auth/auth-service';

import { BillStore } from 'app/core/bill/bill-store';
import { ClientStore } from 'app/core/client/client-store';
import { NotificationStore } from 'app/core/notification/notification-store';
import { PlaceStore } from 'app/core/place/place-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';
import { WorkoutStore } from 'app/core/workout/workout-store';

import { TrainingCreateModal } from '../training-create/training-create';


@Component({
  templateUrl: 'training-list.html'
})
export class TrainingListPage {
  @Input() workouts: ReplaySubject<List<any>>;
  dates: any;
  trainings: any;
  clients: any;
  place: any;
  events: any;
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
    private trainerStore: TrainerStore,
    public placeStore: PlaceStore,
    public workoutStore: WorkoutStore,
    public auth: AuthService
  ) {
    this.dates = [];
    this.trainings = [];
    this.clients = [];

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
    this.refreshCalendar();
  }

  ngOnInit(): void {
    this.utils.presentLoading('Ładowanie treningów...');
    this.calendar = false;

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
      this.place = this.placeStore.list.get(0).id;
      this.startCalendar();
      this.utils.stopLoading();
    } else if (this.loaded.trainers) {
      this.startCalendar();
    }
  }

  isCalendarRendered(): boolean {
    return $('#calendar').hasClass('fc');
  }

  startCalendar(): void {
    if (!this.calendar && !this.isCalendarRendered()) {
      this.renderCalendar();
    } else {
      this.refreshCalendar();
    }
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

    let modal = this.modalCtrl.create(TrainingCreateModal, workout);
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
      this.refreshCalendar();
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

  refreshCalendar(): void {
    $('#calendar').fullCalendar('refetchResources');
    $('#calendar').fullCalendar('refetchEvents');
  }

  renderCalendar(): void {
    let options;
    options = {
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
      resources: this.calendarResources.bind(this),
      events: this.calendarEvents.bind(this),

      eventClick: this.calendarEvent.bind(this),
      select: this.calendarSelect.bind(this),
      eventDrop: this.calendarDrag.bind(this),
      eventRender: this.calendarTooltip.bind(this)
    };

    $('#calendar').fullCalendar(options);
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
    this.refreshCalendar();
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

  getWorkoutEvents(workouts, start, end, timezone?): any {
    let events = [];
    workouts.forEach(workout => {
      let title = workout.client.name + ' ' + workout.client.lastname;
      let event = {
        id: workout.key,
        resourceId: workout.trainerId,
        title: title,
        start: moment(workout.date + ' ' + workout.timeStart, 'YYYY-MM-DD HH:mm'),
        end: moment(workout.date + ' ' + workout.timeEnd, 'YYYY-MM-DD HH:mm'),
        description: workout.client.name + ' ' + workout.client.lastname,
        color: null
      };

      if (workout.completed) {
        event.color = 'red';
      }
      events.push(event);
    });
    return events;
  }

  getTrainerWorkingHourEvents(trainer, start, end, timezone?): any {
    if (!trainer.hours || !trainer.hours.length) {
      return [];
    }

    let events = [];
    this.utils.forEachDay(start, end).forEach(day => {
      let hours = trainer.days[day.day()];
      if (!hours) {
        return;
      }
      hours.forEach(hour => {
        let event = {
          id: 'available',
          resourceId: trainer.id,
          start: moment(day.format('YYYY-MM-DD') + ' ' + hour.start, 'YYYY-MM-DD HH:mm'),
          end: moment(day.format('YYYY-MM-DD') + ' ' + hour.end, 'YYYY-MM-DD HH:mm'),
          color: '#8fdf82',
          rendering: 'background'
        };
        events.push(event);
      });
    });
    return events;
  }

  getTrainerVacationEvents(trainer, start, end, timezone): any {
    if (!trainer.vacation || !trainer.vacation.length) {
      return [];
    }

    let events = [];
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
    return events;
  }

  calendarEvents(start?, end?, timezone?, callback?): any {
    if (!start || !end) {
      return [];
    }

    let workouts = this.workoutStore.filterBy({
      fixed: false,
      dateAfter: start,
      dateBefore: end,
      placeId: this.place
    });

    let events = [];
    events = events.concat(this.getWorkoutEvents(workouts, start, end, timezone));
    this.trainerStore.filterBy({ placeId: this.place }).forEach(trainer => {
      events = events.concat(this.getTrainerWorkingHourEvents(trainer, start, end, timezone));
      events = events.concat(this.getTrainerVacationEvents(trainer, start, end, timezone));
    });

    // TEMP - additional working hours
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

    return callback ? callback(events) : events;
  }

  calendarResources(callback: any): any {
    if (!this.trainerStore.list) {
      return;
    }

    let resources = [];
    this.trainerStore.list.forEach(trainer => {
      if (trainer.placeId !== this.place) {
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

  // calendarResourcesWithPlaces(callback: any): any {
  //   let resources = [];

  //   if (this.placeStore.size === 0) {
  //     callback([]);
  //     return false;
  //   }

  //   this.trainerStore.list.forEach(trainer => {
  //     let resource = {
  //       id: trainer.key,
  //       title: trainer.alias ? trainer.alias : trainer.title
  //     };
  //     resources.push(resource);
  //   });

  //   let i = 0, childrens = [];
  //   this.trainerStore.list.forEach(trainer => {
  //     if (i++ < 3) {
  //       let resource = {
  //         id: trainer.key,
  //         title: trainer.alias ? trainer.alias : trainer.title
  //       };
  //       childrens.push(resource);
  //     }
  //   });
  //   let place1 = this.placeStore.list.get(0);
  //   resources.push({
  //     id: place1.key,
  //     title: place1.title,
  //     children: childrens
  //   });

  //   i = 0;
  //   childrens = [];
  //   this.trainerStore.list.forEach(trainer => {
  //     if (i++ >= 3) {
  //       let resource = {
  //         id: trainer.key,
  //         title: trainer.alias ? trainer.alias : trainer.title
  //       };
  //       childrens.push(resource);
  //     }
  //   });
  //   let place2 = this.placeStore.list.get(1);
  //   resources.push({
  //     id: place2.key,
  //     title: place2.title,
  //     children: childrens
  //   });
  //   return callback ? callback(resources) : resources;
  // }
}
