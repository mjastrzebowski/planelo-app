import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';

import { ModalController } from 'ionic-angular';

import * as $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { Options, EventObject } from 'fullcalendar';

import { Config } from 'app/config';
import { Utils } from 'app/providers/utils';
import { EmployeeStore } from 'app/services/employee';
import { EmployeeHourStore } from 'app/services/employee-hour';

@Component({
  template: '',
  selector: 'full-calendar'
})
export class CalendarComponent implements AfterViewInit {
  @Input() options: Options;
  @Input() company: any;
  @Input() employee: any;
  @Input() client: any;
  hours: any = [];
  vacations: any = [];
  sessions: any = [];
  employees: any = [];

  constructor(
    private element: ElementRef,
    private modalCtrl: ModalController,
    private employeeStore: EmployeeStore
  ) {
    this.employeeStore.subscribe(this.refetch.bind(this));
  }

  get sourceOptions() {
    return {
      events: this.getEvents.bind(this),
      resources: this.getResources.bind(this)
    };
  }

  get companyOptions() {
    return {
      eventClick: this.eventClick.bind(this),
      select: this.select.bind(this),
      eventDrop: this.eventDrop.bind(this),
      eventRender: this.eventRender.bind(this)
    };
  }

  get mixedOptions(): Options {
    let options = Object.assign({}, Config.CALENDAR_DEFAULTS, this.sourceOptions, this.options);
    return this.isCompanyView ? Object.assign({}, options, this.companyOptions) : options;
  }

  get isCompanyView(): boolean {
    return this.company ? true : false;
  }

  get isEmployeeView(): boolean {
    return this.employee ? true : false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setSources();
      $(this.element.nativeElement).fullCalendar(this.mixedOptions);
    }, 100);
  }

  refetch() {
    this.clearSources();
    this.setSources();
    $(this.element.nativeElement).fullCalendar('refetchEvents');
    $(this.element.nativeElement).fullCalendar('refetchResources');
  }

  clearSources() {
    this.hours = [];
    this.vacations = [];
    this.sessions = [];
    this.employees = [];
  }

  setSources() {
    if (this.isEmployeeView) {
      this.setEmployeeSources(this.employee);
    }
    if (this.isCompanyView) {
      this.setCompanySources(this.company);
    }
  }

  setEmployeeSources(employee) {
    this.hours.push.apply(this.hours, employee.hours.toArray());
    this.vacations.push.apply(this.vacations, employee.vacations.toArray());
    this.sessions.push.apply(this.sessions, employee.sessions.toArray());
  }

  setCompanySources(company) {
    this.employees = company.employees;
    company.employees.forEach(employee => {
      this.setEmployeeSources(employee);
    });
  }

  constructHourEvent(start, end, resource?): EventObject {
    let event = {
      title: null,
      id: 'available',
      start: start,
      end: end,
      color: Config.COLOR_AVAILABLE,
      rendering: 'background',
      resourceId: resource
    };
    return event;
  }

  constructVacationEvent(start, end, resource?): EventObject {
    let event =  {
      title: null,
      start: start,
      end: end,
      overlap: false,
      rendering: 'background',
      color: Config.COLOR_UNAVAILABLE,
      resourceId: resource
    };
    return event;
  }

  constructSessionEvent(session): EventObject {
    let event =  {
      id: session.id,
      title: session.title,
      description: session.description,
      start: session.start,
      end: session.end,
      // color: '#ff9f89', session.employee.color
      resourceId: session.employeeId
    };
    return event;
  }


  getEvents(start?, end?, timezone?, callback?): EventObject[] {
    if (!start || !end) {
      return [];
    }

    let events = [];
    let days = EmployeeHourStore.hoursToDays(this.hours);
    events.push.apply(events, this.getHourEvents(days, start, end));
    events.push.apply(events, this.getVacationEvents(this.vacations, start, end));
    events.push.apply(events, this.getSessionEvents(this.sessions, start, end));
    return callback ? callback(events) : events;
  }

  getHourEvents(days, from, to): EventObject[] {
    let events = [];
    Utils.forEachDay(from, to).forEach(day => {
      let hours = days[day.day()] || [];
      hours.forEach(hour => {
        let start = Utils.datetimeToMoment(day, hour.start);
        let end = Utils.datetimeToMoment(day, hour.end);
        let event = this.constructHourEvent(start, end, hour.employeeId);
        events.push(event);
      })
    });
    return events;
  }

  getSessionEvents(sessions, from, to): EventObject[] {
    let events = [];
    sessions.forEach(session => {
      let event = this.constructSessionEvent(session);
      events.push(event);
    });
    return events;
  }

  getVacationEvents(vacations, from, to): EventObject[] {
    let events = [];
    vacations.forEach(vacation => {
      let event = this.constructVacationEvent(vacation.start, vacation.end, vacation.employeeId);
      events.push(event);
    });
    return events;
  }

  getResources(callback: any): any {
    let resources = [];
    this.employees.forEach(employee =>{
      let resource = {
        id: employee.id,
        title: employee.alias ? employee.alias : employee.name,
        // title: trainer.alias ? trainer.alias : trainer.name,
        eventColor: employee.color
      }
      resources.push(resource);
    });
    return callback ? callback(resources) : resources;
  }



  eventClick(event): void {
    // let workout = this.sessionStore.getItem(event.id);
    // let title = event.title + ' • ' + event.start.format('DD.MM.YYYY, HH:mm');
    // if (workout.completed) {
    //   title += ' • Powód odwołania: ' + workout.completed;
    // }
    // this.showActionSheet(workout, title);
  }

  eventRender(event, element, view): void {
    // if (view.type === 'agendaWeek') {
    //   element.qtip({
    //     content: event.description,
    //     position: {
    //       my: 'top center',
    //       at: 'bottom center'
    //     },
    //     style: {
    //       classes: 'qtip-light qtip-rounded qtip-shadow'
    //     }
    //   });
    // }
  }

  select(start, end, event, view, resource): void {
    let session = {
      company: this.company,
      employeeId: resource.id,
      start: start.toISOString()
    };
    this.createSession(session);

    // let workout = {
    //   trainerKey: resource.id,
    //   date: start.format('YYYY-MM-DD'),
    //   dateTime: start.format('YYYY-MM-DD') + ' ' + start.format('HH:00'),
    //   timeStart: start.format('HH:00'),
    //   timeEnd: start.add(1, 'hours').format('HH:00')
    // };
    // this.showTrainingForm(workout);
  }

  eventDrop(event, delta, revertFunc): void {
    // let workout = this.sessionStore.getItem(event.id);
    // let changes = {
    //   trainer: event.resourceId,
    //   date: event.start.format('YYYY-MM-DD'),
    //   dateTime: event.start.format('YYYY-MM-DD') + ' ' + event.start.format('HH:00'),
    //   timeStart: event.start.format('HH:00'),
    //   timeEnd: event.start.add(1, 'hours').format('HH:00')
    // };

    // if (confirm('Czy na pewno przenieść trening?')) {
    //   this.sessionStore.update(workout, changes);
    // }
    // this.refreshCalendar();
  }

  createSession(data): void {
    this.modalCtrl.create('session/create', data).present();
  }
}
