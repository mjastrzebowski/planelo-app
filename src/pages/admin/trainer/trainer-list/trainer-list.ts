import { Component, Input } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/core/auth/auth-service';
import { TrainerStore } from 'app/core/trainer/trainer-store';

import { TrainerCreateModal } from '../trainer-create/trainer-create'
import { TrainerDetailPage } from '../trainer-detail/trainer-detail'

@Component({
  templateUrl: 'trainer-list.html'
})
export class TrainerListPage {
  private sub;
  filter = '';

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private trainerStore: TrainerStore
  ) {}

  ngOnInit(): void {
    this.utils.presentLoading('Ładowanie trenerów...');
    this.sub = this.trainerStore.subscribe(loaded => {
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

  goToTrainerDetail(trainer): void {
    this.nav.push(TrainerDetailPage, trainer);
  }

  showTrainerCreate(): void {
    let modal = this.modalCtrl.create(TrainerCreateModal);
    modal.onDidDismiss(data => {
      if (data) {
        this.trainerStore.createTrainer(
          data.title || '',
          data.email || '',
          data.hours || '');
      }
    });
    modal.present();
  }
}
