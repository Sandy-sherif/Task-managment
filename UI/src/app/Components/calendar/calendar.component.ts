import { TaskService } from './../../services/task.service';
import { NgForOf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [NgForOf,NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  date: Date = new Date();
  year: number = this.date.getFullYear();
  month: number = this.date.getMonth();
  day:number = +(String(this.date).substring(8,11));
  selectedDivId:number=+(String(this.date).substring(8,11));
  daysArray: (number | null)[] = [];
  formattedDate: string = '';
  selectedDate: any = new Date(this.year, this.month, this.day).toDateString()

  constructor(private service:TaskService){}

  ngOnInit(): void {
    this.displayCalendar();
  }

  displayCalendar(): void {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const numberOfDays = lastDay.getDate();

    // Format the month and year to display
    this.formattedDate = this.date.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    // Create the array for days of the month with empty slots for alignment
    this.daysArray = Array(firstDayIndex).fill(null); // Empty slots before the first day
    for (let i = 1; i <= numberOfDays; i++) {
      this.daysArray.push(i);
    }
  }

  changeMonth(step: number): void {
    this.month += step;

    if (this.month < 0) {
      this.month = 11;
      this.year -= 1;
    } else if (this.month > 11) {
      this.month = 0;
      this.year += 1;
    }

    this.date.setMonth(this.month);
    this.displayCalendar();
    this.selectedDate = null; // Clear selected date when month changes
  }

  selectDate(day: number | null): void {
    if (day !== null) {
      const selected = new Date(this.year, this.month, day);
      this.selectedDate = selected.toDateString();
      console.log(this.selectedDate)
      this.changeDate(new Date(Date.UTC(new Date(this.selectedDate).getUTCFullYear(), new Date(this.selectedDate).getUTCMonth(), new Date(this.selectedDate).getUTCDate()+1)).toISOString().replace('Z', '+00:00'))
    }
  }

  isCurrentDate(day: number | null): boolean {
    if (day === null) return false;


    const currentDate = new Date();


    return (

      this.year === currentDate.getFullYear() &&
      this.month === currentDate.getMonth() &&
      this.day === currentDate.getDate()
    );
  }
  changeColor(divId: number) {
    this.selectedDivId = divId; // Update selected div ID
  }

  changeDate(newdate: string) {
    console.log(newdate);
    this.service.changeDate(newdate); // This will notify other components
  }
}
