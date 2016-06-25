import { Component, Input } from '@angular/core';

import {App, NavParams, ViewController} from 'ionic-angular';

import { ITrainer } from '../../../core/trainer/trainer';

import {Utils} from '../../../providers/utils';

@Component({
  templateUrl: 'build/pages/trainer/trainer-form/trainer-form.html'
})
export class TrainerFormModal {
  @Input() trainer: ITrainer;
  editing: boolean = false;

  constructor(app: App, params: NavParams, viewCtrl: ViewController) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  ionViewLoaded() {
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
