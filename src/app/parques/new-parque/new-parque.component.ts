import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ParqueService } from '../parques-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-parque',
  templateUrl: './new-parque.component.html',
  styleUrls: ['./new-parque.component.css'],
  imports: [FormsModule,CommonModule],
})

export class NewParqueComponent {
  nombre: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  imagenes: File[] = [];
  imagenesPreview: string[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.imagenes = Array.from(event.target.files) as File[];

    const invalidFiles = this.imagenes.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Solo se permiten archivos de imagen.');
      this.imagenes = [];
      this.imagenesPreview = [];
      return;
    }

    this.imagenesPreview = this.imagenes.map(file => URL.createObjectURL(file));
  }

  onSubmit() {
    if (this.imagenes.length === 0) {
      alert('Por favor selecciona al menos una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('ubicacion', this.ubicacion);

    this.imagenes.forEach((imagen, index) => {
      formData.append('imagenes', imagen, `imagen_${index}`);
    });

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.http.post('http://localhost:8000/api/parques/', formData, { headers }).subscribe(
      (response) => {
        alert('Parque registrado exitosamente.');
        this.nombre = '';
        this.descripcion = '';
        this.ubicacion = '';
        this.imagenes = [];
        this.imagenesPreview = [];
      },
      (error) => {
        console.error('Error al registrar el parque:', error);
        alert('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
  }
}