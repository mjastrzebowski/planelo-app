import { Component, Input } from '@angular/core';

import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { ClientStore } from 'app/services/client/client-store';

import { PlaceStore } from 'app/services/place/place-store';
import { SessionStore } from 'app/services/session/session-store';

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
  sections = [{
    value: 'sessions',
    icon: 'handshake-o',
    title: 'Spotkania'
  },{
    value: 'measurements',
    icon: 'bar-chart',
    title: 'Pomiary'
  },{
    value: 'routines',
    icon: 'book',
    title: 'Treningi'
  },{
    value: 'diet',
    icon: 'cutlery',
    title: 'Dieta'
  },{
    value: 'bills',
    icon: 'money',
    title: 'Rachunki'
  },{
    value: 'notes',
    icon: 'sticky-note-o',
    title: 'Notatki'
  }];
  section = this.sections[0].value;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils,
    private clientStore: ClientStore,
    private placeStore: PlaceStore,
    public sessionStore: SessionStore
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
