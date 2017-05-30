import { Component, Input, Renderer } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ClientStore } from 'app/services/client/client-store';

@IonicPage({
  name: 'clients/create',
  segment: 'clients/create'
})
@Component({
  templateUrl: 'client-create.html'
})
export class ClientCreateModal {
  @Input() model: any;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils,
    private clientStore: ClientStore
  ) {
    this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.model = this.clientStore.getItem(this.params.data);
  }

  save(): void {
    this.utils.showLoading('Zapisywanie klienta...');
    this.clientStore.create(this.model).then(() => {
      this.utils.stopLoading();
      this.utils.showMessage('Klient dodany.');
      this.dismiss();
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
