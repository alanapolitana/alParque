import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';
import { environment } from '../../environments/environment';
import { Actividad } from './actividad.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = `${environment.API_URL}actividades/`;
  private parquesUrl = `${environment.API_URL}parques/`;

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
  }

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getActividad(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  createActividad(formData: FormData): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  updateActividad(id: number, actividadData: Partial<Actividad>): Observable<Actividad> {
    return this.http.patch<Actividad>(`${this.apiUrl}${id}/`, actividadData, { headers: this.getHeaders() });
  }

  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  getActividadesFiltradas(parqueId: number | null): Observable<Actividad[]> {
    const url = parqueId ? `${this.apiUrl}?parque=${parqueId}` : this.apiUrl;
    return this.http.get<Actividad[]>(url, { headers: this.getHeaders() });
  }

  cargarParques(): Observable<any> {
    return this.http.get(this.parquesUrl, { headers: this.getHeaders() });
  }
}
