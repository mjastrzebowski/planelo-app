import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth/auth-service';
import { ITrainer } from 'app/services/trainer/trainer';
import { EmployeeStore } from 'app/services/employee';

@IonicPage({
  name: 'employee-vacations',
  segment: 'employee-vacations/:id',
  defaultHistory: ['companies']
})
@Component({
  templateUrl: 'employee-detail-vacations.html'
})
export class EmployeeDetailVacationsPage {
  @Input() model: any;
  days = [1, 2, 3, 4, 5, 6, 0];
  trainerId: number;
  newId: number = 0;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private employeeStore: EmployeeStore,
    public utils: Utils
  ) {
    this.trainerId = this.navParams.data.id;
    this.model = Utils.clone(this.navParams.data.days);
  }

  ngOnInit(): void {
    // this.utils.showLoading('Ładowanie godzin pracownika...');
    // this.sub = this.employeeStore.subscribe(loaded => {
    //   if (!loaded) {
    //     return;
    //   }
    //   this.model = this.employeeStore.getItem(this.params.data.id);
    //   this.utils.stopLoading();
    // });
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
    // this.employeeStore.updateVacations(this.trainerId, this.model).then(() => {
    //   this.utils.stopLoading();
    //   this.utils.showMessage('Godziny zapisane.');
    //   this.dismiss();
    // });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
