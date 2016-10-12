import { Component, Input, Pipe } from '@angular/core';

import { App } from 'ionic-angular';

import { IClient } from '../../../core/client/client';
import { ClientService } from '../../../core/client/client-service';

import { ClientStore } from '../../../core/client/client-store';

import { ClientDetailPage } from '../../../pages/client/client-detail/client-detail';


@Component({
  selector: 'client-item',
  templateUrl: 'build/components/client/client-item/client-item.html'
})
export class ClientItem {
  @Input() model: IClient;

  editing: boolean = false;
  // title: string = '';

  constructor(private app: App, clientService: ClientService, public clientStore: ClientStore) {}

  ngAfterContentChecked() {
    // let created = moment(this.model.createdAt);
    // this.model.fromNow = created.fromNow();
    // this.model.descDate = created.format('DD.MM.YYYY, HH:mm');

    // let read = localStorage.getItem('client-counter-read');
    // this.model.unread = (this.model.createdAt > read);
  }

  delete(): void {
    this.clientService.deleteClient(this.model);
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
    this.clientService.updateClient(this.model, {
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
