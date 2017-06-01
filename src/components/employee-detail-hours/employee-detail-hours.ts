import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';
import { BaseStore } from 'app/services/_base/base-store';

@Component({
  selector: 'employee-detail-hours',
  templateUrl: 'employee-detail-hours.html'
})
export class EmployeeDetailHours {
  @Input() store: BaseStore;
  @Input() model: any;
  @Input() detail: any;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils
  ) {}

  delete(event): void {
    event.stopPropagation();
    this.store.delete(this.model.id).then(() => {
      this.utils.showMessage('Usunięto.');
    });
  }

  goToDetail(itemId) {
    this.nav = this.app.getActiveNav();
    this.nav.push(this.detail, { id: itemId });
  }
}
