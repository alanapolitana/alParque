import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActividadesService } from '../actividades.service';
import { ActividadUsuarioService } from '../actividadUsuario.service';
import { LoginService } from '../../services/auth/login.service';
import { Actividad } from '../actividad.model';


@Component({
  selector: 'app-new-actividad',
  templateUrl: './new-actividad.component.html',
  styleUrls: ['./new-actividad.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewActividadComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();

  // Tipo corregido
  actividad: Partial<Omit<Actividad, 'imagenes'>> & { imagenes: File[] } = {
    nombre: '',
    descripcion: '',
    instagram: '',
    website: '',
    parque: null,
    imagenes: []
  };

  parques: { id: number; nombre: string }[] = [];
  error: string | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private actividadUsuarioService: ActividadUsuarioService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.cargarParques();
  }

  cargarParques(): void {
    this.actividadesService.cargarParques().subscribe(
      (data) => {
        this.parques = data;
      },
      (error) => {
        console.error('Error al cargar los parques:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.actividad.imagenes = Array.from(input.files);
    }
  }
  /* 
    guardarActividad(): void {
      this.error = null;
  
      // Asegura que parque sea número
      if (typeof this.actividad.parque === 'string') {
        const parsed = parseInt(this.actividad.parque, 10);
        if (isNaN(parsed)) {
          this.error = 'El ID del parque no es válido.';
          return;
        }
        this.actividad.parque = parsed;
      }
  
      if (this.actividad.website && !/^(ftp|http|https):\/\/[^ "]+$/.test(this.actividad.website)) {
        this.error = 'La URL del sitio web no es válida.';
        return;
      }
  
      const formData = new FormData();
      formData.append('nombre', this.actividad.nombre ?? '');
      formData.append('descripcion', this.actividad.descripcion ?? '');
      formData.append('instagram', this.actividad.instagram ?? '');
      formData.append('website', this.actividad.website ?? '');
      formData.append('parque', this.actividad.parque?.toString() ?? '');
  
      this.actividad.imagenes.forEach((img: File) => {
        formData.append('imagenes', img);
      });
  
      this.actividadesService.createActividad(formData).subscribe(
        (actividadCreada) => {
          console.log('Actividad creada:', actividadCreada);
  
          const userId = this.loginService.userId;
          if (userId) {
            const nuevaRelacion = {
              actividad_id: actividadCreada.id,
              user: userId,
              aprobado: true,
              administrador: true,
              integranteDesde: new Date().toISOString().split('T')[0]
            };
  
            this.actividadUsuarioService.createActividadUsuario(nuevaRelacion).subscribe(
              () => {
                console.log('Usuario asignado como administrador');
                this.closeModal();
              },
              (error) => {
                console.error('Error al asignar el administrador:', error);
                this.error = 'Actividad creada pero ocurrió un error al asignarte como administrador.';
              }
            );
          } else {
            this.error = 'No se pudo obtener el ID del usuario logueado.';
          }
        },
        (error) => {
          console.error('Error al guardar la actividad:', error);
          this.error = error?.error?.imagenes?.[0] || error?.error?.parque?.[0] || error?.error?.website?.[0] || 'Error al guardar la actividad';
        }
      );
    } */
   
  closeModal(): void {
    this.cerrarModal.emit();
  }
  guardarActividad(): void {
    this.error = null;

    // Asegura que parque sea número
    if (typeof this.actividad.parque === 'string') {
      const parsed = parseInt(this.actividad.parque, 10);
      if (isNaN(parsed)) {
        this.error = 'El ID del parque no es válido.';
        return;
      }
      this.actividad.parque = parsed;
    }

    if (this.actividad.website && !/^(ftp|http|https):\/\/[^ "]+$/.test(this.actividad.website)) {
      this.error = 'La URL del sitio web no es válida.';
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.actividad.nombre ?? '');
    formData.append('descripcion', this.actividad.descripcion ?? '');
    formData.append('instagram', this.actividad.instagram ?? '');
    formData.append('website', this.actividad.website ?? '');
    formData.append('parque', this.actividad.parque?.toString() ?? '');

    this.actividad.imagenes.forEach((img: File) => {
      formData.append('imagenes', img);
    });

    this.actividadesService.createActividad(formData).subscribe(
      (actividadCreada) => {
        console.log('Actividad creada:', actividadCreada);
        alert('Actividad creada con éxito');
        this.closeModal(); // Cerramos directamente el modal
      },
      (error) => {
        console.error('Error al guardar la actividad:', error);
        this.error =
          error?.error?.imagenes?.[0] ||
          error?.error?.parque?.[0] ||
          error?.error?.website?.[0] ||
          'Error al guardar la actividad';
      }
    );
  }

}
