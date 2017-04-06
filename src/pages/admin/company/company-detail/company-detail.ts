import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ICompany } from 'app/services/company/company';
import { CompanyStore } from 'app/services/company/company-store';

import { ClientStore } from 'app/services/client/client-store';
import { ClientDetailPage } from 'app/pages/admin/client/client-detail/client-detail';
import { EmployeeStore } from 'app/services/employee/employee-store';

@Component({
  templateUrl: 'company-detail.html'
})
export class CompanyDetailPage {
  @Input() model: ICompany;
  private sub;
  employeeFilter = '';
  clientFilter = '';
  clientDetailPage = ClientDetailPage;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private companyStore: CompanyStore,
    private clientStore: ClientStore,
    private employeeStore: EmployeeStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie firm...');
    this.sub = this.companyStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.model = this.companyStore.getItem(this.params.data.id) || new ICompany();
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
