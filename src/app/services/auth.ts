import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = 'https://bookquotes-api.onrender.com/api/auth';
  //private apiUrl = 'http://localhost:5075/api/auth';
  private tokenKey = 'token';

  isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, model)
      .pipe(tap(res => this.handleToken(res.token)));
  }

  register(model: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, model)
      .pipe(tap(res => this.handleToken(res.token)));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  private handleToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedIn$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
