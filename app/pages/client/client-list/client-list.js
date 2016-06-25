import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {App, Modal, Alert, NavController} from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientStore } from '../../../core/client/client-store';
import { ClientService } from '../../../core/client/client-service';

import {ClientFormModal} from '../client-form/client-form'
import {ClientDetailPage} from '../client-detail/client-detail'

@Component({
  templateUrl: 'build/pages/client/client-list/client-list.html'
})
export class ClientListPage {
  @Input() clients: ReplaySubject<List<any>>;

  constructor(app: App, nav: NavController, auth: AuthService, clientStore: ClientStore, clientService: ClientService) {
    this.app = app;
    this.nav = nav;
    this.auth = auth;
    this.clientStore = clientStore;
    this.clientService = clientService;

    this.queryText = '';
    this.hasSessions = false;
  }


  showClientForm(client) {
    if (client) {
      let modal = Modal.create(ClientFormModal, client);
      this.editing = true;
    } else {
      let modal = Modal.create(ClientFormModal);
      this.editing = false;
    }

    modal.onDismiss(data => {
      console.log('closed client modal with data: ', data);
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.clientService.deleteClient(data);
          return;
        }

        if (this.editing) {
          this.clientService.updateClient(data, {
            name: data.name || '',
            lastname: data.lastname || '',
            email: data.email || '',
            phone: data.phone || '',
            comment: data.comment || ''
          });
        } else {
          this.clientService.createClient(
            data.name || '',
            data.lastname || '',
            data.email || '',
            data.phone || '',
            data.comment || '');
        }
      }
    });
    this.nav.present(modal);
  }

  goToClientDetail(client) {
    this.nav.push(ClientDetailPage, client);
  }

  // getClients() {
  //   this.clientData.getClients().then(clients => {
  //     this.clients = Object.keys(clients).map(key => clients[key]);
  //   });
  // }

  updateList() {
    let queryText = this.queryText.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter(w => w.trim().length);

    this.clientStore.list.forEach(client => {
      client.hide = false;
      let matchesQueryText = false;

      if (queryWords.length) {
        // of any query word is in the client name or lastname than it passes the query test
        queryWords.forEach(queryWord => {
          if (client.name.toLowerCase().indexOf(queryWord) > -1 || client.lastname.toLowerCase().indexOf(queryWord) > -1) {
            matchesQueryText = true;
          }
        });
      } else {
        // if there are no query words then this client passes the query test
        matchesQueryText = true;
      }

      if (!matchesQueryText) {
        client.hide = true;
      }
    });
  }

  ionViewLoaded() {

    this.auth.subscribe((authenticated: boolean) => {
      this.clients = this.clientStore.clients;

      if (this.auth.isTrainer || this.auth.isOwner) {
        this.clients.subscribe(() => {
          this.shownSessions = true;
          // if (!this.calendar) {
          //   this.renderCalendar();
          // } else {
          //   this.refreshCalendar();
          // }
          // this.events = this.getEvents();
        });
      }

      // if (this.auth.isClient) {
      //   this.workouts.subscribe(() => {
      //     this.trainings = this.workoutStore.workouts;
      //   });
      // }
    });

    // this.getClients();
    // this.cycleData.addCycleByClient('mjastrzebowski', {
    //   id: 3,
    //   size: 16
    // });
    // this.cycleData.getLastCycleByClient('mjastrzebowski').then(cycles => {
    //   console.log('test promise', cycles);
    // });
    // let newId = this.clientData.addClient({ username: 'mjastrzebowski', name: 'Michał Jastrzębowski', age: 24 });
    // console.log('test newId', newId);
  }
}

/*

  Trainings: 
  - get all, 
  - get by trainer, 
  - get by client, 
  - get by cycle, 
  - get by id, 

  Clients: 
  - get all, 
  - get by id, 
  - get by name, 

  

*/