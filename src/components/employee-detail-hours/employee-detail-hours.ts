import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { EmployeeDetailHoursPage } from 'app/pages/employee/employee-detail-hours/employee-detail-hours';

@Component({
  selector: 'employee-detail-hours',
  templateUrl: 'employee-detail-hours.html'
})
export class EmployeeDetailHours {
  @Input() model: any;

  constructor(
    private modalCtrl: ModalController,
    private utils: Utils
  ) {}

  editHours(): void {
    this.modalCtrl.create(EmployeeDetailHoursPage, this.model).present();
  }
}
