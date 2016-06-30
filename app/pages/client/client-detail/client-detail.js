import { Component } from '@angular/core';
import { App, Modal, Alert, NavController, NavParams } from 'ionic-angular';

// import { ClientStore } from '../../../core/client/client-store';
import { AuthService } from '../../../core/auth/auth-service';
import { ClientService } from '../../../core/client/client-service';

import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { ClientDetailProfileModal } from '../client-detail-profile/client-detail-profile';
import { ClientDetailAccessModal } from '../client-detail-access/client-detail-access';
import { ClientDetailBillingModal } from '../client-detail-billing/client-detail-billing';

@Component({
  templateUrl: 'build/pages/client/client-detail/client-detail.html'
})
export class ClientDetailPage {
  constructor(app: App, nav: NavController, navParams: NavParams, auth: AuthService, clientService: ClientService, placeStore: PlaceStore, trainerStore: TrainerStore, workoutStore: WorkoutStore) {
    this.app = app;
    this.nav = nav;
    this.navParams = navParams;

    this.client = this.navParams.data;
    this.auth = auth;
    this.clientService = clientService;

    this.placeStore = placeStore;
    this.trainerStore = trainerStore;
    this.workoutStore = workoutStore;

    this.trainingsDone = this.workoutStore.filterBy({ client: this.client.key, fixed: false, completed: false, dateBefore: new Date() });
    this.trainingsDoneLast = this.trainingsDone.get(-1);
    this.trainingsTodo = this.workoutStore.filterBy({ client: this.client.key, fixed: false, completed: false, dateAfter: new Date() });
    this.trainingsTodoNext = this.trainingsTodo.get(0);
    this.trainingsScheduled = this.workoutStore.filterBy({ client: this.client.key, fixed: true });
  }

  showClientProfile(client) {
    if (client) {
      let clientObject = Object.assign({}, client);
      let modal = Modal.create(ClientDetailProfileModal, clientObject);
      this.editing = true;
    } else {
      let modal = Modal.create(ClientDetailProfileModal);
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
        this.client = data;
      }
    });
    this.nav.present(modal);
  }

  showClientAccess(client) {
    if (client) {
      let clientObject = Object.assign({}, client);
      let modal = Modal.create(ClientDetailAccessModal, clientObject);
      this.editing = true;
    } else {
      let modal = Modal.create(ClientDetailAccessModal);
      this.editing = false;
    }

    modal.onDismiss(data => {
      console.log('closed client modal with data: ', data);
      if (data) {
        this.clientService.updateClient(data, {
          username: data.username || '',
          email: data.email || '',
          phone: data.phone || '',
          comment: data.comment || ''
        });
      }
    });
    this.nav.present(modal);
  }

  showClientBilling(client) {
    if (client) {
      let clientObject = Object.assign({}, client);
      let modal = Modal.create(ClientDetailBillingModal, clientObject);
      this.editing = true;
    } else {
      let modal = Modal.create(ClientDetailBillingModal);
      this.editing = false;
    }

    modal.onDismiss(data => {
      console.log('closed client modal with data: ', data);
      // if (data) {
      //   if (data.hasOwnProperty('delete')) {
      //     this.clientService.deleteClient(data);
      //     return;
      //   }

      //   // this.clientService.updateClient(data, {
      //   //   username: data.username || '',
      //   //   email: data.email || '',
      //   //   phone: data.phone || '',
      //   //   comment: data.comment || ''
      //   // });
      // }
    });
    this.nav.present(modal);
  }

  ionViewLoaded() {
    // this.getClientDetail(this.client);
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
