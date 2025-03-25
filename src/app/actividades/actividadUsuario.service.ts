import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadUsuarioService {
  private apiUrl = 'http://localhost:8000/api/actividad-usuarios/';

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


  getActividadesPorUsuario(id: number): Observable<any> {
    // Construcción correcta de la URL con el parámetro `id`
    const url = `http://localhost:8000/api/actividad-usuarios/${id}/`;  // Aquí pasamos el id dinámico
    console.log(`Fetching: ${url}`);
    
    // Si tienes un token de autenticación, lo agregas en los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`  // Añade el token de autenticación si es necesario
    });
    
    // Realiza la petición GET
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
    const url = `${this.apiUrl}/${id}/`;
    console.log(`Fetching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.get(url, { headers });
  }

  // Actualizar una actividad-usuario (PUT)
  updateActividadUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    console.log(`Updating: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(url, data, { headers });
  }

  // Actualizar parcialmente una actividad-usuario (PATCH)
  partialUpdateActividadUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    console.log(`Patching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, data, { headers });
  }

  // Eliminar una actividad-usuario (DELETE)
  deleteActividadUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    console.log(`Deleting: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });
    return this.http.delete(url, { headers });
  }

  // Aprobar usuario en una actividad (PATCH)
  aprobarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/aprobar/`;
    console.log(`Patching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, { aprobado: true }, { headers });
  }

  // Hacer administrador a un usuario (PATCH)
  hacerAdmin(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/hacer-admin/`;
    console.log(`Patching: ${url}`);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(url, { administrador: true }, { headers });
  }
}
