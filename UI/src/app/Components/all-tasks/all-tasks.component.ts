import { NgForOf, NgStyle } from '@angular/common';
import { TaskService } from './../../services/task.service';
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
   days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  constructor( private service :TaskService){ }

  ngOnInit(): void {
  this.getall();
  }

  getall(){
    this.service.currentchange.subscribe((msg)=>{
    this.service.getTasks().subscribe((result)=>{
      this.tasksOfToday=[];
      this.tasksOfTomorrow=[];
      this.tasksOfWeek=[];
     console.log(result);
     for(let i=0;i<result.length;i++){
      const tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      if (result[i].taskDueDate.split('T')[0]==new Date().toISOString().split('T')[0]){
        result[i].displayDueDate ='Today';
        console.log(result[i].displayDueDate)
        this.tasksOfToday.push(result[i]);
      }

      else if(result[i].taskDueDate.split('T')[0]==tomorrow.toISOString().split('T')[0]){
        result[i].displayDueDate ='Tomorrow';
        this.tasksOfTomorrow.push(result[i]);
      }
      else{
        const week = new Date();
        for(let j =1 ;j<7;j++){
          week.setDate(tomorrow.getDate() + j);
          if(result[i].taskDueDate.split('T')[0] ==week.toISOString().split('T')[0]){
            const displayDueDate  = new Date(result[i].taskDueDate);
            result[i].displayDueDate =this.days[displayDueDate.getDay()];;
            this.tasksOfWeek.push(result[i]);
          }
        }
      }
     }
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
    this.service.updateTask(task._id, updatedTask).subscribe((response)=>{
      console.log('Task stage updated successfully', response);
      this.tasksOfToday=[];
      this.tasksOfTomorrow=[];
      this.tasksOfWeek=[];
      this.getall();
    },
    (error) => {
      console.error('Error updating task stage', error);
    })
  }
}
