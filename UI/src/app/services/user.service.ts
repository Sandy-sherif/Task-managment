import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root' // This ensures the service is available application-wide
})
export class ApiService {
  private apiUrl = 'https://your-backend.up.railway.app/users';
  userid:string='';
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);

  }
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  updateUser(id: string, task: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, task);
  }
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode.jwtDecode(token);
        console.log(decodedToken.id);
        console.log(decodedToken.name);
        this.userid=decodedToken.id;
        return decodedToken.id; // Assumes user ID is stored as "id" in the token payload

      } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
      }
    }
    return null;
  }
}
