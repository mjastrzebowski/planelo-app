import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IRoutine } from 'app/services/routine/routine';
import { RoutineStore } from 'app/services/routine/routine-store';

// import { RoutineDetailPage } from 'app/pages/admin/routine/routine-detail/routine-detail';


@Component({
  selector: 'routine-item',
  templateUrl: 'routine-item.html'
})
export class RoutineItem {
  @Input() model: IRoutine;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils,
    private routineStore: RoutineStore
  ) {}

  delete(): void {
    this.routineStore.delete(this.model.id).then(() => {
      this.utils.showMessage('Plan treningowy usunięty.');
    });
  }

  goToRoutineDetail(routine) {
    this.nav = this.app.getActiveNav();
    // this.nav.push(RoutineDetailPage, routine);
  }
}
