import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  currentDate: string='';
  tomorrowDate: string='';
  date: string='';
  model={
    taskName : '' ,
    taskDueDate : this.date,
    taskPriority : 'High',
    taskStage : 'Not started',
    taskDiscription : '',
  }
  constructor(public dialogRef: MatDialogRef<NewtaskComponent>,private taskService : TaskService) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

  // Close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }
  openDatePicker(dateInput: HTMLInputElement) {
    dateInput.focus();  // Use focus to open the date picker
    dateInput.click();
  }

  onDateChange(event: any) {
    this.date = event.target.value;
  }
  getdate(day:string){
    if(day=='today'){
      this.date=this.currentDate;
      this.model.taskDueDate=this.date;

    }
    else{
      this.date=this.tomorrowDate;
      this.model.taskDueDate=this.date;
    }
  }
  addTask(): void {
    this.taskService.addTask(this.model).subscribe(() => {
      console.log('added successfully');
      this.dialogRef.close();
    });
  }

}
