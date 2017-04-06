import { Component, Input, ViewChildren, ChangeDetectorRef } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';

@Component({
  selector: 'common-item-list',
  templateUrl: 'common-item-list.html'
})
export class CommonItemList {
  private sub;
  @Input() store: BaseStore;
  @Input() detail: any;
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('items') items: any;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sub = this.store.subscribe(loaded => {
      if (loaded) {
        this.cdr.detectChanges();
      }
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
}
