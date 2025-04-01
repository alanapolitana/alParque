/* 
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { JwtService } from '../auth/jwt.service';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private JwtService: JwtService, private loginService: LoginService) {}

  getUser(id: number): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });

    return this.http.get<User>('https://alparque.onrender.com/api/user/', { headers }).pipe(
      tap(user => this.user$.next(user)),
      catchError(this.handleError)
    );
  }


    updateUser(user: User): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.userToken}`,
        'Content-Type': 'application/json'
      });
    
      return this.http.patch<User>('https://alparque.onrender.com/api/user/', user, { headers }).pipe(
        tap(updatedUser => this.user$.next(updatedUser)),
        catchError(this.handleError)
      );
    }
    
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(`Backend retorno el código de estado: `, error.status, error.error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>('https://alparque.onrender.com/api/register/', user).pipe(
      catchError(this.handleError)
    );
  }

  getUserObservable(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { JwtService } from '../auth/jwt.service';
import { LoginService } from '../auth/login.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private readonly API_URL = environment.API_URL;  // URL dinámica basada en el entorno

  constructor(private http: HttpClient, private jwtService: JwtService, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}user/`, { headers: this.getHeaders() }).pipe(
      tap(user => this.user$.next(user)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.patch<User>(`${this.API_URL}user/`, user, { headers: this.getHeaders() }).pipe(
      tap(updatedUser => this.user$.next(updatedUser)),
      catchError(this.handleError)
    );
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.API_URL}register/`, user).pipe(
      catchError(this.handleError)
    );
  }

  getUserObservable(): Observable<User | null> {
    return this.user$.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(`Backend retornó el código de estado: `, error.status, error.error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }
}
