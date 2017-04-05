import { Component, Input } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { CompanyStore } from 'app/services/company/company-store';

import { CompanyCreateModal } from '../company-create/company-create';
import { FindSelectModal } from 'app/components/common/find-select/find-select';

@Component({
  templateUrl: 'company-list.html'
})
export class CompanyListPage {
  private sub;
  filter = {
    category: 0,
    query: ''
  };

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private companyStore: CompanyStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie firm...');
    this.sub = this.companyStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  showCreateModal(): void {
    // this.modalCtrl.create(CompanyCreateModal).present();
    this.modalCtrl.create(FindSelectModal, this.companyStore).present();
  }
}
