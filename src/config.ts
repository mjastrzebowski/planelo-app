export const Config = {
  // API_URL: "http://api-dev.planelo.com/api/",
  // API_URL: "http://192.168.1.102:3000/api/",
  API_URL: "http://localhost:3000/api/",
  BUSINESS_HOURS: {
    START: 7,
    END: 22
  },
  CALENDAR_DEFAULTS: {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    now: new Date().toDateString(),
    contentHeight: 'auto',
    // lang: 'pl',
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

    eventOverlap: true,
    editable: true,
    eventDurationEditable: false,
    eventLimit: true,
    selectable: true,
    selectHelper: false,

    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'agendaDay,agendaTwoDay,agendaWeek'
    },
    defaultView: 'agendaTwoDay',
    views: {
      agendaDay: {
        titleFormat: 'dddd, DD MMMM YYYY',
      },
      agendaTwoDay: {
        type: 'agenda',
        titleFormat: 'dddd, DD MMM YYYY',
        duration: { days: 2 },
        groupByResource: true,
        groupByDateAndResource: true
      },
      agendaWeek: {
        groupByResource: true,
        groupByDateAndResource: true
      }
    },
    // resourceGroupField: 'place',
    resourceLabelText: 'Trenerzy',
    // resources: this.calendarResources.bind(this),
    // events: this.calendarEvents.bind(this),

    // eventClick: this.calendarEvent.bind(this),
    // select: this.calendarSelect.bind(this),
    // eventDrop: this.calendarDrag.bind(this),
    // eventRender: this.calendarTooltip.bind(this)
  }
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment: any = {
  production: false,
};

export const FIREBASE_URL: string = 'https://fiery-heat-1991.firebaseioo.com';
export const FIREBASE_CLIENTS_URL: string = `${FIREBASE_URL}/cal_clients`;
export const FIREBASE_PLACES_URL: string = `${FIREBASE_URL}/cal_places`;
export const FIREBASE_TRAINERS_URL: string = `${FIREBASE_URL}/cal_trainers`;
export const FIREBASE_WORKOUTS_URL: string = `${FIREBASE_URL}/cal_workouts`;
export const FIREBASE_BILLS_URL: string = `${FIREBASE_URL}/cal_bills`;
export const FIREBASE_NOTIFICATIONS_URL: string = `${FIREBASE_URL}/cal_notifications`;
export const FIREBASE_USERS_URL: string = `${FIREBASE_URL}/users`;
