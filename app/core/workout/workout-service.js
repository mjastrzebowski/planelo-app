import { IWorkout, Workout } from './workout';

export class WorkoutService {
  constructor(private ref: Firebase) {}

  createWorkout(
    place: string,
    trainer: string,
    client: string,
    date: string,
    dateTime: string,
    timeStart: string,
    timeEnd: string,
    repeat: boolean,
    fixed: boolean): void {
    if (!fixed) {
      fixed = false;
    }

    this.ref.push(new Workout(place, trainer, client, date, dateTime, timeStart, timeEnd, repeat, fixed), (error: Error) => {
      if (error) {
        console.error('ERROR @ createWorkout :', error);
      }
    });
  }

  deleteWorkout(workout: IWorkout): void {
    this.ref.child(workout.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteWorkout :', error);
      }
    });
  }

  updateWorkout(workout: IWorkout, changes: any): void {
    this.ref.child(workout.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateWorkout :', error);
      }
    });
  }
}
