/* import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-parque',
  templateUrl: './new-parque.component.html',
  styleUrls: ['./new-parque.component.css'],
  imports: [FormsModule, CommonModule],
})
export class NewParqueComponent {
  nombre: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  imagenes: File[] = [];
  imagenesPreview: string[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.imagenes = files.filter(file => file.type.startsWith('image/'));

    if (this.imagenes.length !== files.length) {
      alert('Algunos archivos no son imágenes y fueron descartados.');
    }

    this.imagenesPreview = this.imagenes.map(file => URL.createObjectURL(file));
  }

  onSubmit() {
    if (!this.nombre || !this.descripcion || !this.ubicacion || this.imagenes.length === 0) {
      alert('Todos los campos y al menos una imagen son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('ubicacion', this.ubicacion);
    this.imagenes.forEach((imagen, index) => {
      formData.append(`imagenes`, imagen, `imagen_${index}`);
    });

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.http.post(`${environment.API_URL}parques/`, formData, { headers }).subscribe(
      () => {
        alert('Parque registrado exitosamente.');
        this.resetForm();
      },
      error => {
        console.error('Error al registrar el parque:', error);
        alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
  }

  private resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.ubicacion = '';
    this.imagenes = [];
    this.imagenesPreview = [];
  }
}
 */
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-parque',
  templateUrl: './new-parque.component.html',
  styleUrls: ['./new-parque.component.css'],
  imports: [FormsModule, CommonModule],
})
export class NewParqueComponent {
  nombre: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  imagenes: File[] = [];
  imagenesPreview: string[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.imagenes = files.filter(file => file.type.startsWith('image/'));

    if (this.imagenes.length !== files.length) {
      alert('Algunos archivos no son imágenes y fueron descartados.');
    }

    this.imagenesPreview = this.imagenes.map(file => URL.createObjectURL(file));
  }

  onSubmit() {
    if (!this.nombre || !this.descripcion || !this.ubicacion || this.imagenes.length === 0) {
      alert('Todos los campos y al menos una imagen son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('ubicacion', this.ubicacion);
    this.imagenes.forEach((imagen, index) => {
      formData.append(`imagenes`, imagen, `imagen_${index}`);
    });

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.http.post(`${environment.API_URL}parques/`, formData, { headers }).subscribe(
      () => {
        alert('Parque registrado exitosamente.');
        this.resetForm();
      },
      error => {
        console.error('Error al registrar el parque:', error);
        alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
  }

  private resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.ubicacion = '';
    this.imagenes = [];
    this.imagenesPreview = [];
  }
}
