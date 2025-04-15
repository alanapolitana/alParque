import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadUsuarioService {
  // Usar la URL base definida en el entorno
  private apiUrl = `${environment.API_URL}actividad-usuarios/`;  // URL base de actividades de usuario

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Obtener todas las actividades de usuarios (GET)
  getActividadesUsuarios(): Observable<any> {
    const url = this.apiUrl;
    console.log(`Fetching: ${url}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    
    return this.http.get(url, { headers });
  }

  // Obtener actividades de usuario por ID (GET)
  getActividadesPorUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;  // URL con el parámetro `id`
    console.log(`Fetching: ${url}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    
    return this.http.get<any>(url, { headers });
  }

  // Crear una nueva actividad-usuario (POST)
  createActividadUsuario(data: any): Observable<any> {
    const url = this.apiUrl;
    console.log(`Posting to: ${url}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(url, data, { headers });
  }

  // Obtener una actividad-usuario por ID (GET)
  getActividadUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    console.log(`Fetching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(url, { headers });
  }

  // Actualizar una actividad-usuario (PUT)
  updateActividadUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    console.log(`Updating: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(url, data, { headers });
  }

  // Actualizar parcialmente una actividad-usuario (PATCH)
  partialUpdateActividadUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    console.log(`Patching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, data, { headers });
  }

  // Eliminar una actividad-usuario (DELETE)
  deleteActividadUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    console.log(`Deleting: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.delete(url, { headers });
  }

  // Aprobar usuario en una actividad (PATCH)
  aprobarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/aprobar/`;
    console.log(`Patching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, { aprobado: true }, { headers });
  }

  // Hacer administrador a un usuario (PATCH)
  hacerAdmin(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/hacer-admin/`;
    console.log(`Patching: ${url}`);

    /* const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    }); */
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` // Se agrega el token de autorización
    });
    return this.http.patch(url, { administrador: true }, { headers });
  }
}
