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
      this.trainer = {
        title: '',
        email: '',
        hours: [],
        vacation: []
      };
    }
  }

  addVacation(): void {
    this.trainer.vacation.push({});
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
