import { Component, Pipe, PipeTransform } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { App, ModalController, NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { UserService } from '../../../core/user/user-service';

import { TrainerService } from '../../../core/trainer/trainer-service';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';
import { WorkoutStore } from '../../../core/workout/workout-store';

import { TrainerDetailProfileModal } from '../trainer-detail-profile/trainer-detail-profile';
import { TrainerDetailHoursModal } from '../trainer-detail-hours/trainer-detail-hours';
import { TrainerDetailVacationModal } from '../trainer-detail-vacation/trainer-detail-vacation';


@Pipe({
  name: 'groupHours'
})
export class GroupHoursPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      if (value[key]) {
        let k = parseInt(key.split(':')[0], 10);
        keys.push(k);
      }
    }

    keys.sort((a, b) => {
      return a - b;
    });

    let formatHour = (hour) => {
      if (hour < 10) {
        hour = '0' + hour;
      }
      hour += ':00';
      return hour;
    }

    let ranges = [], rstart, rend;
    for (let i = 0; i < keys.length; i++) {
      rstart = keys[i];
      rend = rstart;
      while (keys[i + 1] - keys[i] == 1) {
        rend = keys[i + 1]; // increment the index if the numbers sequential
        i++;
      }
      rstart = formatHour(rstart);
      rend = formatHour(rend + 1);
      ranges.push(rstart == rend ? rstart + '' : rstart + '-' + rend);
    }
    return ranges;
  }
}

@Component({
  templateUrl: 'build/pages/trainer/trainer-detail/trainer-detail.html',
  pipes: [GroupHoursPipe]
})
export class TrainerDetailPage {
  constructor(public app: App, public nav: NavController, public modalCtrl: ModalController, public navParams: NavParams, public http: Http, public utils: Utils, public auth: AuthService, public user: UserService, public trainerService: TrainerService, public clientStore: ClientStore, public placeStore: PlaceStore, public trainerStore: TrainerStore, public workoutStore: WorkoutStore) {

    this.trainer = this.navParams.data;
    this.trainingsDone = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateBefore: new Date() });
    this.trainingsDoneLast = this.trainingsDone.get(-1);
    this.trainingsTodo = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateAfter: new Date() });
    this.trainingsTodoNext = this.trainingsTodo.get(0);
    // this.trainingsScheduled = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: true });
  }

  showTrainerProfile(trainer) {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailProfileModal, trainerObject);

    modal.onDidDismiss(data => {
      console.log('closed trainer profile modal with data: ', data);
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.trainerService.deleteTrainer(data)
            .then((res) => {
              this.utils.createNotification('trainerRemoved', {
                trainer: {
                  key: data.key,
                  title: data.title || '',
                  gender: data.gender || '',
                  alias: data.alias || ''
                },
                owner: this.auth.key || true
              });
            });
          return;
        }

        this.trainerService.updateTrainer(data, {
          title: data.title || '',
          alias: data.alias || '',
          email: data.email || '',
          phone: data.phone || '',
          gender: data.gender || '',
          comment: data.comment || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }

  showTrainerHours(trainer) {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailHoursModal, trainerObject);

    modal.onDidDismiss(data => {
      console.log('closed trainer hours modal with data: ', data);
      if (data) {
        this.trainerService.updateTrainer(data, {
          hours: data.hours || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }

  showTrainerVacation(trainer) {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailVacationModal, trainerObject);

    modal.onDidDismiss(data => {
      console.log('closed trainer vacation modal with data: ', data);
      if (data) {
        data.vacation.forEach(vacation => {
          if (!vacation.hasOwnProperty('start')) {
            vacation.start = vacation.dateStart + 'T07:00';
            vacation.end = vacation.dateEnd + 'T23:00';
          }
        });
        this.trainerService.updateTrainer(data, {
          vacation: data.vacation || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }

  // showClientAccess(client) {
  //   if (client) {
  //     let clientObject = Object.assign({}, client);
  //     let modal = this.modalCtrl.create(ClientDetailAccessModal, clientObject);
  //     this.editing = true;
  //   } else {
  //     let modal = this.modalCtrl.create(ClientDetailAccessModal);
  //     this.editing = false;
  //   }

  //   modal.onDidDismiss(data => {
  //     console.log('closed client access modal with data: ', data);
  //     if (data) {
  //       let changes = {};
  //       if (data.active !== this.client.active) {
  //         changes.active = data.active;
  //       }
  //       if (data.email && data.email !== this.client.email) {
  //         changes.email = data.email;
  //       }
  //       if (data.password && data.password !== this.client.password) {
  //         changes.password = data.password;
  //       }
  //       if (data.username && data.username !== this.client.username) {
  //         let usernameTaken = this.clientStore.getItemByUsername(data.username);
  //         if (!usernameTaken) {
  //           changes.username = data.username;
  //         }
  //       }

  //       let credentials = {
  //         email: changes.email || this.client.email,
  //         password: changes.password || this.client.password
  //       };
  //       if (changes.active === true) {
  //         this.auth.signUpWithPassword(credentials).then((userData) => {
  //           this.user.createUser(userData.uid, this.client.key, 'client');
  //           console.log('test user created, sending mail');

  //           if (data.send) {
  //             let body = JSON.stringify({
  //               email: credentials.email,
  //               password: credentials.password,
  //               username: changes.username || this.client.username,
  //               name: this.client.name + ' ' + this.client.lastname
  //             });
  //             let headers = new Headers({ 'Content-Type': 'application/json' });
  //             let options = new RequestOptions({ headers: headers });
  //             this.http.post('http://treningi.egobody.pl/mail.php', body, options)
  //               .toPromise()
  //               .then((res: Response) => {
  //                 let result = res.json() || {};
  //                 console.log(result);
  //               })
  //               .catch((error: any) => {
  //                 // In a real world app, we might use a remote logging infrastructure
  //                 // We'd also dig deeper into the error to get a better message
  //                 let errMsg = (error.message) ? error.message :
  //                   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //                 console.error(errMsg); // log to console instead
  //                 return Promise.reject(errMsg);
  //               });
  //           }

  //         });
  //       } else if (changes.active === false) {
  //         // console.log('test deactivate');
  //         // this.auth.removeUser(credentials).then((userData) => {
  //         //   console.log('test removed user', userData);
  //         // });
  //       }

  //       // this.auth.signUpWithPassword({ email: changes. }).then(() => this.postSignIn());

  //       // console.log('test update client', changes);
  //       this.trainerService.updateClient(data, changes);
  //       this.client = data;
  //     }
  //   });
  //   modal.present();
  // }

  // showClientBilling(client) {
  //   if (client) {
  //     let clientObject = Object.assign({}, client);
  //     let modal = this.modalCtrl.create(ClientDetailBillingModal, clientObject);
  //     this.editing = true;
  //   } else {
  //     let modal = this.modalCtrl.create(ClientDetailBillingModal);
  //     this.editing = false;
  //   }

  //   modal.onDidDismiss(data => {
  //     console.log('closed client billing modal with data: ', data);
  //     // if (data) {
  //     //   if (data.hasOwnProperty('delete')) {
  //     //     this.trainerService.deleteClient(data);
  //     //     return;
  //     //   }

  //     //   // this.trainerService.updateClient(data, {
  //     //   //   username: data.username || '',
  //     //   //   email: data.email || '',
  //     //   //   phone: data.phone || '',
  //     //   //   comment: data.comment || ''
  //     //   // });
  //     // }
  //   });
  //   modal.present();
  // }

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
