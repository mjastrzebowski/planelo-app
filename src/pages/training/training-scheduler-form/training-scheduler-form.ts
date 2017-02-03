import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { AuthService } from '../../../core/auth/auth-service';

import { ClientStore } from '../../../core/client/client-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';


@Component({
  templateUrl: 'training-scheduler-form.html'
})
export class TrainingSchedulerFormModal {
  @Input() trainings: any = [{}];
  editing: boolean = false;
  available: any;
  repeated: any;
  place: any;
  forceSub: any;
  sub: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private trainerStore: TrainerStore,
    private workoutStore: WorkoutStore,
    public auth: AuthService,
    public clientStore: ClientStore
  ) {
    this.available = [];
    this.repeated = [];
    this.place = '-KBHukjV0l8M-EkpTdI4';
    this.forceSub = false;
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
    var hours = [
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

    let today = 6;
    for (let d = today; d <= today+6; d++) {
      let nextDay = new Date('2016-06-01');
      nextDay.setDate(d);
      if (nextDay.getDay() !== 0) {
        let day = '' + nextDay.getDate();
        if (parseInt(day) < 10) {
          day = '0' + day;
        }
        let month = '' + nextDay.getMonth()+1;
        if (parseInt(month) < 10) {
          month = '0' + month;
        }
        let date = '2016-' + month + '-' + day;

        var avHours = [];
        hours.forEach(hour => {
          var avTrainers = [];
          let time = hour.timeStart;
          if (time === '7:00' || time === '8:00' || time === '9:00') {
            time = '0' + time;
          }

          this.trainerStore.list.forEach(trainer => {
            if (this.auth.isOwner || trainer.place === this.place) {
              let thisDate = new Date(date);
              let thisDay = thisDate.getDate();

              let d = thisDate.getDay()-1;
              if ((trainer.hours[d] && trainer.hours[d][hour.timeStart])) {
                if (!this.workoutStore.list.find(workout => {
                  if (workout.fixed && (date === workout.date && workout.timeStart === time && workout.trainerKey === trainer.key)
                    && !(this.trainings[0] && workout.date === this.trainings[0].date && workout.timeStart === this.trainings[0].timeStart && trainer.key === this.trainings[0].trainer)) {
                    return true;
                  }
                })) {
                  avTrainers.push(trainer);
                }
              }
            }
          });
          var dateTime = date + ' ' + time;
          var avHour = { date: date, dateTime: dateTime, timeStart: time, timeEnd: hour.timeEnd, trainers: avTrainers };
          if (this.trainings[0] && avHour.date === this.trainings[0].date && avHour.timeStart === this.trainings[0].timeStart) {
            this.trainings[0].date = avHour;
          }
          if (avHour.trainers.length > 0) {
            avHours.push(avHour);
          }
        });

        var avDay = {
          descDate: moment(nextDay).format('dddd'),
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

  save(): void {
    this.viewCtrl.dismiss(this.trainings);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  delete(): void {
    this.trainings[0].delete = true;
    this.viewCtrl.dismiss(this.trainings);
  }
}
