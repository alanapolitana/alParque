import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-actividad',
  templateUrl: './new-actividad.component.html',
  styleUrls: ['./new-actividad.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewActividadComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  actividad: any = {
    nombre: '',
    descripcion: '',
    instagram: '',
    website: '',
    parque: null,
    imagenes: []
  };

  parques: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarParques();
  }

  cargarParques(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token no encontrado. El usuario no está autenticado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:8000/api/parques/', { headers }).subscribe(
      (data) => {
        this.parques = data;
      },
      (error) => {
        console.error('Error al cargar los parques:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files) {
      this.actividad.imagenes = [];
      for (let i = 0; i < files.length; i++) {
        this.actividad.imagenes.push(files[i]);
      }
    }
  }

  guardarActividad(): void {
    this.error = null;

    // Asegúrate de enviar el ID del parque como un número entero
    if (this.actividad.parque && typeof this.actividad.parque === 'string') {
      const parqueId = parseInt(this.actividad.parque, 10);
      if (isNaN(parqueId)) {
        this.error = 'El ID del parque no es válido.';
        return;
      }
      this.actividad.parque = parqueId;
    }

    // Validar URL del sitio web
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (this.actividad.website && !urlPattern.test(this.actividad.website)) {
      this.error = 'La URL del sitio web no es válida.';
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.actividad.nombre);
    formData.append('descripcion', this.actividad.descripcion);
    formData.append('instagram', this.actividad.instagram || '');
    formData.append('website', this.actividad.website || '');
    formData.append('parque', this.actividad.parque.toString());

    if (this.actividad.imagenes.length > 0) {
      this.actividad.imagenes.forEach((imagen: File) => {
        formData.append('imagenes', imagen);
      });
    }

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.http.post('http://localhost:8000/api/actividades/', formData, { headers }).subscribe(
      (response) => {
        console.log('Actividad guardada:', response);
        this.closeModal.emit();
      },
      (error) => {
        console.error('Error al guardar la actividad:', error);
        this.error = error?.error?.imagenes?.[0] || error?.error?.parque?.[0] || error?.error?.website?.[0] || 'Error al guardar la actividad';
      }
    );
  }
}
