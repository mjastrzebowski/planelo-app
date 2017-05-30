import { Component, Input } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IRoutine } from 'app/services/routine/routine';
import { RoutineStore } from 'app/services/routine/routine-store';

@Component({
  templateUrl: 'routine-detail.html'
})
export class RoutineDetailPage {
  @Input() model: IRoutine;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private routineStore: RoutineStore
  ) {
    this.model = this.routineStore.getItem(this.params.data.id) || new IRoutine();
  }
}
