import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/training-history/training-history.html'
})
export class TrainingHistoryModal {
  constructor(params: NavParams, viewCtrl: ViewController) {
    this.viewCtrl = viewCtrl;
    this.params = params;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
