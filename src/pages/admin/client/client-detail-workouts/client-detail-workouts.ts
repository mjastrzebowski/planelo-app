import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IClient } from 'app/services/client/client';

import { ProfileSessionStore } from 'app/services/profile-session/profile-session-store';

@Component({
  templateUrl: 'client-detail-workouts.html'
})
export class ClientDetailWorkoutsModal {
  @Input() client: IClient;
  editing: boolean = false;
  clientWorkouts: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private profileSessionStore: ProfileSessionStore
  ) {}

  ngOnInit(): void {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = new IClient();
    }
    this.clientWorkouts = this.profileSessionStore.filterBy({ client: this.client.key });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
