import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ICompany } from 'app/services/company/company';
import { CompanyStore } from 'app/services/company/company-store';

import { CompanyDetailPage } from 'app/pages/admin/company/company-detail/company-detail';


@Component({
  selector: 'company-item',
  templateUrl: 'company-item.html'
})
export class CompanyItem {
  @Input() model: ICompany;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils,
    private companyStore: CompanyStore
  ) {}

  delete(event): void {
    event.stopPropagation();
    this.companyStore.delete(this.model.id).then(() => {
      this.utils.showMessage('Firma usunięta.');
    });
  }

  goToDetail(itemId) {
    this.nav = this.app.getActiveNav();
    this.nav.push(CompanyDetailPage, { id: itemId });
  }
}
