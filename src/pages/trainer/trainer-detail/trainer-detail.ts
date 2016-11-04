import { Component, Pipe, PipeTransform } from '@angular/core';

import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../../../core/auth/auth-service';
import { Utils } from '../../../providers/utils';

import { ClientStore } from '../../../core/client/client-store';
import { NotificationStore } from '../../../core/notification/notification-store';
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
  templateUrl: 'trainer-detail.html'
})
export class TrainerDetailPage {
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private trainerStore: TrainerStore,
    private workoutStore: WorkoutStore,
    private notificationStore: NotificationStore,
    private auth: AuthService,
    public utils: Utils,
    public clientStore: ClientStore,
    public placeStore: PlaceStore
  ) {
    this.trainer = this.navParams.data;
    this.trainingsDone = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateBefore: new Date() });
    this.trainingsDoneLast = this.trainingsDone.get(-1);
    this.trainingsTodo = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: false, completed: false, dateAfter: new Date() });
    this.trainingsTodoNext = this.trainingsTodo.get(0);
    // this.trainingsScheduled = this.workoutStore.filterBy({ trainer: this.trainer.key, fixed: true });
  }

  showTrainerProfile(trainer): void {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailProfileModal, trainerObject);

    modal.onDidDismiss(data => {
      if (data) {
        if (data.hasOwnProperty('delete')) {
          this.trainerStore.removeTrainer(data)
            .then((res) => {
              this.notificationStore.createNotification('trainerRemoved', {
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

        this.trainerStore.updateTrainer(data, {
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

  showTrainerHours(trainer): void {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailHoursModal, trainerObject);

    modal.onDidDismiss(data => {
      if (data) {
        this.trainerStore.updateTrainer(data, {
          hours: data.hours || ''
        });
        this.trainer = data;
      }
    });
    modal.present();
  }

  showTrainerVacation(trainer): void {
    let trainerObject = Object.assign({}, trainer);
    let modal = this.modalCtrl.create(TrainerDetailVacationModal, trainerObject);

    modal.onDidDismiss(data => {
      if (data) {
        data.vacation.forEach(vacation => {
          if (!vacation.hasOwnProperty('start')) {
            vacation.start = vacation.dateStart + 'T07:00';
            vacation.end = vacation.dateEnd + 'T23:00';
          }
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
