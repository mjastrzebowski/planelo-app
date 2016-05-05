import {IonicApp, Page, Modal, Alert, NavController} from 'ionic/ionic';

import { ChangeDetectionStrategy, Input } from 'angular2/core';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';

import { AuthService } from '../../../core/auth/auth-service';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { TrainerService } from '../../../core/trainer/trainer-service';

import {TrainerFormModal} from '../trainer-form/trainer-form'
import {TrainerDetailPage} from '../trainer-detail/trainer-detail'

@Page({
  templateUrl: 'build/pages/trainer/trainer-list/trainer-list.html'
})
export class TrainerListPage {
  @Input() trainers: ReplaySubject<List<any>>;

  constructor(app: IonicApp, nav: NavController, auth: AuthService, trainerStore: TrainerStore, trainerService: TrainerService) {
    this.app = app;
    this.nav = nav;
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

  onPageLoaded() {
    this.auth.subscribe((authenticated: boolean) => {
      this.trainers = this.trainerStore.trainers;

      if (this.auth.isOwner) {
        this.trainers.subscribe(() => {
          // nothing to do here
        });
      }
    });
  }
}
