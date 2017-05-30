import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { ITrainer } from 'app/services/trainer/trainer';
import { TrainerStore } from 'app/services/trainer/trainer-store';

import { TrainerDetailPage } from 'app/pages/admin/trainer/trainer-detail/trainer-detail';


@Component({
  selector: 'trainer-item',
  templateUrl: 'trainer-item.html'
})
export class TrainerItem {
  @Input() model: ITrainer;
  nav: any;

  constructor(
    private app: App,
    private trainerStore: TrainerStore
  ) {}

  delete(): void {
    // this.trainerStore.removeTrainer(this.model);
  }

  goToTrainerDetail(trainer) {
    this.nav = this.app.getActiveNav();
    this.nav.push(TrainerDetailPage, trainer);
  }
}
