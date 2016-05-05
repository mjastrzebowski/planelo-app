import { Input } from 'angular2/core';

import {IonicApp, Page, NavParams, ViewController} from 'ionic/ionic';

import { ITrainer } from '../../../core/trainer/trainer';

import {Utils} from '../../../providers/utils';

@Page({
  templateUrl: 'build/pages/trainer/trainer-form/trainer-form.html'
})
export class TrainerFormModal {
  @Input() trainer: ITrainer;
  editing: boolean = false;

  constructor(app: IonicApp, params: NavParams, viewCtrl: ViewController) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  onPageLoaded() {
    let hours = [ {
      "8:00" : true,
      "9:00" : true
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true,
    }, {
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "11:00" : true,
      "12:00" : true
    } ];

    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
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
