import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { Options } from 'fullcalendar';

import { Config } from 'app/config';

@Component({
  template: '<div></div>',
  selector: 'full-calendar'
})
export class CalendarComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  @Input() options: Options;
  text: string;
  calendarInitiated: boolean;

  constructor(
    private element: ElementRef
  ) {}

  ngOnInit():void {
    console.log('full calendar ngOnInit');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // console.log("100ms after ngAfterViewInit ");
      let mixedOptions = Object.assign({}, Config.CALENDAR_DEFAULTS, this.options);
      $('full-calendar').fullCalendar(mixedOptions);
    }, 100);
  }

  ngAfterContentChecked() {}
  ngAfterViewChecked() {}

  updateEvent(event) {
    return $(this.element.nativeElement).fullCalendar('updateEvent', event);
  }

  clientEvents(idOrFilter) {
    return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
  }
}
