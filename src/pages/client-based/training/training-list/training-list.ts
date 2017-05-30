import { Component, Input, Pipe } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';

import { ClientStore } from 'app/services/client/client-store';
import { NotificationStore } from 'app/services/notification/notification-store';
import { ProfileSessionStore } from 'app/services/profile-session/profile-session-store';

import { TrainingReserveModal } from '../training-reserve/training-reserve';


@Pipe({
  name: 'groupWorkouts'
})
export class GroupWorkoutsPipe {
  transform(workouts) {
    if (workouts) {
      let lastMonth = null;
      moment.locale('pl');
      workouts.forEach((workout) => {
        workout.monthId = moment(workout.date).format('YYYYMM');
        if (lastMonth !== workout.monthId) {
          lastMonth = workout.monthId;
          workout.nextMonth = true;
          workout.month = moment(workout.date).format('MMMM').toUpperCase();
        }
      });
      return workouts;
    }
  }
}

@Component({
  templateUrl: 'training-list.html'
})
export class TrainingListClientPage {
  @Input() workouts: ReplaySubject<List<any>>;
  dates: any;
  trainings: any;
  clients: any;
  dayIndex: any;
  queryText: any;
  excludeTracks: any;
  filterTracks: any;
  shownSessions: any;
  place: any;
  events: any;
  forceSub: any;
  loaded: any;
  changeDate: any;
  currentDate: any;
  calendar: any;
  sub: any;
  subTrainers: any;
  subPlaces: any;
  editing: any;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private utils: Utils,
    private clientStore: ClientStore,
    private notificationStore: NotificationStore,
    public profileSessionStore: ProfileSessionStore,
    public auth: AuthService
  ) {
    this.dates = [];
    this.trainings = [];
    this.clients = [];
    this.dayIndex = 0;
    this.queryText = '';
    this.excludeTracks = [];
    this.filterTracks = [];
    this.shownSessions = 0;

    this.place = 1;
    this.events = [];
    this.forceSub = false;

    this.loaded = {
      places: false,
      trainers: false,
      workouts: false
    };
    let changeHour = 21;
    this.changeDate = new Date();
    this.changeDate.setHours(changeHour);
    this.changeDate.setMinutes(0);
    this.currentDate = new Date();
    if (this.currentDate.getHours() >= changeHour) {
      this.changeDate.setTime(this.changeDate.getTime() + 24*60*60*1000);
    }
  }

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie treningów...');
    this.sub = this.profileSessionStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.loaded = true;
      this.init();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  init(): void {
    this.utils.stopLoading();
  }

  showTrainingReserveForm(workout): void {
    let modal = this.modalCtrl.create(TrainingReserveModal, workout);
    modal.onDidDismiss(this.saveTraining.bind(this));
    modal.present();
  }

  saveTraining(data): void {
    if (data) {
      this.utils.showLoading('Zapisywanie zmian...');
      let client = data[0].client || '';
      data.forEach(training => {
        let place = training.trainer.place;
        // TODO: update!!!
        // this.profileSessionStore.create(
        //   place,
        //   training.trainer || '',
        //   client,
        //   training.date.date || '',
        //   training.date.dateTime || '',
        //   training.date.timeStart || '',
        //   training.date.timeEnd || '',
        //   training.repeat || false)
        // .then((res) => {
        //   let notification = {
        //     type: 'workoutAdded',
        //     workout: {
        //       // key: res.getKey(),
        //       trainer: training.trainer || '',
        //       client: client || '',
        //       date: training.date.date || '',
        //       dateTime: training.date.dateTime || '',
        //       timeStart: training.date.timeStart || '',
        //       timeEnd: training.date.timeEnd || '',
        //       place: place || ''
        //     },
        //     admin: null,
        //     client: null
        //   };
        //   if (this.auth.isAdmin) {
        //     notification.admin = this.auth.key || true;
        //   } else if (this.auth.isClient) {
        //     notification.client = this.auth.key;
        //   }
        //   this.notificationStore.create(notification);
        // });
        this.saveTrainingAlert(data[0]);
      });
      this.utils.stopLoading();
    }
  }

  saveTrainingAlert(workout): void {
    if (this.auth.isClient) {
      let alert = this.alertCtrl.create({
        title: 'Dodano',
        message: 'Twój trening w terminie <strong>' + workout.date.dateTime + '</strong> został dodany.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
}
