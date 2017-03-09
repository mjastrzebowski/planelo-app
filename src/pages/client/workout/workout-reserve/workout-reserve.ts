import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { Utils } from 'app/providers/utils';

import { IWorkout } from 'app/services/workout/workout';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { WorkoutStore } from 'app/services/workout/workout-store';

@Component({
  templateUrl: 'workout-reserve.html'
})
export class WorkoutReserveModal {
  @Input() model: IWorkout;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private trainerStore: TrainerStore,
    private workoutStore: WorkoutStore
  ) {}

  ngOnInit(): void {
    this.model = this.workoutStore.getItem(this.params.data) || new IWorkout();
  }

  getStartDate() {
    let start = moment();
    if (start.hour() >= 21) {
      start.add(1, 'day');
    }
    start.add(1, 'day');
    return start;
  }

  getEndDate() {
    let end = moment();
    if (end.date() >= 20) {
      end.add(1, 'month');
    }
    end.add(1, 'month');
    end.date(0);
    return end;
  }

  getAvailableHours() {
    let events = [];
    let start = this.getStartDate();
    let end = this.getEndDate();
    // console.log(start.toString(), end.toString());
    Utils.forEachDay(start, end).forEach(day => {
      let weekday = day.weekday()
      console.log('dzien tygodnia', weekday);
      this.utils.getBussinesHoursArray().forEach(hour => {
        this.trainerStore.filterBy({ placeId: 1, }).forEach(trainer => {

        });
      });

    //   let hours = trainer.days[day.day()];
    //   if (!hours) {
    //     return;
    //   }
    //   hours.forEach(hour => {
    //     let event = {
    //       id: 'available',
    //       resourceId: trainer.id,
    //       start: moment(day.format('YYYY-MM-DD') + ' ' + hour.start, 'YYYY-MM-DD HH:mm'),
    //       end: moment(day.format('YYYY-MM-DD') + ' ' + hour.end, 'YYYY-MM-DD HH:mm'),
    //       color: '#8fdf82',
    //       rendering: 'background'
    //     };
    //     events.push(event);
    //   });
    });
    return events;
  }

  save(): void {
    this.utils.showLoading('Zapisywanie rezerwacji...');
    this.workoutStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Rezerwacja dodane.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
