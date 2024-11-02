import { ApiService } from './../services/user.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  loginmodel = {
    userEmail: '',
    userPassword: ''
  };

  registermodel = {
    userName: '',
    userEmail: '',
    userPassword: ''
  };

  login: boolean = true;
  msg:any='';

  constructor(private apiService: ApiService, private router: Router) {}

  changelogin() {
    this.login = !this.login;
  }

  loginfun() {
    this.apiService.login(this.loginmodel).subscribe(
      response => {
        console.log('login successful', response);
        if(response.status=='success'){
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        }
        else{
             this.msg=response.data;
        }

      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  registerfun() {
    this.apiService.register(this.registermodel).subscribe(
      response => {
        console.log('register successful', response);
        if(response.status=='success'){
          this.router.navigate(['/home']);
        }
        else{
             this.msg=response.data;
        }
      },
      error => {
        console.error('Register failed:', error);
      }
    );
  }
}
