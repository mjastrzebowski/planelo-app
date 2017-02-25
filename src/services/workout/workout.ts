export class IWorkout {
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
}

export class Workout implements IWorkout {
  completed: any = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
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
