import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { NotificationCounter } from '../../../components/notification/notification-counter/notification-counter';

import { AuthService } from '../../../core/auth/auth-service';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { TrainerService } from '../../../core/trainer/trainer-service';

import { TrainerCreateModal } from '../trainer-create/trainer-create'
import { TrainerDetailPage } from '../trainer-detail/trainer-detail'

@Component({
  templateUrl: 'build/pages/trainer/trainer-list/trainer-list.html',
  directives: [
    NotificationCounter
  ]
})
export class TrainerListPage {
  @Input() trainers: ReplaySubject<List<any>>;

  constructor(public app: App, public nav: NavController, public modalCtrl: ModalController, public utils: Utils, public auth: AuthService, public trainerStore: TrainerStore, public trainerService: TrainerService) {

    this.queryText = '';
  }

  goToTrainerDetail(trainer) {
    this.nav.push(TrainerDetailPage, trainer);
  }

  showTrainerCreate() {
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

  updateList() {
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

  ionViewDidEnter() {
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
