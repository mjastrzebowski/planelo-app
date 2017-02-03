import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { AuthService } from '../../../core/auth/auth-service';

import { ClientStore } from '../../../core/client/client-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';


@Component({
  templateUrl: 'training-create.html'
})
export class TrainingCreateModal {
  @Input() trainings: any = [{}];
  public editing: boolean = false;
  public available;
  public repeated;
  public place;
  public forceSub;
  public filter;
  public workouts;
  sub: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private trainerStore: TrainerStore,
    private workoutStore: WorkoutStore,
    public clientStore: ClientStore
  ) {
    this.available = [];
    this.repeated = [];
    this.place = '-KBHukjV0l8M-EkpTdI4';
    this.forceSub = false;
    this.filter = {};
  }

  onPlaceChanged(event?): void {
    this.getAvailableWorkouts();
  }

  ngOnInit(): void {
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

    this.sub = this.workoutStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.init();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  init(): void {
    this.getAvailableWorkouts();
  }

  getAvailableWorkouts(): any {
    this.available = [];
    if (this.available.length > 0) {
      return false;
    }
    let hours = [
      { timeStart: '7:00', timeEnd: '08:00' },
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

    let days = 40;
    let today = new Date().getDate();
    if (this.auth.isClient) {
      today++;
      let hour = new Date().getHours();
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
      avTrainers.push(trainer);
    });

    for (let d = today; d <= today+days; d++) {
      let nextDay = new Date('2017-02-01');
      nextDay.setDate(d);
      if (this.auth.isClient && (nextDay.getMonth()+1) === 3) {
        break;
      }
      if (nextDay.getDay() !== 0) {
        let year = 2016;
        let day = '' + nextDay.getDate();
        if (parseInt(day) < 10) {
          day = '0' + day;
        }
        let month = (nextDay.getMonth()+1) + '';
        if (parseInt(month) > 12) {
          month = '1';
        }
        if (parseInt(month) < 10) {
          month = '0' + month;
          year = 2017;
        }
        let date = year + '-' + month + '-' + day;

        let avHours = [];
        let avTrainerWorkouts = {
          '-KBN-noa5OGgfW2XYbvZ': 0, // damian
          '-KEiiFLK6kxKsJoTGjKU': 0, // oskar
          '-KEiiHM34nL9fAhGCAC8': 0, // pawel
          '-KJ2syzrtgQiky2qFlGb': 0, // przemek
          '-KJ2tA8ChSdvCtXgGps4': 0, // grzesiek
          '-KJ2tLDl_lljvvl48TMW': 0, // mateusz
          '-KGHHXLT2oypqidXcL2T': 0  // marcin
        };
        hours.forEach(hour => {
          let time = hour.timeStart;
          if (time === '7:00' || time === '8:00' || time === '9:00') {
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

        let avDay = {
          descDate: moment(nextDay).format('dddd, DD.MM.YYYY'),
          hours: avHours
        };
        this.available.push(avDay);
      }
    }
  }

  addTraining(): void {
    this.trainings.push({});
  }

  removeTraining(trainingId): void {
    this.trainings.splice(trainingId, 1);
  }

  leadingZero(number): string {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  repeatTrainings(): void {
    if (this.auth.isOwner && !this.editing) {
      this.trainings.forEach(training => {
        if (training.hasOwnProperty('repeat')) {
          let firstDate = new Date(training.date.date);
          let firstMonth = firstDate.getMonth();
          for (let d = 1; d < 7; d++) {
            let nextDate = new Date(training.date.date);
            nextDate.setDate(firstDate.getDate() + 7 * d);
            let nextMonth = nextDate.getMonth();
            if (nextMonth !== firstMonth) {
              return false;
            }
            let newTraining = {
              client: training.client,
              trainer: training.trainer,
              date: Object.assign({}, training.date),
              repeat: true
            };
            newTraining.date.date = nextDate.getFullYear() + '-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
            newTraining.date.dateTime = newTraining.date.date + ' ' + newTraining.date.timeStart;
            this.trainings.push(Object.assign({}, newTraining));
          }
        }
      });
    }
  }

  changeRepeated(): void {
    if (this.auth.isOwner && this.editing && this.trainings[0].all) {
      this.repeated.forEach(repeat => {
        let d = new Date(this.trainings[0].oldDate);
        let dd = new Date(this.trainings[0].date.date);
        let n = new Date(repeat.date);
        n.setTime(n.getTime() + (+dd - +d)); // Explicitly coercing to a number
        let newDate = n.getFullYear() + '-' + this.leadingZero(n.getMonth()+1) + '-' + this.leadingZero(n.getDate());

        let newTraining = {
          key: repeat.key,
          trainer: this.trainings[0].trainer,
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
    }
  }

  findRepeat(workout): void {
    let training = workout;
    if (training.hasOwnProperty('repeat')) {
      let firstDate = new Date(training.date);
      for (let d = 1; d < 7; d++) {
        let nextDate = new Date(training.date);
        nextDate.setDate(firstDate.getDate() + 7 * d);
        let nextFormat = '2016-' + this.leadingZero(nextDate.getMonth()+1) + '-' + this.leadingZero(nextDate.getDate());
        let index = this.workoutStore.findClientWorkoutIndex(training.clientKey, nextFormat, training.timeStart);
        if (index !== -1) {
          let rep = Object.assign({}, this.workoutStore.list.get(index));
          this.repeated.push(rep);
        }
      }
    }
  }

  selectHour(hour): void {
    this.trainings[0].place = this.place;
    this.trainings[0].date = hour;
    this.trainings[0].client = this.auth.key;
    this.trainings[0].trainer = hour.trainers[0].key;
    this.viewCtrl.dismiss(this.trainings);
  }

  save(): void {
    this.repeatTrainings();
    this.changeRepeated();
    this.viewCtrl.dismiss(this.trainings);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  delete(): void {
    this.trainings[0].delete = true;
    this.viewCtrl.dismiss(this.trainings);
  }

  deleteAll(): void {
    this.trainings[0].delete = true;
    this.repeated.unshift(this.trainings[0]);
    this.viewCtrl.dismiss(this.repeated);
  }
}
