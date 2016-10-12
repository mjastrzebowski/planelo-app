import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';

import {TrainingHistoryModal} from '../training-history/training-history'

@Component({
  templateUrl: 'build/pages/training/training-detail/training-detail.html'
})
export class TrainingDetailPage {
  constructor(public nav: NavController, public modalCtrl: ModalController, public navParams: NavParams) {

    this.training = navParams.data;
    this.user.username = this.training.client.username;
    this.ex = this.training.exercises;
    this.exerciseArray = [];
    if (this.training.exercises) {
      this.training.exercises = Object.keys(this.training.exercises).map(key => {
        this.training.exercises[key].key = key;;
        return this.training.exercises[key];
      });
    }
  }

  showHistory() {
    let modal = this.modalCtrl.create(TrainingHistoryModal, this.training);
    modal.present();
  }

  removeLastSet(exercise) {
    exercise.sets.pop();
  }

  addSet(exercise) {
    let newSet = {};
    if (exercise.sets) {
      newSet = Object.assign({}, exercise.sets[exercise.sets.length-1]);
    } else {
      exercise.sets = [];
      newSet = Object.assign({}, exercise.basicSet);
    }

    let maxSet = Object.assign({}, this.trainingData.getClientMaxSet(exercise));
    if (maxSet) {
      return exercise.sets.push(maxSet);
    }
    exercise.sets.push(newSet);
  }

  addExercise() {
    let ex = {};
    if (!this.training.exercises || this.training.exercises.length === 0) {
      this.training.exercises = [];
    }
    this.training.exercises.push(ex);
  }

  setExercise() {
    let newEx = this.exercises[this.newExerciseKey];
    this.training.exercises[this.training.exercises.length-1] = newEx;
    console.log('test?!', this.newExerciseKey, newEx);
  }

  joinExercises() {
    if (this.training.exercises) {
      Object.keys(this.ex).map(exercise => {
        this.ex[exercise].name = this.exercises[exercise].name;
        this.ex[exercise].category = this.exercises[exercise].category;
        this.ex[exercise].basicSet = this.exercises[exercise].basicSet;
      });
      this.training.exercises = Object.keys(this.ex).map(key => this.ex[key]);
    }
  }

  getExercises() {
    this.exerciseData.getExercises().then(exercises => {
      this.exercises = exercises;
      this.exerciseArray = Object.keys(this.exercises).map(key => {
        this.exercises[key].key = key;
        return this.exercises[key];
      });
      this.joinExercises();
    });
  }

  ionViewLoaded() {
    this.getExercises();
  }
}
