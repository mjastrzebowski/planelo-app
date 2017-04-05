import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ICompany } from 'app/services/company/company';
import { CompanyStore } from 'app/services/company/company-store';

@Component({
  templateUrl: 'company-detail.html'
})
export class CompanyDetailPage {
  @Input() model: ICompany;
  private sub;
  employeeFilter = '';
  clientFilter = '';

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private companyStore: CompanyStore
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
