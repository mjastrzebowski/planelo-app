import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { UserService } from '../../../core/user/user-service';
import { ClientService } from '../../../core/client/client-service';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { ClientDetailProfileModal } from '../client-detail-profile/client-detail-profile';
import { ClientDetailAccessModal } from '../client-detail-access/client-detail-access';
import { ClientDetailBillingModal } from '../client-detail-billing/client-detail-billing';
import { ClientDetailWorkoutsModal } from '../client-detail-workouts/client-detail-workouts';

@Component({
  templateUrl: 'client-detail.html'
})
export class ClientDetailPage {
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private http: Http,
    private utils: Utils,
    private auth: AuthService,
    private user: UserService,
    private clientService: ClientService,
    private clientStore: ClientStore,
    private workoutStore: WorkoutStore,
    public placeStore: PlaceStore,
    public trainerStore: TrainerStore
  ) {
    this.client = this.navParams.data;

    this.trainingsDone = this.workoutStore.filterBy({ client: this.client.key, fixed: false, completed: false, dateBefore: new Date() });
    this.trainingsDoneLast = this.trainingsDone.get(-1);
    this.trainingsTodo = this.workoutStore.filterBy({ client: this.client.key, fixed: false, completed: false, dateAfter: new Date() });
    this.trainingsTodoNext = this.trainingsTodo.get(0);
    this.trainingsScheduled = this.workoutStore.filterBy({ client: this.client.key, fixed: true });
  }

  showClientProfile(client): void {
    if (client) {
      let clientObject = Object.assign({}, client);
      let modal = this.modalCtrl.create(ClientDetailProfileModal, clientObject);
      this.editing = true;
    } else {
      let modal = this.modalCtrl.create(ClientDetailProfileModal);
      this.editing = false;
    }

    modal.onDidDismiss(data => {
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.clientService.deleteClient(data)
            .then((res) => {
              this.utils.createNotification('clientRemoved', {
                client: {
                  key: data.key,
                  gender: data.gender || '',
                  name: data.name || '',
                  lastname: data.lastname || ''
                },
                owner: this.auth.key || true
              });
            });
          return;
        }

        this.clientService.updateClient(data, {
          name: data.name || '',
          lastname: data.lastname || '',
          email: data.email || '',
          phone: data.phone || '',
          gender: data.gender || '',
          place: data.place || '',
          comment: data.comment || ''
        });
        this.client = data;
      }
    });
    modal.present();
  }

  showClientAccess(client): void {
    if (client) {
      let clientObject = Object.assign({}, client);
      let modal = this.modalCtrl.create(ClientDetailAccessModal, clientObject);
      this.editing = true;
    } else {
      let modal = this.modalCtrl.create(ClientDetailAccessModal);
      this.editing = false;
    }

    modal.onDidDismiss(data => {
      if (data) {
        let changes = {};
        if (data.active !== this.client.active) {
          changes.active = data.active;
        }
        if (data.email && data.email !== this.client.email) {
          changes.email = data.email;
        }
        if (data.password && data.password !== this.client.password) {
          changes.password = data.password;
        }
        if (data.username && data.username !== this.client.username) {
          let usernameTaken = this.clientStore.getItemByUsername(data.username);
          if (!usernameTaken) {
            changes.username = data.username;
          }
        }

        let credentials = {
          email: changes.email || this.client.email,
          password: changes.password || this.client.password
        };
        if (changes.active === true) {
          this.auth.signUpWithPassword(credentials).then((userData) => {
            this.user.createUser(userData.uid, this.client.key, 'client');

            if (data.send) {
              let body = JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                username: changes.username || this.client.username,
                name: this.client.name + ' ' + this.client.lastname
              });
              let headers = new Headers({ 'Content-Type': 'application/json' });
              let options = new RequestOptions({ headers: headers });
              this.http.post('http://treningi.egobody.pl/mail.php', body, options)
                .toPromise()
                .then((res: Response) => {
                  let result = res.json() || {};
                  console.log(result);
                })
                .catch((error: any) => {
                  // In a real world app, we might use a remote logging infrastructure
                  // We'd also dig deeper into the error to get a better message
                  let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                  console.error(errMsg); // log to console instead
                  return Promise.reject(errMsg);
                });
            }

          });
        } else if (changes.active === false) {
          console.log('test deactivate');
          this.auth.removeUser(credentials).then((userData) => {
            console.log('test removed user', userData);
          });
        }

        // this.auth.signUpWithPassword({ email: changes. }).then(() => this.postSignIn());

        this.clientService.updateClient(data, changes);
        this.client = data;
      }
    });
    modal.present();
  }

  showClientBilling(client): void {
    let clientObject = Object.assign({}, client);
    let modal = this.modalCtrl.create(ClientDetailBillingModal, clientObject);
    modal.present();
  }

  showClientWorkouts(client): void {
    let clientObject = Object.assign({}, client);
    let modal = this.modalCtrl.create(ClientDetailWorkoutsModal, clientObject);
    modal.present();
  }
}
