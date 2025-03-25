import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';  // Asegúrate de importar el servicio de login

const BASE_URL = 'http://localhost:8000/api/actividades/';
@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = BASE_URL; // Base URL común para todas las actividades

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Obtener todas las actividades (GET)
  getActividades(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // Obtener una actividad por ID (GET)
  getActividad(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(`${this.apiUrl}${id}/`, { headers });
  }

  // Crear una nueva actividad (POST)
  createActividad(actividadData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.post(this.apiUrl, actividadData, { headers });
  }

  // Actualizar una actividad (PATCH)
  updateActividad(id: number, actividadData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.patch(`${this.apiUrl}${id}/`, actividadData, { headers });
  }

  // Eliminar una actividad (DELETE)
  deleteActividad(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

  // Obtener actividades filtradas por parque (GET)
  getActividadesFiltradas(parqueId: number | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    const url = parqueId ? `${this.apiUrl}?parque=${parqueId}` : this.apiUrl;
    return this.http.get(url, { headers });
  }

  
}