import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ITrainer } from '../../../core/trainer/trainer';

@Component({
  templateUrl: 'trainer-detail-vacation.html'
})
export class TrainerDetailVacationModal {
  @Input() trainer: ITrainer;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController
  ) {}

  ngOnInit(): void {
    if (this.params.data.hasOwnProperty('key')) {
      this.trainer = this.params.data;
      if (!this.trainer.hasOwnProperty('vacation')) {
        this.trainer.vacation = [];
      }
    } else {
      this.trainer = new ITrainer();
      this.trainer.hours = [];
      this.trainer.vacation = [];
    }
  }

  addVacation(): void {
    let now = new Date();
    let month = '' + now.getMonth() + 1;
    if (parseInt(month) < 10) {
      month = '0' + month;
    }
    let day = '' + now.getDate();
    if (parseInt(day) < 10) {
      day = '0' + day;
    }
    let dateStart = now.getFullYear() + '-' + month + '-' + day;
    let dateEnd = now.getFullYear() + '-' + month + '-' + day;
    this.trainer.vacation.push({
      dateStart: dateStart,
      dateEnd: dateEnd,
      start: dateStart + 'T' + '07:00',
      end: dateEnd + 'T' + '23:00'
    });
  }

  removeVacation(vacationId: number): void {
    this.trainer.vacation.splice(vacationId, 1);
  }

  save(): void {
    this.viewCtrl.dismiss(this.trainer);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
