import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ITrainer } from '../../../core/trainer/trainer';

@Component({
  templateUrl: 'trainer-detail-profile.html'
})
export class TrainerDetailProfileModal {
  @Input() trainer: ITrainer;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController
  ) {}

  ngOnInit(): void {
    if (this.params.data.hasOwnProperty('key')) {
      this.trainer = this.params.data;
    } else {
      this.trainer = new ITrainer();
    }
  }

  save(): void {
    this.viewCtrl.dismiss(this.trainer);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  delete(): void {
    this.trainer.delete = true;
    this.viewCtrl.dismiss(this.trainer);
  }
}
