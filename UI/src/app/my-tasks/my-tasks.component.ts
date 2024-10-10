import { NgForOf, NgStyle } from '@angular/common';
import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [NgForOf,NgStyle],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent implements OnInit{
  numberoftasks:number=0;
  tasks:any=[];
  constructor( private taskservice:TaskService){}

  ngOnInit() {
      this.taskservice.getTasks().subscribe((result)=>{
        console.log(result);
        this.tasks=result;
        for(let i =0 ;i<this.tasks.length;i++){
          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          this.tasks[i].taskDueDate=this.tasks[i].taskDueDate.split('T')[0];
          if(this.tasks[i].taskDueDate.split('T')[0] ==today.toISOString().split('T')[0]){
            this.tasks[i].taskDueDate='Today';
          }
          else if (this.tasks[i].taskDueDate.split('T')[0] ==tomorrow.toISOString().split('T')[0]){
            this.tasks[i].taskDueDate='Tomorrow';
          }
          else{
            const week = new Date();
            for(let j =2 ;j<=7;j++){
              week.setDate(today.getDate() + j);
              if(this.tasks[i].taskDueDate.split('T')[0] ==week.toISOString().split('T')[0]){
                this.tasks[i].taskDueDate='This week';
              }
            }
          }

          console.log(this.tasks[i].taskDueDate)
        }
        this.numberoftasks=this.tasks.length;
      })

  }
}
