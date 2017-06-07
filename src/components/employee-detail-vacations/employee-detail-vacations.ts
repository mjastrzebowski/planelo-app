import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { EmployeeDetailVacationsPage } from 'app/pages';

@Component({
  selector: 'employee-detail-vacations',
  templateUrl: 'employee-detail-vacations.html'
})
export class EmployeeDetailVacations {
  @Input() model: any;

  constructor(
    private modalCtrl: ModalController,
    private utils: Utils
  ) {}

  edit(): void {
    this.modalCtrl.create(EmployeeDetailVacationsPage, this.model).present();
  }
}
