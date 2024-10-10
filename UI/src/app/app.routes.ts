import { AuthGuard } from './Guards/auth.guard';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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
