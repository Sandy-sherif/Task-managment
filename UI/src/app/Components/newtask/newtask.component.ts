import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgStyle, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-newtask',
  standalone: true,
  imports: [FormsModule,NgStyle,NgForOf,NgIf],
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent {
  currentDate: string='';
  tomorrowDate: string='';
  date: string='';
  show:boolean=false;
  show2:boolean=false;
  show3:boolean=false;
  color:string='transparent';
  categories=['Work','Family','Freelance work','Confernce planning']
  model={
    taskName : '' ,
    taskDueDate : this.date,
    taskPriority : '',
    taskStage : 'Not started',
    taskDiscription : '',
    taskCategory :'',
    taskNotfication:''

  }
  selectedSpan: number | null = null;


  constructor(public dialogRef: MatDialogRef<NewtaskComponent>,private taskService : TaskService) {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.tomorrowDate = tomorrow.toISOString().split('T')[0];
  }

  change(msg: string) {
    this.taskService.change(msg); // This will notify other components
  }

  selectSpan(index: number) {
    this.selectedSpan = index;
  }
  changecolor(){
    if (this.color=='transparent'){
      this.color='#FAE150';
    }
    else{
      this.color='transparent';
    }

  }
  selectItem(item: string) {
    this.model.taskCategory = item;

  }

  // Close the dialog
  closeDialog(): void {
    this.change('s');
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
      this.change('s');
      console.log('added successfully');
      this.dialogRef.close();
    });
  }
  enabledinput(){
          this.show=true;
  }
  enabledinput2(){
    this.show2=true;
}
enable(){
  this.show3=!this.show3;
}
}
