/* import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { JwtService } from '../auth/jwt.service';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private JwtService: JwtService, private loginService: LoginService) { }

  getUser(id: number):Observable<User> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.loginService.userToken}` 
  });
    
    return this.http.get<User>('http://127.0.0.1:8000/api/user/', { headers });
  }


  updateUser(user: User):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` 
    });
  
    return this.http.patch('http://127.0.0.1:8000/api/user/', user, { headers });	
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(`Backend retorno el código de estado: `, error.status, error.error);
    }
    return throwError(() => new Error('Algo salio mal, intente nuevamente'));
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/register/', user).pipe(
      catchError(this.handleError)
    );
  }

} */
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

    return this.http.get<User>('https://al-parque.vercel.app/api/user/${id}', { headers }).pipe(
      tap(user => this.user$.next(user)),
      catchError(this.handleError)
    );
  }

 /*  updateUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });

    return this.http.patch<User>('http://127.0.0.1:8000/api/user/update/', { headers }).pipe(
      tap(() => this.user$.next(user)),
      catchError(this.handleError)
    );
  } */
    updateUser(user: User): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.loginService.userToken}`,
        'Content-Type': 'application/json'
      });
    
      return this.http.patch<User>('https://al-parque.vercel.app/api/user/', user, { headers }).pipe(
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
    return this.http.post<any>('https://al-parque.vercel.app/api/register/', user).pipe(
      catchError(this.handleError)
    );
  }

  getUserObservable(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
