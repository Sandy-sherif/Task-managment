import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,NavComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
