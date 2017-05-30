import { Component, Pipe, PipeTransform } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from 'app/services/auth/auth-service';
import { Utils } from 'app/providers/utils';

import { ITrainer } from 'app/services/trainer/trainer';
import { ClientStore } from 'app/services/client/client-store';
import { NotificationStore } from 'app/services/notification/notification-store';
import { PlaceStore } from 'app/services/place/place-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { ProfileSessionStore } from 'app/services/profile-session/profile-session-store';

import { TrainerDetailProfileModal } from '../trainer-detail-profile/trainer-detail-profile';
import { TrainerDetailHoursModal } from '../trainer-detail-hours/trainer-detail-hours';
import { TrainerDetailVacationModal } from '../trainer-detail-vacation/trainer-detail-vacation';


@Pipe({
  name: 'groupHours'
})
// export class GroupHoursPipe implements PipeTransform {
//   transform(value, args: string[]): any {
//     let keys = [];
//     for (let key in value) {
//       if (value[key]) {
//         let k = parseInt(key.split(':')[0], 10);
//         keys.push(k);
//       }
//     }

//     keys.sort((a, b) => {
//       return a - b;
//     });

//     let formatHour = (hour) => {
//       if (hour < 10) {
//         hour = '0' + hour;
//       }
//       hour += ':00';
//       return hour;
//     }

//     let ranges = [], rstart, rend;
//     for (let i = 0; i < keys.length; i++) {
//       rstart = keys[i];
//       rend = rstart;
//       while (keys[i + 1] - keys[i] == 1) {
//         rend = keys[i + 1]; // increment the index if the numbers sequential
//         i++;
//       }
//       rstart = formatHour(rstart);
//       rend = formatHour(rend + 1);
//       ranges.push(rstart == rend ? rstart + '' : rstart + '-' + rend);
//     }
//     return ranges;
//   }
// }

export class GroupHoursPipe implements PipeTransform {
  transform(value, args: string[]): any {
    return value;
  }
}

@Component({
  templateUrl: 'trainer-detail.html'
})
export class TrainerDetailPage {
  private sub;
  client: ITrainer;
  trainer: any;
  trainingsDone: any;
  trainingsDoneLast: any;
  trainingsTodo: any;
  trainingsTodoNext: any;

  constructor(
    private modalCtrl: ModalController,
    private params: NavParams,
    private trainerStore: TrainerStore,
    private profileSessionStore: ProfileSessionStore,
    private notificationStore: NotificationStore,
    private auth: AuthService,
    public utils: Utils,
    public clientStore: ClientStore,
    public placeStore: PlaceStore
  ) {
    // this.trainer = this.navParams.data;
    // this.trainingsDone = this.profileSessionStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateBefore: new Date() });
    // this.trainingsDoneLast = this.trainingsDone.get(-1);
    // this.trainingsTodo = this.profileSessionStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateAfter: new Date() });
    // this.trainingsTodoNext = this.trainingsTodo.get(0);
    // this.trainingsScheduled = this.profileSessionStore.filterBy({ trainer: this.trainer.key, fixed: true });
  }

  init(): void {
    this.trainer = this.trainerStore.getItem(this.params.data.id) || new ITrainer();
  }

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie danych trenera...');
    this.sub = this.trainerStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.init();
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  showTrainerProfile(trainer): void {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailProfileModal, trainerObject);

    modal.onDidDismiss(data => {
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.trainerStore.removeTrainer(data)
            .then((res) => {
              this.notificationStore.create({
                type: 'trainerRemoved',
                trainer: {
                  key: data.key,
                  title: data.title || '',
                  gender: data.gender || '',
                  alias: data.alias || ''
                },
                admin: this.auth.key || true
              });
            });
          return;
        }

        this.trainerStore.updateTrainer(data, {
          title: data.title || '',
          alias: data.alias || '',
          email: data.email || '',
          phone: data.phone || '',
          gender: data.gender || '',
          comment: data.comment || '',
          place: data.place || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }

  showTrainerHours(trainer): void {
    this.modalCtrl.create(TrainerDetailHoursModal, trainer).present();

    // modal.onDidDismiss(data => {
    //   if (data) {
    //     // this.trainerStore.createHour(4, {
    //     //   "day": "3",
    //     //   "start": "08:00",
    //     //   "end": "10:00"
    //     // });
    //     this.trainerStore.updateHours(trainer.id, data);
    //     this.trainer.days = data;
    //   }
    // });
  }

  showTrainerVacation(trainer): void {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailVacationModal, trainerObject);

    modal.onDidDismiss(data => {
      if (data) {
        data.vacation.forEach(vacation => {
          vacation.dateStart = vacation.start.split('T')[0];
          vacation.dateEnd = vacation.end.split('T')[0];
        });
        this.trainerStore.updateTrainer(data, {
          vacation: data.vacation || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }
}
