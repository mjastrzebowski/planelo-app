import { Component } from '@angular/core';
import {App, Modal, Alert, NavController, NavParams} from 'ionic-angular';

import {ClientFormModal} from '../client-form/client-form'

@Component({
  templateUrl: 'build/pages/client/client-detail/client-detail.html'
})
export class ClientDetailPage {
  constructor(app: App, nav: NavController, navParams: NavParams) {
    this.app = app;
    this.nav = nav;
    this.navParams = navParams;

    this.client = {};
    this.cycles = {};
    this.clientName = this.navParams.data;
  }

  showClientForm(client) {
    if (client) {
      let modal = Modal.create(ClientFormModal, client.username);
    } else {
      let modal = Modal.create(ClientFormModal);
    }

    modal.onDismiss(data => {
      console.log('closed client modal with data: ', data);
    });
    this.nav.present(modal);
  }

  getClientDetail(username) {
    this.clientData.getClientByUsername(username).then(client => {
      if (client) {
        this.client = Object.keys(client).map(key => client[key])[0];
        this.cycleData.getCyclesByClient(username).then(cycles => {
          this.cycles = Object.keys(cycles).map(key => cycles[key]);
        })
      }
    });
  }

  loadCalendar() {
    $(document).ready(function() {
      console.log('test??!!');
      // .draggable();
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2016-01-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2016-01-01'
          },
          {
            title: 'Long Event',
            start: '2016-01-07',
            end: '2016-01-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2016-01-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2016-01-11',
            end: '2016-01-13'
          },
          {
            title: 'Meeting',
            start: '2016-01-12T10:30:00',
            end: '2016-01-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2016-01-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2016-01-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2016-01-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2016-01-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2016-01-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-01-28'
          }
        ]
      });
    });
  }

  ionViewLoaded() {
    this.getClientDetail(this.clientName);
    // this.cycleData.addCycleByClient('mjastrzebowski', {
    //   id: 3,
    //   size: 16
    // });
    // this.cycleData.getLastCycleByClient('mjastrzebowski').then(cycles => {
    //   console.log('test promise', cycles);
    // });
    // let newId = this.clientData.addClient({ username: 'mjastrzebowski', name: 'Michał Jastrzębowski', age: 24 });
    console.log('test newId', newId);

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