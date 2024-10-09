import { MyTasksComponent } from './../my-tasks/my-tasks.component';
import { CalendarComponent } from './../calendar/calendar.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,NavComponent,CalendarComponent,MyTasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
