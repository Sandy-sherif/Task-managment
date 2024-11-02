import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { AuthGuard } from './Guards/auth.guard';
import { AllTasksComponent } from './Components/all-tasks/all-tasks.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  }
  ,
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'dashboard',
        component :DashboardComponent
      },
      {
        path:'myTasks',
        component: AllTasksComponent
      }
      ,
      {
        path:'profile',
        component: MyprofileComponent
      },
      {
        path:'',
        component:DashboardComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
