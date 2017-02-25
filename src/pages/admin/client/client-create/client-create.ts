import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IClient } from 'app/services/client/client';

@Component({
  templateUrl: 'client-create.html'
})
export class ClientCreateModal {
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
      this.client = new IClient();
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
