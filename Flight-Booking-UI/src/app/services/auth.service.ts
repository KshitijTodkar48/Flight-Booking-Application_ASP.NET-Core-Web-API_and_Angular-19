import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7250/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  register(data: { username: string; email: string; password: string; role: string }) {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  storeToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  isPassenger(): boolean {
    return localStorage.getItem('role') === 'Passenger';
  }
}