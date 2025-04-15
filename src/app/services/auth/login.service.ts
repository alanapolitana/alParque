/* import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, map } from 'rxjs';
import { LoginRequest } from './login.request';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://alparque.onrender.com/api/login/';
  private token: string = '';
  private refreshToken: string = '';
  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('token') || '';
      this.currentUserLogin.next(localStorage.getItem('token') !== null);
      this.currentUserData.next(localStorage.getItem('token') || '');
    }
  }

  methodlogin(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((userData) => {
        if (userData && userData.token) {
          this.token = userData.token;
          localStorage.setItem('token', userData.token);
          localStorage.setItem('userId', userData.user.id); // Guarda el ID del usuario en localStorage
          this.currentUserData.next(userData.token);
          this.currentUserLogin.next(true);
        } else {
          console.error('El token o userId no está presente en la respuesta del backend.');
        }
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  methodlogout(): void {
    if (this.refreshToken) {
      this.http.post('https://alparque.onrender.com/api/logout/', { user: this.refreshToken }).subscribe({
        next: (response) => {
          console.log('Logout exitoso:', response);
        },
        error: (error) => {
          console.error('Error al cerrar sesión en el servidor:', error);
        }
      });
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      this.token = '';
      this.refreshToken = '';
      this.currentUserLogin.next(false);
      this.currentUserData.next('');
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(`Backend retorno el código de estado: `, error.status, error.error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLogin(): Observable<boolean> {
    return this.currentUserLogin.asObservable();
  }

  get userToken(): String {
    return this.token;
  }

  isValidToken(): boolean {
    try {
      const decodedToken = jwtDecode(this.token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, map } from 'rxjs';
import { LoginRequest } from './login.request';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.API_URL}login/`;
  private logoutUrl = `${environment.API_URL}logout/`;
  private token: string = '';
  private refreshToken: string = '';
  currentUserLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.token = localStorage.getItem('token') || '';
      this.currentUserLogin.next(!!localStorage.getItem('token'));
      this.currentUserData.next(localStorage.getItem('token') || '');
    }
  }

  methodlogin(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((userData) => {
        if (userData && userData.token) {
          this.token = userData.token;
          localStorage.setItem('token', userData.token);
          localStorage.setItem('userId', userData.user.id); // Guarda el ID del usuario en localStorage
          this.currentUserData.next(userData.token);
          this.currentUserLogin.next(true);
        } else {
          console.error('El token o userId no está presente en la respuesta del backend.');
        }
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  methodlogout(): void {
    if (this.refreshToken) {
      this.http.post(this.logoutUrl, { user: this.refreshToken }).subscribe({
        next: (response) => {
          console.log('Logout exitoso:', response);
        },
        error: (error) => {
          console.error('Error al cerrar sesión en el servidor:', error);
        }
      });
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.token = '';
      this.refreshToken = '';
      this.currentUserLogin.next(false);
      this.currentUserData.next('');
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(`Backend retornó el código de estado: `, error.status, error.error);
    }
    return throwError(() => new Error('Algo salió mal, intente nuevamente'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLogin(): Observable<boolean> {
    return this.currentUserLogin.asObservable();
  }

  get userToken(): string {
    return this.token;
  }

  isValidToken(): boolean {
    try {
      const decodedToken = jwtDecode(this.token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  get userId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }
  
}
