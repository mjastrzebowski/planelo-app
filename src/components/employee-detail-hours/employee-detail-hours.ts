import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { EmployeeDetailHoursPage } from 'app/pages';

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

  edit(): void {
    this.modalCtrl.create(EmployeeDetailHoursPage, this.model).present();
  }
}
