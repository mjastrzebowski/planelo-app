import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AuthService } from '../../../core/auth/auth-service';

import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';


@Component({
  templateUrl: 'training-reserve.html'
})
export class TrainingReserveModal {
  @Input() trainings: Array = [{}];

  constructor(
    private viewCtrl: ViewController,
    private trainerStore: TrainerStore,
    public workoutStore: WorkoutStore,
    public auth: AuthService
  ) {
    this.available = [];
    this.repeated = [];
    this.place = '-KBHukjV0l8M-EkpTdI4';
    this.forceSub = false;
    this.filter = {};
  }

  onPlaceChanged(event): void {
    this.getAvailableWorkouts();
  }

  ngOnInit(): void {
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

  getAvailableWorkouts(): void {
    this.available = [];
    if (this.available.length > 0) {
      return;
    }
    let hours = [
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
      days = 60;
    }
    if (today === 32) {
      today = 1;
    }

    for (let d = today; d <= today+days; d++) {
      let nextDay = new Date('2016-11-01');
      nextDay.setDate(d);
      if (this.auth.isClient && (nextDay.getMonth()+1) === 12) {
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
          let avTrainers = [];
          let time = hour.timeStart;
          if (time === '8:00' || time === '9:00') {
            time = '0' + time;
          }
          this.trainerStore.list.forEach(trainer => {
            if (this.auth.isOwner || trainer.place === this.place) {
              let thisDate = new Date(date);
              let thisDay = thisDate.getDate();

              if (!this.auth.isOwner && trainer.vacation && 
                !(trainer.key === '-KJ2tA8ChSdvCtXgGps4' && date === '2016-08-15') && 
                !(trainer.key === '-KJ2tLDl_lljvvl48TMW' && date === '2016-11-11') &&
                !(trainer.key === '-KBN-noa5OGgfW2XYbvZ' && date === '2016-11-11') &&
                !(trainer.key === '-KEiiHM34nL9fAhGCAC8' && date === '2016-11-01')) {
                if (trainer.vacation[0]) {
                  let vacationDateStart = new Date(trainer.vacation[0].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[0].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
                if (trainer.vacation[1]) {
                  let vacationDateStart = new Date(trainer.vacation[1].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[1].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
                if (trainer.vacation[2]) {
                  let vacationDateStart = new Date(trainer.vacation[2].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[2].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
                if (trainer.vacation[3]) {
                  let vacationDateStart = new Date(trainer.vacation[3].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[3].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
                if (trainer.vacation[4]) {
                  let vacationDateStart = new Date(trainer.vacation[4].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[4].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
                if (trainer.vacation[5]) {
                  let vacationDateStart = new Date(trainer.vacation[5].dateStart);
                  let vacationDateEnd = new Date(trainer.vacation[5].dateEnd);
                  if (thisDate >= vacationDateStart && thisDate <= vacationDateEnd) {
                    return;
                  }
                }
              }

              let d = thisDate.getDay() - 1;
              if (this.auth.isOwner || (trainer.hours[d] && trainer.hours[d][hour.timeStart] &&
                !(trainer.key === '-KJ2tLDl_lljvvl48TMW' && date === '2016-11-11' && 
                  (time === '16:00' || time === '17:00' || time === '18:00' || time === '19:00' || time === '20:00')) &&
                !(trainer.key === '-KBN-noa5OGgfW2XYbvZ' && date === '2016-11-11' && 
                  (time === '16:00' || time === '17:00' || time === '18:00' || time === '19:00' || time === '20:00')) &&
                !(trainer.key === '-KEiiHM34nL9fAhGCAC8' && date === '2016-11-01' && 
                  (time === '16:00' || time === '17:00' || time === '18:00' || time === '19:00' || time === '20:00'))
                ) || 
                (trainer.key === '-KJ2tLDl_lljvvl48TMW' && date === '2016-11-11' && 
                    (time === '08:00' || time === '09:00' || time === '10:00' || time === '11:00' || time === '12:00')) ||
                (trainer.key === '-KBN-noa5OGgfW2XYbvZ' && date === '2016-11-11' && 
                    (time === '08:00' || time === '09:00' || time === '10:00' || time === '11:00' || time === '12:00')) ||
                (trainer.key === '-KEiiHM34nL9fAhGCAC8' && date === '2016-11-01' && 
                    (time === '08:00' || time === '09:00' || time === '10:00' || time === '11:00' || time === '12:00')) ||
                (trainer.key === '-KMcRg822CDsJnb2-dmp' && date === '2016-11-01' && 
                    (time === '08:00' || time === '09:00' || time === '10:00' || time === '11:00' || time === '12:00'))
                ) {
                let find = this.workoutStore.listAll.filter(workout => {
                  if (!this.auth.isOwner && (!workout.fixed && !workout.completed && (date === workout.date && workout.timeStart === time && (workout.trainerKey === trainer.key || (this.auth.isClient && workout.clientKey === this.auth.key)))
                    && !(this.trainings[0] && workout.date === this.trainings[0].date && workout.timeStart === this.trainings[0].timeStart && (trainer.key === this.trainings[0].trainer || (this.auth.isClient && this.auth.key === this.trainings[0].client))))) {
                    return true;
                  }
                });

                if (find.size === 0) {
                  avTrainers.push(trainer);
                } else if (find.size > 1 || find.size === 1 && find.get(0).trainerKey === trainer.key) {
                  if (avTrainerWorkouts.hasOwnProperty(trainer.key)) {
                    avTrainerWorkouts[trainer.key]++;
                  }
                }
              }
            }
          });
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

  selectHour(hour): void {
    this.trainings[0].place = this.place;
    this.trainings[0].date = hour;
    this.trainings[0].client = this.auth.key;
    this.trainings[0].trainer = hour.trainers[0].key;
    this.viewCtrl.dismiss(this.trainings);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
