import { Component, Input } from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { ITrainer } from '../../../core/trainer/trainer';

import { Utils } from '../../../providers/utils';

@Component({
  templateUrl: 'trainer-detail-vacation.html'
})
export class TrainerDetailVacationModal {
  @Input() trainer: ITrainer;

  constructor(app: App, params: NavParams, viewCtrl: ViewController) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  ionViewLoaded() {
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

  addVacation() {
    this.trainer.vacation.push({});
  }

  removeVacation(vacationId) {
    this.trainer.vacation.splice(vacationId, 1);
  }

  save() {
    this.viewCtrl.dismiss(this.trainer);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
