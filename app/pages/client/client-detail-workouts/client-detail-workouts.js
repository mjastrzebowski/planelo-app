import { Component, Input } from '@angular/core';
import { App, NavParams, ViewController } from 'ionic-angular';

import { IClient } from '../../../core/client/client';

import { WorkoutStore } from '../../../core/workout/workout-store';
import { WorkoutList } from '../../../components/workout/workout-list/workout-list';

@Component({
  directives: [WorkoutList],
  templateUrl: 'build/pages/client/client-detail-workouts/client-detail-workouts.html'
})
export class ClientDetailWorkoutsModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(app: App, params: NavParams, viewCtrl: ViewController, public workoutStore: WorkoutStore) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  ionViewLoaded() {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
    }
    this.clientWorkouts = this.workoutStore.filterBy({ client: this.client.key });
    debugger;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
