import { Component, Input, Renderer, ViewChildren } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { BaseStore } from 'app/services/_base/base-store';

@Component({
  templateUrl: 'find-select.html'
})
export class FindSelectModal {
  @Input() store: BaseStore;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('items') items: any;
  private sub;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private renderer: Renderer,
    private utils: Utils
  ) {
    this.filter = { query: '' };
    this.store = this.params.data;
    // this.renderer.setElementClass(this.viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie danych...');
    this.sub = this.store.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  isEmpty() {
    if (this.items && this.items.length) {
      let list = this.items.filter(item => {
        return !item.model.hide;
      });
      return list.length === 0;
    }
    return true;
  }

  select(data): void {
    this.viewCtrl.dismiss(data);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
