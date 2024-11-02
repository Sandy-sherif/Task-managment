import { NewtaskComponent } from './../newtask/newtask.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(NewtaskComponent, {
      width: '35vw',
      height: '87vh',
      disableClose: true,
      data: { name: 'John Doe' }
    });
  }



}
