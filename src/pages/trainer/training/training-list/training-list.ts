import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';

import { ClientStore } from 'app/services/client/client-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { WorkoutStore } from 'app/services/workout/workout-store';


@Component({
  templateUrl: 'training-list.html'
})
export class TrainingListTrainerPage {
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
    private utils: Utils,
    private clientStore: ClientStore,
    private trainerStore: TrainerStore,
    public workoutStore: WorkoutStore,
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

    this.loaded = false;

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
    this.calendar = false;
    this.place = this.auth.place;

    this.sub = this.workoutStore.subscribe(loaded => {
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
    if (this.loaded) {
      if (!this.calendar && !this.isCalendarRendered()) {
        this.renderCalendar();
      } else {
        this.refreshCalendar();
      }
      this.utils.stopLoading();
    }
  }

  isCalendarRendered(): boolean {
    return $('#calendar').hasClass('fc');
  }

  refreshCalendar(force?): void {
    let events = this.getEvents();

    if (!force && events.length === this.events.length) {
      return;
    }

    this.events = events;

    $('#calendar').fullCalendar('refetchResources');
    $('#calendar').fullCalendar('refetchEvents');
  }

  renderCalendar(): void {
    let options;
    options = {
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      now: new Date().toDateString(),
      contentHeight: 'auto',
      lang: 'pl',
      locale: 'pl',
      allDaySlot: false,
      slotLabelFormat: 'HH:mm',
      scrollTime: '07:30',
      minTime: '07:00:00',
      maxTime: '23:00:00',
      firstDay: 1,
      hiddenDays: [ 0 ],
      nowIndicator: true,
      businessHours: {
        start: '07:00',
        end: '22:00',
        dow: [ 1, 2, 3, 4, 5 ]
      },

      eventOverlap: false,
      editable: false,
      eventLimit: true,
      selectable: false,
      selectHelper: false,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'agendaDay,agendaTwoDay,agendaWeek'
      },
      defaultView: 'agendaTwoDay',
      views: {
        agendaTwoDay: {
          type: 'agenda',
          duration: { days: 2 }
        }
      },
      events: this.getEvents.bind(this)
    };
    $('#calendar').fullCalendar(options);
    this.calendar = true;
  }

  getEvents(start?, end?, timezone?, callback?): any {
    let events = [];
    this.workoutStore.list.forEach(workout => {
      if (workout.fixed || workout.timeStart === '' ||
        (start && workout.date < start.format('YYYY-MM-DD')) || (end && workout.date > end.format('YYYY-MM-DD'))) {
        return;
      }

      let client = this.clientStore.getItem(workout.clientId);
      let title = client.name + ' ' + client.lastname;
      let event = {
        id: workout.key,
        resourceId: workout.trainerId,
        title: title,
        start: workout.date + 'T' + workout.timeStart,
        end: workout.date + 'T' + workout.timeEnd,
        description: client.name + ' ' + client.lastname,
        color: null
      };

      if (workout.completed) {
        event.color = 'red';
      } else if (this.auth.isTrainer && workout.trainerId === this.auth.id) {
        event.color = this.auth.color;
      }
      events.push(event);
    });

    if (this.auth.isAdmin) {
      let hours = [
        { timeStart: '7:00', timeEnd: '08:00' },
        { timeStart: '8:00', timeEnd: '09:00' },
        { timeStart: '9:00', timeEnd: '10:00' },
        { timeStart: '10:00', timeEnd: '11:00' },
        { timeStart: '11:00', timeEnd: '12:00' },
        { timeStart: '12:00', timeEnd: '13:00' },
        { timeStart: '13:00', timeEnd: '14:00' },
        { timeStart: '16:00', timeEnd: '17:00' },
        { timeStart: '17:00', timeEnd: '18:00' },
        { timeStart: '18:00', timeEnd: '19:00' },
        { timeStart: '19:00', timeEnd: '20:00' },
        { timeStart: '20:00', timeEnd: '21:00' },
        { timeStart: '21:00', timeEnd: '22:00' }
      ];

      this.trainerStore.list.forEach(trainer => {
        for (let d = 1; d <= 62; d++) {
          let date = new Date('2017-01-01');
          date.setDate(d);
          let day = '' + date.getDate();
          if (parseInt(day) < 10) {
            day = '0' + day;
          }
          let year = 2016;
          let month = (date.getMonth()+1) + '';
          if (parseInt(month) > 12) {
            month = '1';
          }
          if (parseInt(month) < 10) {
            month = '0' + month;
            year = 2017;
          }
          let weekDay = date.getDay()-1;

          if (trainer.hours && trainer.hours[weekDay]) {
            hours.forEach(hour => {
              if (trainer.hours[weekDay][hour.timeStart]) {
                let time = hour.timeStart;
                if (time === '7:00' || time === '8:00' || time === '9:00') {
                  time = '0' + hour.timeStart;
                }
                let working = {
                  id: 'available',
                  resourceId: trainer.key,
                  start: year + '-' + month + '-' + day + 'T'+ time,
                  end: year + '-' + month + '-' + day + 'T'+ hour.timeEnd,
                  color: '#8fdf82',
                  rendering: 'background'
                };
                events.push(working);
              }
            });
          }
        }

        if (trainer.vacation) {
          trainer.vacation.forEach(vacation => {
            let event = {
              start: vacation.start,
              end: vacation.end,
              overlap: false,
              rendering: 'background',
              color: '#ff9f89',
              resourceId: trainer.key
            };
            events.push(event);
          });
        }
      });
    }

    return callback ? callback(events) : events;
  }
}
