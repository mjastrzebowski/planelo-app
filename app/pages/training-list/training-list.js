import {IonicApp, Page, Modal, Alert, ActionSheet, Toast, NavController} from 'ionic/ionic';
import {Toast} from 'ionic-angular';

import { ChangeDetectionStrategy, Input } from 'angular2/core';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';
import { WorkoutStore } from '../../core/workout/workout-store';
import { WorkoutService } from '../../core/workout/workout-service';

import {TrainingFormModal} from '../training-form/training-form'
// import {TrainingDetailPage} from '../training-detail/training-detail';

@Page({
  templateUrl: 'build/pages/training-list/training-list.html'
})
export class TrainingListPage {
  @Input() workouts: ReplaySubject<List<any>>;

  constructor(app: IonicApp, nav: NavController, auth: AuthService, workoutStore: WorkoutStore, workoutService: WorkoutService) {
    this.app = app;
    this.nav = nav;
    this.auth = auth;
    this.workoutStore = workoutStore;
    this.workoutService = workoutService;

    this.dates = [];
    this.trainings = [];
    this.clients = [];
    this.segment = 'list';
    this.dayIndex = 0;
    this.queryText = '';
    this.excludeTracks = [];
    this.filterTracks = [];
    this.shownSessions = 0;

    this.events = [];

    this.loaded = false;
    let changeHour = 21;
    this.changeDate = new Date();
    this.changeDate.setHours(changeHour);
    this.changeDate.setMinutes(0);
    this.currentDate = new Date();
    if (this.currentDate.getHours() >= changeHour) {
      this.changeDate.setTime(this.changeDate.getTime() + 24*60*60*1000);
    }
    // this.lastDate = new Date('2016-05-01');
  }

  // updateTrainings() {
  //   this.shownSessions = this.trainings.length;
  //   this.groupTrainings();
  // }

  // groupTrainings() {
  //   this.dates = [];
  //   this.trainings.map(training => {
  //     if (!this.dates[training.date]) {
  //       this.dates[training.date] = [];
  //     }
  //     this.dates[training.date].push(training);
  //   });
  //   this.dates = Object.keys(this.dates).map(key => this.dates[key]);
  // }

  // updateClients() {
  //   this.shownSessions = 0;
  //   this.trainings.map(training => {
  //     // if (!training.client.hasOwnProperty('name')) {
  //       // let username = training.client;
  //       training.client = this.clients[training.client];
  //       // training.client.username = username;
  //     // }

  //     training.hide = false;
  //     if (this.queryText) {
  //       let clientName = training.client.name.toLowerCase();
  //       let filter = this.queryText.toLowerCase();
  //       training.hide = (clientName.indexOf(filter) === -1);
  //     }

  //     if (!training.hide) {
  //       this.shownSessions++;
  //     }
  //   });
  // }

  // goToTrainingDetail(training) {
  //   // go to the training detail page
  //   // and pass in the training data
  //   this.nav.push(TrainingDetailPage, training);
  // }

  // getTrainings() {
  //   this.trainingData.getTrainings().then(trainings => {
  //     this.trainings = trainings;
  //     this.updateTrainings();
  //     if (!this.clients || this.clients.length === 0) {
  //       this.getClients();
  //     }
  //   });
  // }

  // getClients() {
  //   this.clientData.getClients().then(clients => {
  //     this.clients = clients;
  //     this.updateClients();
  //   });
  // }



  updateRepeat() {
    // this.workoutStore.list.forEach(workout => {
      // if (workout.date === '2016-05-02' || workout.date === '2016-05-03') {
        // this.workoutService.deleteWorkout(workout);
      // }
    // });
  }


  showTrainingForm(workout) {
    // this.updateRepeat();
    // console.log('koniec apdejtu');
    // return;
    if (workout && workout.hasOwnProperty('key')) {
      this.editing = true;
    } else {
      this.editing = false;
    }

    let modal = Modal.create(TrainingFormModal, workout);
    modal.onDismiss(this.saveTraining.bind(this));
    // setTimeout(() => {
      this.nav.present(modal);
    // }, 500);
  }

  saveTraining(data) {
    console.log('closed training modal with data: ', data);
    if (data) {
      if (data[0].hasOwnProperty('delete')) {
        data.forEach(training => {
          this.workoutService.deleteWorkout(training);
        });
        this.deleteTrainingAlert(data[0]);
      } else if (this.editing) {
        console.log('saveTraining editing', data);
        // debugger;
        data.forEach(training => {
          this.workoutService.updateWorkout(training, {
            // place: data.place || '-KBHukjV0l8M-EkpTdI4',
            trainer: training.trainer || '',
            client: training.client || '',
            date: training.date.date || '',
            dateTime: training.date.dateTime || '',
            timeStart: training.date.timeStart || '',
            timeEnd: training.date.timeEnd || '',
            repeat: training.repeat || false
          });
        });
      } else {
        console.log('saveTraining adding', data);
        let place = data[0].place || '-KBHukjV0l8M-EkpTdI4';
        let client = data[0].client || '';
        data.forEach(training => {
          this.workoutService.createWorkout(
            place,
            training.trainer || '',
            client,
            training.date.date || '',
            training.date.dateTime || '',
            training.date.timeStart || '',
            training.date.timeEnd || '',
            training.repeat || false);
        });

        this.saveTrainingAlert(data[0]);
      }
      this.refreshCalendar(true);
    }
  }

