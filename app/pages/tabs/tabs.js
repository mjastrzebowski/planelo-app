import { Component, Input } from '@angular/core';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {ExerciseListPage} from '../exercise-list/exercise-list';
import {TrainingListPage} from '../training-list/training-list';
import {TrainingPage} from '../training/training';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // set the root pages for each tab
    this.tab1Root = SchedulePage;
    this.tab2Root = SpeakerListPage;
    this.tab3Root = ExerciseListPage;
    this.tab4Root = TrainingListPage;
  }
}
