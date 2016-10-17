import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IClient } from '../../../core/client/client';

@Component({
  templateUrl: 'client-detail-profile.html'
})
export class ClientDetailProfileModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController
  ) {}

  ngOnInit(): void {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
    }
  }

  save(): void {
    this.viewCtrl.dismiss(this.client);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  delete(): void {
    this.client.delete = true;
    this.viewCtrl.dismiss(this.client);
  }
}
