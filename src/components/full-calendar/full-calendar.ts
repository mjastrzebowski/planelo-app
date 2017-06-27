import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
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

  get mixedOptions(): Options {
    return Object.assign({}, Config.CALENDAR_DEFAULTS, this.sourceOptions, this.options);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setSources();
      $(this.element.nativeElement).fullCalendar(this.mixedOptions);
    }, 100);
  }

  refetch() {
    $(this.element.nativeElement).fullCalendar('refetchEvents');
    $(this.element.nativeElement).fullCalendar('refetchResources');
  }

  setSources() {
    if (this.employee) {
      this.setEmployeeSources(this.employee);
    }
    if (this.company) {
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
        title: employee.name
        // title: trainer.alias ? trainer.alias : trainer.name,
        // eventColor: trainer.color
      }
      resources.push(resource);
    });
    return callback ? callback(resources) : resources;
  }
}
