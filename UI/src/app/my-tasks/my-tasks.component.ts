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

this.getall();

  }

  getall(){
    this.taskservice.currentchange.subscribe((msg)=>{
      console.log('msg',msg);
    this.taskservice.currentDate.subscribe((date)=>{
      this.taskservice.currentCategory.subscribe((category) => {
        this.taskservice.getTasksfilter(date,category).subscribe((result)=>{
          console.log(result);
          this.tasks=result;
          for(let i =0 ;i<this.tasks.length;i++){
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            this.tasks[i].taskDueDate=this.tasks[i].taskDueDate.split('T')[0];
            if(this.tasks[i].taskDueDate.split('T')[0] ==today.toISOString().split('T')[0]){
              this.tasks[i].displayDueDate='Today';
            }
            else if (this.tasks[i].taskDueDate.split('T')[0] ==tomorrow.toISOString().split('T')[0]){
              this.tasks[i].displayDueDate='Tomorrow';
            }
            else{
              const week = new Date();
              for(let j =2 ;j<=7;j++){
                week.setDate(today.getDate() + j);
                if(this.tasks[i].taskDueDate.split('T')[0] ==week.toISOString().split('T')[0]){
                  this.tasks[i].displayDueDate='This week';
                }
              }
            }

            console.log(this.tasks[i].taskDueDate)
          }
          this.numberoftasks=this.tasks.length;
        })
      })
    })
  })
  }
  toggleTaskStage(task: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const updatedTask = {
      ...task,
      taskStage: isChecked ? 'Finished' : 'Not started'
    };
    delete updatedTask.displayDueDate;
   console.log(updatedTask);
    this.taskservice.updateTask(task._id, updatedTask).subscribe((response)=>{
      console.log('Task stage updated successfully', response);
      this.tasks=[];
      this.getall();
    },
    (error) => {
      console.error('Error updating task stage', error);
    })
  }
}
