import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChelehTrackerComponent } from './components/cheleh-tracker/cheleh-tracker';
import {Habits} from './components/habits/habits';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChelehTrackerComponent, Habits],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'habit-tracker';
}
