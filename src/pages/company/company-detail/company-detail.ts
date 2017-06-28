import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ICompany } from 'app/services/company/company';
import { CompanyStore } from 'app/services/company/company-store';

import { ClientStore } from 'app/services/client/client-store';
import { EmployeeStore } from 'app/services/employee/employee-store';
import { PlaceStore } from 'app/services/place/place-store';

@IonicPage({
  name: 'company',
  segment: 'company/:id',
  defaultHistory: ['companies']
})
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
    private modalCtrl: ModalController,
    private utils: Utils,
    private companyStore: CompanyStore,
    private clientStore: ClientStore,
    private placeStore: PlaceStore,
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

  createEmployee(model): void {
    this.modalCtrl.create('employee/create', model).present();
  }
}
