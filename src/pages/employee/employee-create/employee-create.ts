import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { AuthService } from 'app/services/auth';
import { EmployeeStore } from 'app/services/employee';
import { IEmployee } from 'app/services/employee/employee';

@IonicPage({
  name: 'employee/create',
  segment: 'employee/create'
})
@Component({
  templateUrl: 'employee-create.html'
})
export class EmployeeCreatePage {
  @Input() company: any;
  model: IEmployee;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private auth: AuthService,
    private employeeStore: EmployeeStore,
    public utils: Utils
  ) {
    this.company = this.navParams.data;
    this.model = new IEmployee();
    this.model.companyId = this.company.id;
  }

  save(): void {
    this.utils.showLoading('Zapisywanie pracownika...');
    this.employeeStore.newProfile(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Pracownik dodany.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
