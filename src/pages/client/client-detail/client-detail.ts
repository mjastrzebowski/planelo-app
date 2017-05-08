import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ClientStore } from 'app/services/client/client-store';

import { PlaceStore } from 'app/services/place/place-store';

@IonicPage({
  name: 'client',
  segment: 'client/:id',
  defaultHistory: ['companies']
})
@Component({
  templateUrl: 'client-detail.html'
})
export class ClientDetailPage {
  @Input() model: any;
  private sub;
  clientFilter = '';

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private clientStore: ClientStore,
    private placeStore: PlaceStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie klientów...');
    this.sub = this.clientStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.model = this.clientStore.getItem(this.params.data.id);
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
