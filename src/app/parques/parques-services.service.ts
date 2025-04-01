/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';  // Asegúrate de importar el servicio de login

// Asegúrate de que esta URL corresponda a tu endpoint de Django
const API_URL = 'https://alparque.onrender.com/api/parques/'; // Cambia esta URL a la correcta

@Injectable({
  providedIn: 'root'
})
export class ParqueService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Obtener todos los parques (GET)
  getParques(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(API_URL, { headers });
  }

  // Obtener un parque por ID (GET)
  getParque(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(`${API_URL}${id}/`, { headers });
  }

  // Crear un nuevo parque (POST)
  createParque(parqueData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.post(API_URL, parqueData, { headers });
  }

  // Actualizar un parque (PATCH)
  updateParque(id: number, parqueData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.patch(`${API_URL}${id}/`, parqueData, { headers });
  }
}
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ParqueService {

  // Usar la URL definida en el entorno
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Método para obtener los encabezados con el token de autorización
  private getAuthHeaders(): HttpHeaders {
    const token = this.loginService.userToken;
    if (!token) {
      // Si no hay token, podemos lanzar un error o redirigir al usuario a la página de login.
      throw new Error('Token no disponible. Por favor, inicia sesión.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Obtener todos los parques (GET)
  getParques(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  // Obtener un parque por ID (GET)
  getParque(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}${id}/`, { headers });
  }

  // Crear un nuevo parque (POST)
  createParque(parqueData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, parqueData, { headers });
  }

  // Actualizar un parque (PATCH)
  updateParque(id: number, parqueData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}${id}/`, parqueData, { headers });
  }
}
