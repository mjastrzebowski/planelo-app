import { Component, Input, Pipe } from '@angular/core';

import { App } from 'ionic-angular';

import { IBill } from '../../../core/bill/bill';
import { BillService } from '../../../core/bill/bill-service';

import { PlaceStore } from '../../../core/place/place-store';
import { ClientStore } from '../../../core/client/client-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';

import { ClientDetailPage } from '../../../pages/client/client-detail/client-detail';


@Component({
  selector: 'bill-item',
  templateUrl: 'build/components/bill/bill-item/bill-item.html'
})
export class BillItem {
  @Input() model: IBill;

  editing: boolean = false;
  // title: string = '';

  constructor(private app: App, billService: BillService, public placeStore: PlaceStore, public clientStore: ClientStore, public trainerStore: TrainerStore) {}

  ngAfterContentChecked() {
    let created = moment(this.model.createdAt);
    this.model.fromNow = created.fromNow();
    this.model.descDate = created.format('DD.MM.YYYY, HH:mm');

    moment.locale('pl');
    let month = moment(this.model.month);
    this.model.descMonth = month.format('MMMM');
  }

  delete(): void {
    this.billService.deleteBill(this.model);
  }

  editTitle(): void {
    this.editing = true;
    // this.title = this.model.title;
  }

  // saveTitle(): void {
  //   if (this.editing) {
  //     const title: string = this.title.trim();
  //     if (title.length && title !== this.model.title) {
  //       this.workoutService.updateWorkout(this.model, {title});
  //     }
  //     this.stopEditing();
  //   }
  // }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.billService.updateBill(this.model, {
      completed: !this.model.completed
    });
  }

  // TEMP solution!
  getOwnerAlias(key) {
    switch (key) {
      case '-KBN-b7GjsB6FS8Opmx0':
      case '-KNSsNzm8WH_t_lwASAz': {
        return 'Michał';
      }
      case '-KBN-fYLnmIQ_6pSwnV6': {
        return 'Adam';
      }
      default: {
        return 'Jarek';
      }
    }
  }

  goToClientDetail(client) {
    this.nav = this.app.getActiveNav();
    this.nav.push(ClientDetailPage, client);
  }
}
