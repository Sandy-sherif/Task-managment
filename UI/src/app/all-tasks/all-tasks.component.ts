import { NgForOf, NgStyle } from '@angular/common';
import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [NgForOf,NgStyle],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit{
  tasksOfToday:any=[];
  tasksOfTomorrow:any=[];
  tasksOfWeek:any=[];
  constructor( private service :TaskService){ }

  ngOnInit(): void {
  this.getall();
  }

  getall(){
    this.service.getTasks().subscribe((result)=>{
     console.log(result);
     for(let i=0;i<result.length;i++){
      const tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      if (result[i].taskDueDate.split('T')[0]==new Date().toISOString().split('T')[0]){
        result[i].taskDueDate='Today';
        this.tasksOfToday.push(result[i]);
      }

      else if(result[i].taskDueDate.split('T')[0]==tomorrow.toISOString().split('T')[0]){
        result[i].taskDueDate='Tomorrow';
        this.tasksOfTomorrow.push(result[i]);
      }
      else{
        const week = new Date();
        for(let j =1 ;j<7;j++){
          week.setDate(tomorrow.getDate() + j);
          if(result[i].taskDueDate.split('T')[0] ==week.toISOString().split('T')[0]){
            result[i].taskDueDate='This week';
            this.tasksOfWeek.push(result[i]);
          }
        }
      }
     }
    })
  }

}
