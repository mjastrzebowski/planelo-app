import { Component, Input, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { App, Modal, Alert, ActionSheet, Toast, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';
import { WorkoutService } from '../../../core/workout/workout-service';

import {TrainingFormModal} from '../training-form/training-form'
// import {TrainingDetailPage} from '../training-detail/training-detail';


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
  templateUrl: 'build/pages/training/training-list/training-list.html',
  pipes: [GroupWorkoutsPipe]
})
export class TrainingListPage {
  @Input() workouts: ReplaySubject<List<any>>;

  constructor(app: App, nav: NavController, utils: Utils, auth: AuthService, workoutStore: WorkoutStore, workoutService: WorkoutService, clientStore: ClientStore, placeStore: PlaceStore, trainerStore: TrainerStore) {
    this.app = app;
    this.nav = nav;
    this.utils = utils;
    this.auth = auth;

    this.clientStore = clientStore;
    this.placeStore = placeStore;
    this.trainerStore = trainerStore;
    this.workoutStore = workoutStore;
    this.workoutService = workoutService;

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

  showMonth(monthId) {
    $('.workouts-hidden.month-' + monthId).slideToggle();
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
    this.workoutStore.list.forEach(workout => {
      if (workout.date !== '2099-12-31' && workout.date === '2016-06-11' && workout.fixed) {
        // console.log('test cover', workout.date);
        // this.workoutService.deleteWorkout(workout);

        // let newDate0 = '2016-09-03';
        // let newDateTime0 = newDate0 + ' ' + workout.timeStart;
        // this.workoutService.createWorkout(
        //   workout.placeKey,
        //   workout.trainerKey || '',
        //   workout.clientKey,
        //   newDate0 || '',
        //   newDateTime0 || '',
        //   workout.timeStart || '',
        //   workout.timeEnd || '',
        //   true);

        // let newDate1 = '2016-09-10';
        // let newDateTime1 = newDate1 + ' ' + workout.timeStart;
        // this.workoutService.createWorkout(
        //   workout.placeKey,
        //   workout.trainerKey || '',
        //   workout.clientKey,
        //   newDate1 || '',
        //   newDateTime1 || '',
        //   workout.timeStart || '',
        //   workout.timeEnd || '',
        //   true);

        // let newDate2 = '2016-09-17';
        // let newDateTime2 = newDate2 + ' ' + workout.timeStart;
        // this.workoutService.createWorkout(
        //   workout.placeKey,
        //   workout.trainerKey || '',
        //   workout.clientKey,
        //   newDate2 || '',
        //   newDateTime2 || '',
        //   workout.timeStart || '',
        //   workout.timeEnd || '',
        //   true);

        // let newDate3 = '2016-09-24';
        // let newDateTime3 = newDate3 + ' ' + workout.timeStart;
        // this.workoutService.createWorkout(
        //   workout.placeKey,
        //   workout.trainerKey || '',
        //   workout.clientKey,
        //   newDate3 || '',
        //   newDateTime3 || '',
        //   workout.timeStart || '',
        //   workout.timeEnd || '',
        //   true);

        // let newDate4 = '2016-09-31';
        // let newDateTime4 = newDate4 + ' ' + workout.timeStart;
        // this.workoutService.createWorkout(
        //   workout.placeKey,
        //   workout.trainerKey || '',
        //   workout.clientKey,
        //   newDate4 || '',
        //   newDateTime4 || '',
        //   workout.timeStart || '',
        //   workout.timeEnd || '',
        //   true);
      }
    });
  }


  showTrainingForm(workout) {
    // this.updateRepeat();
    if (workout && workout.hasOwnProperty('key')) {
      this.editing = true;
    } else {
      this.editing = false;
    }

    let modal = Modal.create(TrainingFormModal, workout);
    modal.onDismiss(this.saveTraining.bind(this));
    setTimeout(() => {
      this.nav.present(modal);
    }, 500);
  }

  saveTraining(data) {
    if (data) {
      this.utils.presentLoading('Zapisywanie zmian...');

      if (data[0].hasOwnProperty('delete')) {
        data.forEach(training => {
          this.workoutService.deleteWorkout(training)
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
                }
              };
              if (this.auth.isOwner) {
                notification.owner = this.auth.key || true;
              } else if (this.auth.isClient) {
                notification.client = this.auth.key;
              }
              this.utils.createNotification('workoutRemoved', notification);
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
            repeat: training.repeat || false
          };
          if (training.trainer) {
            changes.place = this.trainerStore.getItem(training.trainer).place;
          }
          this.workoutService.updateWorkout(training, changes);
        });
      } else {
        let client = data[0].client || '';
        data.forEach(training => {
          let place = this.trainerStore.getItem(training.trainer).place;
          this.workoutService.createWorkout(
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
                  key: res.key(),
                  trainer: training.trainer || '',
                  client: client || '',
                  date: training.date.date || '',
                  dateTime: training.date.dateTime || '',
                  timeStart: training.date.timeStart || '',
                  timeEnd: training.date.timeEnd || '',
                  place: place || ''
                }
              };
              if (this.auth.isOwner) {
                notification.owner = this.auth.key || true;
              } else if (this.auth.isClient) {
                notification.client = this.auth.key;
              }
              this.utils.createNotification('workoutAdded', notification);
            });
        });

        this.saveTrainingAlert(data[0]);
      }
      this.refreshCalendar(true);
      setTimeout(() => {
        this.utils.stopLoading();
      }, 500);
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
          handler: data => {}
        },
        {
          text: 'Odwołaj',
          handler: data => {
            let date = moment().format('DD.MM.YYYY, HH:mm');
            this.workoutService.updateWorkout(workout, {
              completed: '[' + date + '] ' + data.title
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

  onPlaceChanged(event) {
    this.refreshCalendar(true);
  }

  ionViewDidEnter() {
    this.utils.presentLoading('Ładowanie treningów...');
    this.calendar = false;

    let authSub = this.auth.subscribe((authenticated: boolean) => {
      this.workouts = this.workoutStore.workouts;
      if (authenticated) {
        if (authSub) {
          authSub.unsubscribe();
        }

        if (this.auth.isTrainer) {
          this.place = this.auth.place;
        }
        let workSub = this.workouts.subscribe((list) => {
          if (this.forceSub || list.get(-1).date === '2099-12-31') {
            setTimeout(() => {
              if (this.auth.isOwner || this.auth.isTrainer) {
                if (!this.calendar) {
                  this.renderCalendar();
                } else {
                  this.refreshCalendar();
                }
              }
              this.forceSub = true;
              this.utils.stopLoading();
            }, 500);
          }
        });
      }
    });
  }

  refreshCalendar(force) {
    var events = this.getEvents();

    if (!force && events.length === this.events.length) {
      return;
    }

    this.events = events;

    $('#calendar').fullCalendar('refetchEvents');
    $('#calendar').fullCalendar('refetchResources');
  }

  renderCalendar() {
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
        maxTime: '23:00:00',
        firstDay: 1,
        hiddenDays: [ 0 ],
        nowIndicator: true,
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
      let calendarOptions = {
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date().toDateString(),
        contentHeight: 'auto',
        lang: 'pl',

        allDaySlot: false,
        slotLabelFormat: 'HH:mm',
        scrollTime: '07:30',
        minTime: '07:00:00',
        maxTime: '23:00:00',
        firstDay: 1,
        hiddenDays: [ 0 ],
        nowIndicator: true,
        businessHours: {
          start: '08:00',
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

  calendarDrag(event, delta, revertFunc) {
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
      this.workoutService.updateWorkout(workout, changes);
    } else {
      // revertFunc();
    }
    this.refreshCalendar(true);
  }

  calendarSelect(start, end, event, view, resource) {
    let workout = {
      trainerKey: resource.id,
      date: start.format('YYYY-MM-DD'),
      dateTime: start.format('YYYY-MM-DD') + ' ' + start.format('HH:00'),
      timeStart: start.format('HH:00'),
      timeEnd: start.add(1, 'hours').format('HH:00')
    };

    this.showTrainingForm(workout);
  }

  calendarEvent(event) {
    let index = this.workoutStore.findIndex(event.id);
    let workout = this.workoutStore.list.get(index);
    this.showTrainingForm(workout);
  }

  calendarTooltip(event, element, view) {
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

  showActionSheet() {
    let actionSheet = ActionSheet.create({
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
      this.nav.present(actionSheet);
    }, 500);
  }

  getEvents(start, end, timezone, callback) {
    let events = [];
    this.workoutStore.list.forEach(workout => {
      if (workout.fixed || workout.timeStart === '' || (this.auth.isOwner && workout.placeKey !== this.place)) {
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
        // constraint: 'businessHours',
        description: client.name + ' ' + client.lastname
      };

      if (workout.completed) {
        event.color = 'red';
      } else if (this.auth.isTrainer && workout.trainerKey === this.auth.key) {
        event.color = this.auth.color;
      }
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

    if (this.auth.isOwner) {
      var hours = [
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
        // debugger;
        for (let d = 1; d <= 62; d++) {
          let date = new Date('2016-08-01');
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
                var working = {
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

      var w = [{
        id: 'available',
        resourceId: '-KJ2tA8ChSdvCtXgGps4',
        start: '2016-08-15T08:00',
        end: '2016-08-15T14:00',
        color: '#8fdf82',
        rendering: 'background'
      }];
      events.push(w[0]);
    }

    return callback ? callback(events) : events;
  }

  getResources(callback) {
    var resources = [];

    if (this.placeStore.size === 0) {
      callback([]);
      return false;
    }

    this.trainerStore.list.forEach(trainer => {
      if (trainer.place !== this.place) {
        return;
      }

      var resource = {
        id: trainer.key,
        title: trainer.alias ? trainer.alias : trainer.title,
        eventColor: trainer.color
      };
      resources.push(resource);
    });

    return callback ? callback(resources) : resources;
  }

  getResourcesWithPlaces(callback) {
    var resources = [];

    if (this.placeStore.size === 0) {
      callback([]);
      return false;
    }

    this.trainerStore.list.forEach(trainer => {
      var resource = {
        id: trainer.key,
        title: trainer.alias ? trainer.alias : trainer.title
      };
      resources.push(resource);
    });

    var i = 0, childrens = [];
    this.trainerStore.list.forEach(trainer => {
        if (i++ < 3) {
            var resource = {
                id: trainer.key,
                title: trainer.alias ? trainer.alias : trainer.title
            };
            childrens.push(resource);
        }
    });
    var place1 = this.placeStore.list.get(0);
    resources.push({
        id: place1.key,
        title: place1.title,
        children: childrens
    });

    i = 0, childrens = [];
    this.trainerStore.list.forEach(trainer => {
        if (i++ >= 3) {
            var resource = {
                id: trainer.key,
                title: trainer.alias ? trainer.alias : trainer.title
            };
            childrens.push(resource);
        }
    });
    var place2 = this.placeStore.list.get(1);
    resources.push({
        id: place2.key,
        title: place2.title,
        children: childrens
    });
    return callback ? callback(resources) : resources;
  }
}
