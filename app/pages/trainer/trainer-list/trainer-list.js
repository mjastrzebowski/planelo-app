import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { App, Modal, Alert, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { TrainerService } from '../../../core/trainer/trainer-service';

import {TrainerFormModal} from '../trainer-form/trainer-form'
import {TrainerDetailPage} from '../trainer-detail/trainer-detail'

@Component({
  templateUrl: 'build/pages/trainer/trainer-list/trainer-list.html'
})
export class TrainerListPage {
  @Input() trainers: ReplaySubject<List<any>>;

  constructor(app: App, nav: NavController, utils: Utils, auth: AuthService, trainerStore: TrainerStore, trainerService: TrainerService) {
    this.app = app;
    this.nav = nav;
    this.utils = utils;
    this.auth = auth;

    this.trainerStore = trainerStore;
    this.trainerService = trainerService;

    // this.trainers = [];
    this.queryText = '';
  }


  showTrainerForm(trainer) {
    if (trainer) {
      let modal = Modal.create(TrainerFormModal, trainer);
      this.editing = true;
    } else {
      let modal = Modal.create(TrainerFormModal);
      this.editing = false;
    }

    modal.onDismiss(data => {
      console.log('closed trainer modal with data: ', data);
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.trainerService.deleteTrainer(data);
          return;
        }

        if (this.editing) {
          this.trainerService.updateTrainer(data, {
            title: data.title || '',
            email: data.email || '',
            hours: data.hours || [[]]
          });
        } else {
          this.trainerService.createTrainer(
            data.title || '',
            data.email || '',
            data.hours || '');
        }
      }
    });
    this.nav.present(modal);
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
