import { Component } from '@angular/core';
import { App, Modal, Alert, NavController, NavParams } from 'ionic-angular';

import {ClientFormModal} from '../client-form/client-form'

@Component({
  templateUrl: 'build/pages/client/client-detail/client-detail.html'
})
export class ClientDetailPage {
  constructor(app: App, nav: NavController, navParams: NavParams) {
    this.app = app;
    this.nav = nav;
    this.navParams = navParams;

    this.client = this.navParams.data;
  }

  showClientForm(client) {
    if (client) {
      let modal = Modal.create(ClientFormModal, client);
    } else {
      let modal = Modal.create(ClientFormModal);
    }

    modal.onDismiss(data => {
      console.log('closed client modal with data: ', data);
    });
    this.nav.present(modal);
  }

  getClientDetail(client) {
    // this.clientData.getClientByUsername(username).then(client => {
    //   if (client) {
    //     this.client = Object.keys(client).map(key => client[key])[0];
    //     this.cycleData.getCyclesByClient(username).then(cycles => {
    //       this.cycles = Object.keys(cycles).map(key => cycles[key]);
    //     })
    //   }
    // });
  }

  ionViewLoaded() {
    this.getClientDetail(this.client);
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