
  import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class ImcService {
  private apiUrl = 'https://al-parque.vercel.app/api/bmi/create/'; // Endpoint base para IMC
  private exportUrl = 'https://al-parque.vercel.app/api/bmi/export/'; // Endpoint para exportar IMC
  private graphUrl = 'https://al-parque.vercel.app//api/bmi/chart/';  // Endpoint para gráfica de IMC

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Exportar datos de IMC
  exportarIMC(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
    });

    return this.http.get(this.exportUrl, { headers, responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener datos para la gráfica
  /* verGraficaIMC(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`,
    });

    return this.http.get<any>(this.graphUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  } */
// Obtener datos para la gráfica
verGraficaIMC(): Observable<Blob> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.loginService.userToken}`,
  });

  return this.http.get<Blob>(this.graphUrl, { headers, responseType: 'blob' as 'json' }).pipe(
    catchError(this.handleError)
  );
}

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de IMC:', error);
    return throwError(() => new Error('Ocurrió un error. Por favor, inténtelo de nuevo más tarde.'));
  }

  // Guardar un nuevo registro de IMC
  saveIMC(imcData: { user: number; peso: string; altura: string; imc: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.userToken}`
    });

    console.log('Token de autenticación:', this.loginService.userToken);  // Verifica el token

    const body = {
      user: imcData.user,       // user como número entero
      weight: imcData.peso.toString(),  // peso como string
      height: imcData.altura.toString(),  // altura como string
    };

    console.log('Datos a enviar:', body); // Verifica los datos

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}

