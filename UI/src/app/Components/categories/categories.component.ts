import { TaskService } from './../services/task.service';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgClass],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  index:number=1;
  constructor(private service:TaskService){}

  change(id:number,category:string){
    this.index=id;
    this.changeCategory(category);

  }
  changeCategory(newCategory: string) {
    this.service.changeCategory(newCategory); // This will notify other components
  }

}
