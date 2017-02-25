import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ITrainer } from 'app/services/trainer/trainer';

@Component({
  templateUrl: 'trainer-create.html'
})
export class TrainerCreateModal {
  @Input() trainer: ITrainer;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController
  ) {}

  ngOnInit(): void {
    let hours = [{
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true
    }, {
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "17:00" : true,
      "18:00" : true,
      "19:00" : true,
      "20:00" : true,
    }, {
      "7:00" : false,
      "8:00" : true,
      "9:00" : true,
      "10:00" : true,
      "11:00" : true,
      "12:00" : true
    }];

    if (this.params.data.hasOwnProperty('key')) {
      this.trainer = this.params.data;
      if (!this.trainer.hasOwnProperty('hours')) {
        this.trainer.hours = hours;
      }
    } else {
      this.trainer = new ITrainer();
      this.trainer.hours = hours;
    }
  }

  save(): void {
    this.viewCtrl.dismiss(this.trainer);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