  saveTrainingAlert(workout) {
    if (this.auth.isClient) {
      let alert = Alert.create({
        title: 'Dodano',
        message: 'Twój trening w terminie <strong>' + workout.date.dateTime + '</strong> został dodany.',
        buttons: ['Ok']
      });
      setTimeout(() => {
        this.nav.present(alert);
      }, 1000);
    } else {
      // debugger;
      // let toast = Toast.create({
      //   message: 'Trening zapisany',
      //   duration: 3000
      // });
      // this.nav.present(toast);
    }
  }

  deleteTraining(workout) {
    workout.delete = true;
    this.saveTraining([workout]);
  }

  deleteTrainingAlert(workout) {
    if (this.auth.isClient) {
      let alert = Alert.create({
        title: 'Odwołano',
        message: 'Twój trening został odwołany.',
        buttons: ['Ok']
      });
      setTimeout(() => {
        this.nav.present(alert);
      }, 1000);
    } else {
      // debugger;
      // let toast = Toast.create({
      //   message: 'Trening usunięty',
      //   duration: 3000
      // });
      // this.nav.present(toast);
    }
  }

  deleteTrainingLate(workout) {
    let prompt = Alert.create({
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
          handler: data => {
            console.log('Prompt cancel clicked');
          }
        },
        {
          text: 'Odwołaj',
          handler: data => {
            // console.log('Saved clicked');
            this.workoutService.updateWorkout(workout, {
              completed: data.title
            });
            this.deleteTrainingAlert(workout);
          }
        }
      ]
    });
    setTimeout(() => {
      this.nav.present(prompt);
    }, 500);
  }

  segmentChange() {
    if (this.segment === 'calendar') {
      if (!this.calendar) {
        this.renderCalendar();
      } else {
        this.refreshCalendar();
      }
    }
  }

  onPageLoaded() {
    setTimeout(() => {
      this.loaded = true;
      console.log('test onpageloaded');
    }, 2000);

    this.calendar = false;

    let asub = this.auth.subscribe((authenticated: boolean) => {
      // if (asub) {
      //   asub.unsubscribe();
      // }

      this.workouts = this.workoutStore.workouts;
      if (this.auth.isTrainer || this.segment === 'calendar') {
        let sub = this.workouts.subscribe(() => {
          if (sub) {
            sub.unsubscribe();
          }

          if (!this.calendar) {
            console.log('test sub render');
            this.renderCalendar();
          } else {
            console.log('test sub refresh');
            this.refreshCalendar();
          }
        });
      }

      // if (this.auth.isClient) {
      //   this.workouts.subscribe(() => {
      //     this.trainings = this.workoutStore.workouts;
      //   });
      // }
    });
    // this.showTrainingForm();
  }

  refreshCalendar(force) {
    var events = this.getEvents();
    // debugger;
    if (!force && events.length === this.events.length) {
      return;
    }
    console.log('test refreshCalendar', this.calendar);
    this.events = events;

    // var ev = this.getEvents();
    // var res = this.getResources();
    // refetch events
    $('#calendar').fullCalendar('refetchEvents');
    // refetch resources
    $('#calendar').fullCalendar('refetchResources');
    // $('#calendar').fullCalendar('changeView', 'agendaDay');
  }

  renderCalendar() {
    console.log('test renderCalendar', this.calendar);

    if (this.auth.isOwner) {
      let calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',

        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '22:00:00',
        firstDay: 1,
        businessHours: {
          start: '08:00',
          end: '21:00',
          dow: [ 1, 2, 3, 4, 5 ]
        },

        eventOverlap: false,
        editable: false,
        eventLimit: true,
        selectable: true,
        selectHelper: false,

        header: {
          left: 'today prev,next',
          center: 'title',
          right: 'agendaDay,agendaTwoDay,agendaWeek,agendaWeek2,month'
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
            groupByResource: true
          },
          agendaWeek2: {
            type: 'agenda',
            duration: { days: 7 },
            groupByResource: true,
            groupByDateAndResource: true
          }
        },
        // resourceGroupField: 'place',
        resourceLabelText: 'Trenerzy',
        resources: this.getResources.bind(this),
        events: this.getEvents.bind(this),

        eventClick: this.calendarEvent.bind(this),
        select: this.calendarSelect.bind(this)
      };
    } else if (this.auth.isTrainer) {
      let calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',

        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '22:00:00',
        firstDay: 1,
        businessHours: {
          start: '08:00',
          end: '21:00',
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
          right: 'agendaDay,agendaTwoDay,agendaWeek,month'
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
    } else if (this.auth.isClient) {
      let calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',

        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '22:00:00',
        firstDay: 1,
        businessHours: {
          start: '08:00',
          end: '21:00',
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
          right: 'agendaDay,agendaTwoDay,agendaWeek,month'
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

  calendarSelect(start, end, event, view, resource) {
    console.log('test calendarSelect', start.format('YYYY-MM-DD'), start.format('HH:00'), resource.id);
    // client: "Kamil Pilarczyk"
    // clientKey: "-KF-rubC8xOwylNhe-q3"
    // completed: false
    // createdAt: 1461182433770
    // date: "2016-04-28"
    // dateTime: "2016-04-28 10:00"
    // descDate: "czwartek, 28.04.2016"
    // fullDate: Thu Apr 28 2016 02:00:00 GMT+0200 (CEST)
    // key: "-KFpFc_ZT5jaI_BlxglF"
    // place: "Hermanowska"
    // placeKey: "-KBHukjV0l8M-EkpTdI4"
    // timeEnd: "11:00"
    // timeStart: "10:00"
    // trainer: "Adam Ciesielski"
    // trainerKey: "-KBN-fYLnmIQ_6pSwnV6"
    let workout = {
      trainerKey: resource.id,
      date: start.format('YYYY-MM-DD'),
      dateTime: start.format('YYYY-MM-DD') + ' ' + start.format('HH:00'),
      timeStart: start.format('HH:00'),
      timeEnd: start.add(1, 'hours').format('HH:00')
    };
    // debugger;
    this.showTrainingForm(workout);
    //   var title = prompt('Event Title:');
    //   var eventData;
    //   if (title) {
    //       eventData = {
    //           title: title,
    //           start: start,
    //           end: end
    //       };
    //       $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
    //   }
    //   $('#calendar').fullCalendar('unselect');
  }

  calendarEvent(event) {
    console.log('test calendarEvent', event);
    let index = this.workoutStore.findIndex(event.id);
    let workout = this.workoutStore.list.get(index);
    // debugger;
    this.showTrainingForm(workout);
  }

  showActionSheet() {
    let actionSheet = ActionSheet.create({
      title: 'Zmiana treningu',
      buttons: [
        {
          text: 'Usuń',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Edytuj',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Anuluj',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    setTimeout(() => {
      this.nav.present(actionSheet);
    }, 500);
  }

  getEvents(start, end, timezone, callback) {
      var events = [];
      this.workoutStore.list.forEach(workout => {
          switch (workout.trainerKey) {
            case '-KBN-fYLnmIQ_6pSwnV6': // adam
              let trainerColor = '#9b6127';
              break;
            case '-KEiiFLK6kxKsJoTGjKU': // oskar
              let trainerColor = '#c124ec';
              break;
            case '-KBN-noa5OGgfW2XYbvZ': // damian
              let trainerColor = '#7e60ff';
              break;
            case '-KEiiHM34nL9fAhGCAC8': // pawel
              let trainerColor = '#373293';
              break;
          }
          var event = {
              id: workout.key,
              resourceId: workout.trainerKey,
              title: this.auth.isClient ? workout.trainer : workout.client,
              start: workout.date + 'T' + workout.timeStart,
              end: workout.date + 'T' + workout.timeEnd,
              color: trainerColor
          };
          events.push(event);

          // var eventPlace = {
          //     id: workout.key,
          //     resourceId: workout.placeKey,
          //     title: workout.trainer,
          //     start: workout.date + 'T' + workout.timeStart,
          //     end: workout.date + 'T' + workout.timeEnd
          // };
          // events.push(eventPlace);
      });
      return callback ? callback(events) : events;
  }

  getResources(callback) {
      console.log('test get resources');
      var resources = [];

      if (this.workoutStore.placeStore.size === 0) {
        callback([]);
        return false;
      }

      this.workoutStore.trainerStore.list.forEach(trainer => {
        var resource = {
          id: trainer.key,
          title: trainer.title
        };
        resources.push(resource);
      });

      // var i = 0, childrens = [];
      // this.workoutStore.trainerStore.list.forEach(trainer => {
      //     if (i++ < 3) {
      //         var resource = {
      //             id: trainer.key,
      //             title: trainer.title
      //         };
      //         childrens.push(resource);
      //     }
      // });
      // var place1 = this.workoutStore.placeStore.list.get(0);
      // resources.push({
      //     id: place1.key,
      //     title: place1.title,
      //     children: childrens
      // });

      // i = 0, childrens = [];
      // this.workoutStore.trainerStore.list.forEach(trainer => {
      //     if (i++ >= 3) {
      //         var resource = {
      //             id: trainer.key,
      //             title: trainer.title
      //         };
      //         childrens.push(resource);
      //     }
      // });
      // var place2 = this.workoutStore.placeStore.list.get(1);
      // resources.push({
      //     id: place2.key,
      //     title: place2.title,
      //     children: childrens
      // });
      return callback ? callback(resources) : resources;
  }
}
