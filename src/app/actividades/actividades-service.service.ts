import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';  // Asegúrate de importar el servicio de login

const API_URL = 'http://localhost:8000/api/actividades/'; // Cambia esta URL a la correcta

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Obtener todas las actividades (GET)
  getActividades(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(API_URL, { headers });
  }

  // Obtener una actividad por ID (GET)
  getActividad(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(`${API_URL}${id}/`, { headers });
  }

  // Crear una nueva actividad (POST)
  createActividad(actividadData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.post(API_URL, actividadData, { headers });
  }

  // Actualizar una actividad (PATCH)
  updateActividad(id: number, actividadData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.patch(`${API_URL}${id}/`, actividadData, { headers });
  }

  // Eliminar una actividad (DELETE)
  deleteActividad(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.delete(`${API_URL}${id}/`, { headers });
  }
}
