import { Component, Input } from '@angular/core';

import { App, Alert, NavParams, NavController, ViewController } from 'ionic-angular';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';

import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutFullStore } from '../../../core/workout/workout-full-store';


@Component({
  templateUrl: 'build/pages/training/training-create/training-create.html'
})
export class TrainingCreateModal {
  @Input() trainings: Array;
  editing: boolean = false;

  constructor(app: App, params: NavParams, nav: NavController, viewCtrl: ViewController, utils: Utils, auth: AuthService, trainerStore: TrainerStore, workoutStore: WorkoutFullStore) {
    this.app = app;
    this.params = params;
    this.nav = nav;
    this.viewCtrl = viewCtrl;

    this.utils = utils;
    this.auth = auth;
    this.trainerStore = trainerStore;
    this.workoutStore = workoutStore;

    this.available = [];
    this.repeated = [];
    // this.trainings = [];
    this.place = '-KBHukjV0l8M-EkpTdI4';
    this.forceSub = false;

    this.filter = {};
  }

  onPlaceChanged(event) {
    this.getAvailableWorkouts();
  }

  ionViewLoaded() {
    console.log('test modal loaded');
    // this.utils.presentLoading('Sprawdzanie terminów...');

    if (this.params.data.hasOwnProperty('date')) {
      let workout = Object.assign({}, this.params.data);
      workout.client = workout.clientKey;
      workout.trainer = workout.trainerKey;
      if (workout.key) {
        workout.oldDate = workout.date;
        this.editing = true;
        this.findRepeat(workout);
      }
      this.trainings = [Object.assign({}, workout)];
    } else {
      this.trainings = [{}];
    }

    let authSub = this.auth.subscribe((authenticated: boolean) => {
      if (authenticated) {
        if (authSub) {
          authSub.unsubscribe();
        } else {
          this.workouts = this.workoutStore.workouts;
          this.getAvailableWorkouts();
        // console.log('TESSSSSSST - ', this.workoutStore.size);
        // if (!this.workouts) {
        //   let workSub = this.workouts.subscribe((list) => {
        //     if (workSub) {
        //       workSub.unsubscribe();
        //     }
            
        //   });
        // }
        }
      }
    }
  }

  updateDateTime() {
    // console.log('test updateDateTime');
  }

  getAvailableWorkouts() {
    console.log('test getAvailableWorkouts start');
    // this.availableTrainers = this.trainerStore.filterBy({
    //   place: this.place,
    //   // availableFrom: firstDay,
    //   // dateBefore: lastDay
    // });
    // console.log('test avTrainers', this.place, this.availableTrainers);






    // console.log('test getAvailableWorkouts end');
    // return false;
    this.available = [];
    if (this.available.length > 0) {
      return false;
    }
    var hours = [
      { timeStart: '8:00', timeEnd: '09:00' },
      { timeStart: '9:00', timeEnd: '10:00' },
      { timeStart: '10:00', timeEnd: '11:00' },
      { timeStart: '11:00', timeEnd: '12:00' },
      { timeStart: '12:00', timeEnd: '13:00' },
      { timeStart: '13:00', timeEnd: '14:00' },
      { timeStart: '14:00', timeEnd: '15:00' },
      { timeStart: '16:00', timeEnd: '17:00' },
      { timeStart: '17:00', timeEnd: '18:00' },
      { timeStart: '18:00', timeEnd: '19:00' },
      { timeStart: '19:00', timeEnd: '20:00' },
      { timeStart: '20:00', timeEnd: '21:00' },
      { timeStart: '21:00', timeEnd: '22:00' }
    ];

    var days = 40;
    var today = new Date().getDate();
    if (this.auth.isClient) {
      today++;
      var hour = new Date().getHours();
      if (hour >= 21) {
        today++;
      }
    } else if (this.auth.isOwner) {
      today = 1;
      days = 62;
    }
    if (today === 32) {
      today = 1;
    }

    let avTrainers = [];
    this.trainerStore.list.forEach(trainer => {
      // if (trainer.place === this.place) {
        avTrainers.push(trainer);
      // }
    });
    // console.log('test avTrainers', this.place, avTrainers);

    // let lastDate = this.workoutStore.list.last().date;
    for (let d = today; d <= today+days; d++) {
      let nextDay = new Date('2016-09-01');
      nextDay.setDate(d);
      if (this.auth.isClient && (nextDay.getMonth()+1) === 10) {
        break;
      }
      if (nextDay.getDay() !== 0) {
        let day = nextDay.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        let month = nextDay.getMonth()+1;
        if (month < 10) {
          month = '0' + month;
        }
        let date = '2016-' + month + '-' + day;
        
        let avHours = [];
        let avTrainerWorkouts = {
          '-KBN-noa5OGgfW2XYbvZ': 0, // damian
          '-KEiiFLK6kxKsJoTGjKU': 0, // oskar
          '-KEiiHM34nL9fAhGCAC8': 0, // pawel
          '-KJ2syzrtgQiky2qFlGb': 0, // przemek
          '-KJ2tA8ChSdvCtXgGps4': 0, // grzesiek
          '-KJ2tLDl_lljvvl48TMW': 0  // mateusz
        };
        hours.forEach(hour => {
          // var size = this.workoutStore.trainerStore.size;
          
          let time = hour.timeStart;
          if (time === '8:00' || time === '9:00') {
            time = '0' + time;
          }

          let dateTime = date + ' ' + time;
          let avHour = { date: date, dateTime: dateTime, timeStart: time, timeEnd: hour.timeEnd, trainers: avTrainers };
          if (this.trainings[0] && avHour.date === this.trainings[0].date && avHour.timeStart === this.trainings[0].timeStart) {
            this.trainings[0].date = avHour;
          }
          if (avHour.trainers.length > 0) {
            avHours.push(avHour);
          }
        });

        avHours.forEach(avHour => {
          if (avHour.trainers.length > 1) {
            avHour.trainers.sort((t1, t2) => {
              return avTrainerWorkouts[t1.key] - avTrainerWorkouts[t2.key];
            });
          }
        });

        // descDate: nextDay.toLocaleDateString('pl', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
        let avDay = {
          descDate: moment(nextDay).format('dddd, DD.MM.YYYY'),
          hours: avHours
        };
        this.available.push(avDay);
      }
    }
    console.log('test getAvailableWorkouts end');
    // debugger;
  }

  addTraining() {
    this.trainings.push({});
  }

  removeTraining(trainingId) {
    this.trainings.splice(trainingId, 1);
  }

  // selectTrainer(hour) {
  //   var alert = Alert.create();
  //   alert.setTitle('Dostępni trenerzy');

  //   hour.trainers.forEach(trainer => {
  //     alert.addInput({
  //       type: 'radio',
  //       label: trainer.title,
  //       value: trainer.key
  //     });
  //   });
  //   alert.addButton('Anuluj');
  //   alert.addButton({
  //     text: 'Wybierz',
  //     handler: data => {
  //       console.log('radio data:', data);
  //     }
  //   });
  //   this.nav.present(alert);
  // }

  leadingZero(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  repeatTrainings() {
    if (this.auth.isOwner && !this.editing) {
      this.trainings.forEach(training => {
        if (training.hasOwnProperty('repeat')) {
          let firstDate = new Date(training.date.date);
          let firstMonth = firstDate.getMonth();
          for (let d = 1; d < 7; d++) {
            var nextDate = new Date(training.date.date);
            nextDate.setDate(firstDate.getDate() + 7 * d);
            var nextMonth = nextDate.getMonth();
            if (nextMonth !== firstMonth) {
              return false;
            }
            var newTraining = {
              client: training.client,
              trainer: training.trainer,
              date: Object.assign({}, training.date),
              repeat: true
            };
            newTraining.date.date = '2016-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
            newTraining.date.dateTime = newTraining.date.date + ' ' + newTraining.date.timeStart;
            this.trainings.push(Object.assign({}, newTraining));
          }
        }
      });
    }
  }

  changeRepeated() {
    if (this.auth.isOwner && this.editing && this.trainings[0].all) {
      this.repeated.forEach(repeat => {
        // console.log('test changeRepeated', this.trainings[0]);
        let d = new Date(this.trainings[0].oldDate);
        let dd = new Date(this.trainings[0].date.date);
        let n = new Date(repeat.date);
        n.setTime(n.getTime() + (dd - d));
        let newDate = '2016-' + this.leadingZero(n.getMonth()+1) + '-' + this.leadingZero(n.getDate());

        let newTraining = {
          key: repeat.key,
          trainer: this.trainings[0].trainer
          client: this.trainings[0].client,
          date: {
            date: newDate,
            dateTime: newDate + ' ' + this.trainings[0].date.timeStart,
            timeStart: this.trainings[0].date.timeStart,
            timeEnd: this.trainings[0].date.timeEnd,
          },
          repeat: true
        };
        this.trainings.push(Object.assign({}, newTraining));
      });
      // this.trainings.forEach(training => {
      //   if (training.hasOwnProperty('repeat')) {
      //     let firstDate = new Date(training.date.date);
      //     for (let d = 1; d < 7; d++) {
      //       var nextDate = new Date(training.date.date);
      //       nextDate.setDate(firstDate.getDate() + 7 * d);
      //       var newTraining = {
      //         client: training.client,
      //         trainer: training.trainer,
      //         date: Object.assign({}, training.date),
      //         repeat: true
      //       };
      //       newTraining.date.date = '2016-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
      //       newTraining.date.dateTime = newTraining.date.date + ' ' + newTraining.date.timeStart;
      //       this.trainings.push(Object.assign({}, newTraining));
      //     }
      //   }
      // });
    }
  }

  findRepeat(workout) {
    let training = workout;
    if (training.hasOwnProperty('repeat')) {
      let firstDate = new Date(training.date);
      for (let d = 1; d < 7; d++) {
        var nextDate = new Date(training.date);
        nextDate.setDate(firstDate.getDate() + 7 * d);
        let nextFormat = '2016-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
        let index = this.workoutStore.findClientWorkoutIndex(training.clientKey, nextFormat, training.timeStart);
        if (index !== -1) {
          let rep = Object.assign({}, this.workoutStore.list.get(index));
          this.repeated.push(rep);
        }
        // var newTraining = {
        //   client: training.client,
        //   trainer: training.trainer,
        //   date: Object.assign({}, training.date),
        //   repeat: true
        // };
        // newTraining.date.date = '2016-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
        // newTraining.date.dateTime = newTraining.date.date + ' ' + newTraining.date.timeStart;
        // this.trainings.push(Object.assign({}, newTraining));
      }
    }
    // return;
  }

  selectHour(hour) {
    this.trainings[0].place = this.place;
    this.trainings[0].date = hour;
    this.trainings[0].client = this.auth.key;
    this.trainings[0].trainer = hour.trainers[0].key;
    this.viewCtrl.dismiss(this.trainings);
  }

  save() {
    this.repeatTrainings();
    this.changeRepeated();
    this.viewCtrl.dismiss(this.trainings);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.trainings[0].delete = true;
    this.viewCtrl.dismiss(this.trainings);
  }

  deleteAll() {
    this.trainings[0].delete = true;
    this.repeated.unshift(this.trainings[0]);
    this.viewCtrl.dismiss(this.repeated);
  }
}
