import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth';
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
  employeeId: number;
  newId: number = 0;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private employeeStore: EmployeeStore,
    public utils: Utils
  ) {
    this.employeeId = this.navParams.data.id;
    this.model = Utils.clone(this.navParams.data.vacations);
  }

  add(): void {
    if (!this.model) {
      this.model = [];
    }
    this.model.push({
      id: this.newId++,
      start: '',
      end: '',
      employeeId: this.employeeId,
      reason: '',
      create: true
    });
  }

  remove(vacation: any): void {
    vacation.delete = true;
  }

  save(): void {
    this.utils.showLoading('Zapisywanie urlopów...');
    this.employeeStore.updateVacations(this.employeeId, this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Urlopy zapisane.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
