import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth/auth-service';
import { ITrainer } from 'app/services/trainer/trainer';
import { TrainerStore } from 'app/services/trainer/trainer-store';


@Component({
  templateUrl: 'trainer-detail-hours.html'
})
export class TrainerDetailHoursModal {
  @Input() model: any;
  days = [1, 2, 3, 4, 5, 6, 0];
  trainerId: number;
  newId: number = 0;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private trainerStore: TrainerStore,
    public utils: Utils
  ) {
    this.trainerId = this.navParams.data.id;
    this.model = Utils.clone(this.navParams.data.days);
  }

  add(day: number): void {
    if (!this.model[day]) {
      this.model[day] = [];
    }
    this.model[day].push({
      id: this.newId++,
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
    this.utils.showLoading('Zapisywanie godzin...');
    this.trainerStore.updateHours(this.trainerId, this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Godziny zapisane.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
