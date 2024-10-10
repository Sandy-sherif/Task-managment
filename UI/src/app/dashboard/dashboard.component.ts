import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { MyTasksComponent } from '../my-tasks/my-tasks.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CalendarComponent,MyTasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
