import { Component, Input } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { RoutineStore } from 'app/services/routine/routine-store';

import { RoutineCreateModal } from '../routine-create/routine-create'
import { RoutineDetailPage } from '../routine-detail/routine-detail'

@Component({
  templateUrl: 'routine-list.html'
})
export class RoutineListPage {
  private sub;
  filter = {
    query: ''
  };

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private routineStore: RoutineStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie planów treningowych...');
    this.sub = this.routineStore.subscribe(loaded => {
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

  goToRoutineDetail(routine): void {
    this.nav.push(RoutineDetailPage, routine);
  }

  showRoutineCreate(): void {
    let modal = this.modalCtrl.create(RoutineCreateModal);
    modal.onDidDismiss(this.afterCreate.bind(this));
    modal.present();
  }

  afterCreate(result): void {
    if (result && result.id) {
      this.nav.push(RoutineDetailPage, result.id);
    }
  }
}
