export interface IWorkout {
  completed: boolean;
  createdAt: number;
  key?: string;
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
}

export class Workout implements IWorkout {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
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
