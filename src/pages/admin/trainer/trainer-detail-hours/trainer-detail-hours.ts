import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth/auth-service';
import { ITrainer } from 'app/services/trainer/trainer';


@Component({
  templateUrl: 'trainer-detail-hours.html'
})
export class TrainerDetailHoursModal {
  days = [1, 2, 3, 4, 5, 6, 0];
  trainerId: number;
  trainerDays: any;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    public utils: Utils
  ) {
    this.trainerId = this.navParams.data.id;
    this.trainerDays = Utils.clone(this.navParams.data.days);
  }

  add(day: number): void {
    if (!this.trainerDays[day]) {
      this.trainerDays[day] = [];
    }
    this.trainerDays[day].push({
      start: '',
      end: '',
      profileId: this.trainerId,
      day: day,
      create: true
    });
  }

  remove(hour: any): void {
    hour.delete = true;
  }

  save(): void {
    this.viewCtrl.dismiss(this.trainerDays);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
