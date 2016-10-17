import { Component, Input } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { TrainerService } from '../../../core/trainer/trainer-service';

import { TrainerCreateModal } from '../trainer-create/trainer-create'
import { TrainerDetailPage } from '../trainer-detail/trainer-detail'

@Component({
  templateUrl: 'trainer-list.html'
})
export class TrainerListPage {
  @Input() trainers: ReplaySubject<List<any>>;

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private trainerStore: TrainerStore,
    private trainerService: TrainerService
  ) {
    this.queryText = '';
  }

  goToTrainerDetail(trainer): void {
    this.nav.push(TrainerDetailPage, trainer);
  }

  showTrainerCreate(): void {
    let modal = this.modalCtrl.create(TrainerCreateModal);
    modal.onDidDismiss(data => {
      if (data) {
        this.trainerService.createTrainer(
          data.title || '',
          data.email || '',
          data.hours || '');
      }
    });
    modal.present();
  }

  updateList(): void {
    this.shownSessions = 0;
    let queryText = this.queryText.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter(w => w.trim().length);

    this.trainerStore.list.forEach(trainer => {
      trainer.hide = false;
      let matchesQueryText = false;

      if (queryWords.length) {
        // of any query word is in the trainer title than it passes the query test
        queryWords.forEach(queryWord => {
          if (trainer.title.toLowerCase().indexOf(queryWord) > -1) {
            matchesQueryText = true;
          }
        });
      } else {
        // if there are no query words then this client passes the query test
        matchesQueryText = true;
      }

      if (!matchesQueryText) {
        trainer.hide = true;
      } else {
        this.shownSessions++;
      }
    });
  }

  ionViewDidEnter(): void {
    this.utils.presentLoading('Ładowanie trenerów...');

    let authSub = this.auth.subscribe((authenticated: boolean) => {
      this.trainers = this.trainerStore.trainers;

      if (authenticated) {
        if (authSub) {
          authSub.unsubscribe();
        }

        if (this.auth.isOwner) {
          let trainerSub = this.trainers.subscribe(() => {
            setTimeout(() => {
              this.shownSessions = true;
              this.utils.stopLoading();
            }, 500);
          });
        }
      }
    });
  }
}
