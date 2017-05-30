import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IEmployee } from 'app/services/employee/employee';
import { EmployeeStore } from 'app/services/employee/employee-store';

// import { EmployeeDetailPage } from 'app/pages/admin/employee/employee-detail/employee-detail';


@Component({
  selector: 'employee-item',
  templateUrl: 'employee-item.html'
})
export class EmployeeItem {
  @Input() model: IEmployee;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils,
    private employeeStore: EmployeeStore
  ) {}

  delete(event): void {
    event.stopPropagation();
    this.employeeStore.delete(this.model.id).then(() => {
      this.utils.showMessage('Pracownik usunięty.');
    });
  }

  goToDetail(itemId) {
    this.nav = this.app.getActiveNav();
    // this.nav.push(EmployeeDetailPage, { id: itemId });
  }
}
