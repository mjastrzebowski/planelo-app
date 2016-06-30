import { Component, Input } from '@angular/core';
import { App, NavParams, ViewController } from 'ionic-angular';

import { IClient } from '../../../core/client/client';

import { Utils } from '../../../providers/utils';
import { WorkoutStore } from '../../../core/workout/workout-store';

@Component({
  templateUrl: 'build/pages/client/client-detail-billing/client-detail-billing.html'
})
export class ClientDetailBillingModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(app: App, params: NavParams, viewCtrl: ViewController, utils: Utils, workoutStore: WorkoutStore) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
    this.utils = utils;
    this.workoutStore = workoutStore;

    this.trainingPrice = 120;
  }

  ionViewLoaded() {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
    }

    // this.client.trainingsTodoCount = 0;
    // this.client.trainingsDoneCount = 0;
    // this.client.trainingsPlannedCount = 0;
    // this.client.trainingsMovedCount = 0;
    this.client.surcharge = 0;
    this.client.total = 0;
  }

  updateMonth() {
    let date = new Date(this.client.month + '-01');
    let year = date.getFullYear();
    let month = date.getMonth();
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    this.trainingsTodo = this.workoutStore.filterBy({
      client: this.client.key,
      fixed: false,
      completed: false,
      dateAfter: firstDay,
      dateBefore: lastDay
    });
    this.client.trainingsTodoCount = this.trainingsTodo.size;

    firstDay = new Date(year, --month, 1);
    lastDay = new Date(year, month + 1, 0);
    this.trainingsDone = this.workoutStore.filterBy({
      client: this.client.key,
      fixed: false,
      dateAfter: firstDay,
      dateBefore: lastDay
    });
    this.client.trainingsDoneCount = this.trainingsDone.size;

    this.client.trainingsPlannedCount = 12;
    this.client.trainingsMovedCount = this.client.trainingsPlannedCount - this.client.trainingsDoneCount;
    if (this.client.trainingsMovedCount < 0) {
      this.client.surcharge = this.client.trainingsMovedCount * -this.trainingPrice;
      this.client.trainingsMovedCount = 0;
    }
    this.updateTotal();
  }

  updateTotal() {
    // debugger;
    let trainings = this.client.trainingsTodoCount - this.client.trainingsMovedCount;
    let subtotal = trainings * this.trainingPrice + this.client.surcharge;
    if (subtotal > 0) {
      let discount = this.client.discount > 0 ? subtotal * this.client.discount / 100 : 0;
      this.client.total = subtotal - discount;
    } else {
      this.client.total = 0;
    }
  }

  save() {
    this.viewCtrl.dismiss(this.client);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.client.delete = true;
    this.viewCtrl.dismiss(this.client);
  }
}
