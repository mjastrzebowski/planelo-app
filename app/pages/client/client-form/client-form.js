import { Component, Input } from '@angular/core';

import {App, NavParams, ViewController} from 'ionic-angular';

import { IClient } from '../../../core/client/client';

import {Utils} from '../../../providers/utils';

@Component({
  templateUrl: 'build/pages/client/client-form/client-form.html'
})
export class ClientFormModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(app: App, params: NavParams, viewCtrl: ViewController) {
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
