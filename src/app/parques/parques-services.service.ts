import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';  // Asegúrate de importar el servicio de login
import { environment } from '../../environments/environment'; // Importa el archivo de entorno

@Injectable({
  providedIn: 'root'
})
export class ParqueService {

  // API_URL dinámica basada en el entorno (ya no es necesario declararla fuera)
  private readonly API_URL = `${environment.API_URL}parques/`; // Usar la URL dinámica

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Obtener todos los parques (GET)
  getParques(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` // Se agrega el token de autorización
    });
    return this.http.get(this.API_URL, { headers }); // Usar la constante API_URL de la clase
  }

  // Obtener un parque por ID (GET)
  getParque(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` // Se agrega el token de autorización
    });
    return this.http.get(`${this.API_URL}${id}/`, { headers }); // Usar la URL con el ID
  }

  // Crear un nuevo parque (POST)
  createParque(parqueData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` // Se agrega el token de autorización
    });
    return this.http.post(this.API_URL, parqueData, { headers }); // Enviar los datos al endpoint
  }

  // Actualizar un parque (PATCH)
  updateParque(id: number, parqueData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}` // Se agrega el token de autorización
    });
    return this.http.patch(`${this.API_URL}${id}/`, parqueData, { headers }); // Enviar los datos con el ID
  }
}