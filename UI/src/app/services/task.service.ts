import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  day=new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate())).toISOString().replace('Z', '+00:00');


  public categorySource = new BehaviorSubject<string>('Work');
  currentCategory = this.categorySource.asObservable();

  public changeSource = new BehaviorSubject<string>('msg');
  currentchange = this.changeSource.asObservable();

  private today: string = this.getTodayFormatted();
  private dateSource = new BehaviorSubject<string>(this.today);
  currentDate = this.dateSource.asObservable();

  // Function to change the category
  changeCategory(category: string) {
    this.categorySource.next(category);
  }
  change(msg: string) {
    this.changeSource.next(msg);
  }
  changeDate(date: string) {
    this.dateSource.next(date);
  }

  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  private getTodayFormatted(): string {
    const date = new Date();
    return date.toISOString().split('T')[0] + 'T00:00:00.000+00:00';
  }

  // Get all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getTasksfilter(day:any,category:any): Observable<any[]> {
    console.log(day);
    const params = new URLSearchParams();
    if (day) {
      params.append('date', day);
    }
    if (category) {
      params.append('category', category);
    }

    // Make the HTTP GET request with the constructed URL
    return this.http.get<any[]>(`${this.apiUrl}/filter?${params.toString()}`);
  }

  // Get a single task by ID
  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new task
  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  // Update a task by ID
  updateTask(id: string, task: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, task);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

