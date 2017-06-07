import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth';
import { ITrainer } from 'app/services/trainer/trainer';
import { EmployeeStore } from 'app/services/employee';

@IonicPage({
  name: 'employee-hours',
  segment: 'employee-hours/:id',
  defaultHistory: ['companies']
})
@Component({
  templateUrl: 'employee-detail-hours.html'
})
export class EmployeeDetailHoursPage {
  @Input() model: any;
  days = [1, 2, 3, 4, 5, 6, 0];
  employeeId: number;
  newId: number = 0;

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private employeeStore: EmployeeStore,
    public utils: Utils
  ) {}

  ngOnInit() {
    this.employeeId = this.navParams.data.id;
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
      employeeId: this.employeeId,
      day: day,
      create: true
    });
  }

  remove(hour: any): void {
    hour.delete = true;
  }

  save(): void {
    this.utils.showLoading('Zapisywanie godzin...');
    this.employeeStore.updateHours(this.employeeId, this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Godziny zapisane.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
