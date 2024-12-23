import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit{

  model={
    userName : '',
    userPassword : '',
    userEmail : '',
  }

  wanttochange:boolean=false;


constructor(private service:ApiService,private router:Router){

}

  ngOnInit(): void {
      this.getUserData();
  }

  getUserData(){
    this.service.getUserById(this.service.userid).subscribe((data)=>{
      console.log(data);
      this.model=data;
    })

  }

  edituser(){
    this.service.updateUser(this.service.userid,this.model).subscribe(()=>{
           this.router.navigate(['/home']);
    })
  }
  cancel(){
    this.router.navigate(['/home']);
  }

  change(){
   this.wanttochange=true;
  }
}
