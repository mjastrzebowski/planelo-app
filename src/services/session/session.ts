export class ISession {
  completed: any;
  createdAt: number;
  key?: string;
  $key?: string;
  place: string;
  placeKey?: string;
  trainer: string;
  trainerKey?: string;
  client: string;
  clientKey?: string;
  start?: string;
  end?: string;
  employeeId?: number;
  date?: string;
  dateTime?: string;
  timeStart?: string;
  timeEnd?: string;
  repeat?: boolean;
  fixed?: boolean;
  weekDay?: any;
  fullDate?: any;
  descDate?: any;
  month?: any;
  monthId?: any;
  nextMonth?: boolean;
  activityTypeId?: number;
  activityId?: number;
  sessionId?: number;
}

export class Session implements ISession {
  completed: any = false;
  createdAt: number;
  place: string;
  trainer: string;
  client: string;
  date: string;
  dateTime: string;
  timeStart: string;
  timeEnd: string;
  repeat: boolean;
  fixed: boolean;

  constructor(
    place: string,
    trainer: string,
    client: string,
    date: string,
    dateTime: string,
    timeStart: string,
    timeEnd: string,
    repeat: boolean,
    fixed: boolean) {
    this.place = place;
    this.trainer = trainer;
    this.client = client;
    this.date = date;
    this.dateTime = dateTime;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.repeat = repeat;
    this.fixed = fixed;
  }
}
