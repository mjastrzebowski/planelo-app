import { Component } from '@angular/core';
import {App, Modal, Alert, NavController} from 'ionic-angular';
import {ClientData} from '../../providers/client-data';
import {UserData} from '../../providers/user-data';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {TrainingDetailPage} from '../training-detail/training-detail';


@Component({
  templateUrl: 'build/pages/schedule/schedule.html'
})
export class SchedulePage {
  constructor(app: App, nav: NavController, clientData: ClientData, user: UserData) {
    this.app = app;
    this.nav = nav;
    this.clientData = clientData;
    this.user = user;

    this.dayIndex = 0;
    this.queryText = '';
    this.excludeTracks = [];
    this.filterTracks = [];
    this.segment = 'all';

    this.hasSessions = false;
    this.clients = [];

    this.updateSchedule();
  }

  ionViewDidEnter() {
    this.app.setTitle('Plan');
  }

  updateSchedule() {
    this.clientData.getTimeline(this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownSessions = true;
      this.clients = data.clients;
    });
  }

  presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss(data => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToTrainingDetail(cycle, trainingId) {
    // go to the training detail page
    // and pass in the training data
    this.nav.push(TrainingDetailPage, {
      cycle: cycle,
      trainingId: trainingId
    });
  }

  addFavorite(slidingItem, trainingData) {

    if (this.user.hasFavorite(trainingData.name)) {
      // woops, they already favorited it! What shall we do!?
      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite already added',
        message: 'Would you like to remove this session from your favorites?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              // they clicked the cancel button, do not remove the session
              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          },
          {
            text: 'Remove',
            handler: () => {
              // they want to remove this session from their favorites
              this.user.removeFavorite(sessionData.name);

              // close the sliding item and hide the option buttons
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      this.nav.present(alert);

    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = Alert.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }
      });
      // now present the alert on top of all other content
      this.nav.present(alert);
    }

  }

}
