import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { IExercise, Exercise } from './exercise';
import { ExerciseService } from './exercise-service';

@Injectable()
export class ExerciseStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private changeStream: any;
  public list: List<any> = List();

  constructor(
    private exerciseService: ExerciseService
  ) {
    this.exerciseService.get().then(data => {
      this.list = List(data);
      this.loaded = true;
      console.log('exercise store loaded');
      this.emit();

      exerciseService.changeStream.addEventListener('data', function(msg) {
        var data = JSON.parse(msg.data);
        console.log(data); // the change object
      });
    }, (error) => {
      console.log(error);
    });
  }

  createExercise(title: string) {
    // return this.exercises.push(new Exercise(title));
  }

  removeExercise(exercise: IExercise) {
    // return this.exercises.remove(exercise.key);
  }

  updateExercise(exercise: IExercise, changes: any) {
    // return this.exercises.update(exercise.key, changes);
  }

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.loaded);
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): IExercise {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  private findIndex(key: string): number {
    return this.list.findIndex((exercise: IExercise) => {
      return exercise.key === key;
    });
  }
}
