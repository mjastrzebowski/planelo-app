import { Component, Input } from '@angular/core';

import { App, NavParams, ViewController } from 'ionic-angular';

import { ITrainer } from '../../../core/trainer/trainer';

import { Utils } from '../../../providers/utils';

@Component({
  templateUrl: 'trainer-detail-profile.html'
})
export class TrainerDetailProfileModal {
  @Input() trainer: ITrainer;

  constructor(app: App, params: NavParams, viewCtrl: ViewController) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  ionViewLoaded() {
    if (this.params.data.hasOwnProperty('key')) {
      this.trainer = this.params.data;
      if (!this.trainer.hasOwnProperty('hours')) {
        this.trainer.hours = hours;
      }
    } else {
      this.trainer = {
        title: '',
        email: '',
        hours: hours
      };
    }
  }

  save() {
    this.viewCtrl.dismiss(this.trainer);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.trainer.delete = true;
    this.viewCtrl.dismiss(this.trainer);
  }
}
