import { ApiService } from './../../services/user.service';

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  currentRoute: string='/home/dashboard';
  constructor(private router: Router,private service:ApiService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url; // Get the current route URL
        console.log(event.url);
      });
  }


  logout(){
    localStorage.setItem('isLoggedIn', 'false');
    this.service.userid='';
    this.router.navigate(['/login']);
  }

}
