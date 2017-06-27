import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { Options, EventObject } from 'fullcalendar';

import { Config } from 'app/config';
import { Utils } from 'app/providers/utils';

@Component({
  template: '',
  selector: 'full-calendar'
})
export class CalendarComponent implements AfterViewInit {
  @Input() options: Options;
  @Input() sessions: any;
  @Input() days: any;
  @Input() vacations: any;
  @Input() employees?: any;

  constructor(
    private element: ElementRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      $(this.element.nativeElement).fullCalendar(this.mixedOptions);
      $(this.element.nativeElement).fullCalendar('addEventSource', this.getEvents.bind(this));
    }, 100);
  }

  get mixedOptions(): Options {
    return Object.assign({}, Config.CALENDAR_DEFAULTS, this.options);
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
    console.log('#fullcalendar getEvents');
    if (!start || !end) {
      return [];
    }

    let events = [];
    events = events.concat(this.getDayEvents(this.days || [], start, end));
    events = events.concat(this.getVacationEvents(this.vacations || [], start, end));
    events = events.concat(this.getSessionEvents(this.sessions || [], start, end));

    return callback ? callback(events) : events;
  }

  getDayEvents(days, from, to): EventObject[] {
    let events = [];
    Utils.forEachDay(from, to).forEach(day => {
      let hours = days[day.day()] || [];
      hours.forEach(hour => {
        let start = Utils.datetimeToMoment(day, hour.start);
        let end = Utils.datetimeToMoment(day, hour.end);
        let event = this.constructHourEvent(start, end);
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
      let event = this.constructVacationEvent(vacation.start, vacation.end);
      events.push(event);
    });
    return events;
  }

  calendarResources(callback: any): any {
    let resources = [];
    // this.trainerStore.list.forEach(trainer => {
    //   if (trainer.placeId !== this.place) {
    //     return;
    //   }

    //   let resource = {
    //     id: trainer.id,
    //     title: trainer.alias ? trainer.alias : trainer.name,
    //     eventColor: trainer.color
    //   };
    //   resources.push(resource);
    // });

    return callback ? callback(resources) : resources;
  }
}
