import { Routes } from '@angular/router';
import {Habits} from './components/habits/habits';
import {ChelehTrackerComponent} from './components/cheleh-tracker/cheleh-tracker';
import {EditHabits} from './components/edit-habits/edit-habits';

export const routes: Routes = [
  {path : '' , component : Habits},
  {path : 'habit-details' , component : ChelehTrackerComponent},
  {path : 'new-habits' , component : EditHabits}
];
