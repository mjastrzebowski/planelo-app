import { Component, Input, Renderer } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ICompany } from 'app/services/company/company';
import { CompanyStore } from 'app/services/company/company-store';

@Component({
  templateUrl: 'company-create.html'
})
export class CompanyCreateModal {
  @Input() model: ICompany;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils,
    private companyStore: CompanyStore
  ) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.model = this.companyStore.getItem(this.params.data) || new ICompany();
  }

  save(): void {
    this.utils.showLoading('Zapisywanie firmy...');
    this.companyStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Firma dodana.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
