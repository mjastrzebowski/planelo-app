import { Input } from 'angular2/core';

import {IonicApp, Page, NavParams, ViewController} from 'ionic/ionic';

import { IClient } from '../../../core/client/client';

import {Utils} from '../../../providers/utils';

@Page({
  templateUrl: 'build/pages/client/client-form/client-form.html'
})
export class ClientFormModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(app: IonicApp, params: NavParams, viewCtrl: ViewController) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
  }

  onPageLoaded() {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
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
