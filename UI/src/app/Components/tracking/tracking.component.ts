import { TaskService } from './../../services/task.service';
import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{
  tasks:any=[];
  timeLeft: number = 3600; // Example: 1 hour (in seconds)
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;
  isRunning: boolean = false;
  constructor(private service:TaskService){}

  ngOnInit(): void {
this.gettasks();
  }
  gettasks(){
    this.service.currentDate.subscribe((date)=>{
      this.service.currentCategory.subscribe((category) => {
        this.service.getTasksfilter(date,category).subscribe((result)=>{
      this.tasks=result;
      console.log(result)
    })
  })
})
  }
  startCountdown() {
    if (!this.isRunning) {
      this.calculateTimeUnits();
      this.isRunning = true;

      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.calculateTimeUnits();
        } else {
          this.stopCountdown(); // Stops when time is up
          console.log('Countdown finished!');
        }
      }, 1000);
    }
  }

  stopCountdown() {
    if (this.interval) {
      clearInterval(this.interval); // Clears the interval to stop the countdown
      this.isRunning = false;
    }
  }
  handleClick() {
    if (this.isRunning) {
      this.stopCountdown(); // Call function if isRunning is true
    } else {
      this.startCountdown(); // Call function if isRunning is false
    }
    this.isRunning = !this.isRunning; // Toggle the value of isRunning
  }


  resetCountdown() {
    this.stopCountdown(); // Stop any running countdown
    this.timeLeft = 120; // Reset to original time (e.g., 2 minutes)
    this.calculateTimeUnits();
  }

  calculateTimeUnits() {
    this.minutes = Math.floor(this.timeLeft / 60);
    this.seconds = this.timeLeft % 60;
  }

  // Simple function to pad single digits with a leading zero
  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
