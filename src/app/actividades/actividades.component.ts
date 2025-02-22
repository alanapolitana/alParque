import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActividadesService } from './actividades-service.service';
import { Actividad } from './actividad.model';
import { CommonModule } from '@angular/common';
import { ActividadDetallesTemplateComponent } from "./actividad-detalles-template/actividad-detalles-template.component";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NewActividadComponent } from "./new-actividad/new-actividad.component";
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  imports: [CommonModule, ActividadDetallesTemplateComponent, NewActividadComponent]
})
export class ActividadesComponent implements OnInit {
  actividades: Actividad[] = [];
  actividadSeleccionada!: Actividad;

  @ViewChild('newActividad', { static: true }) newActividadTemplate!: TemplateRef<any>;
  @ViewChild('actividadDetalleTemplate', { static: true }) actividadDetalleTemplate!: TemplateRef<any>;

  constructor(
    private actividadesService: ActividadesService,
    private modalService: ModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    this.actividadesService.getActividades().subscribe(
      (data) => {
        this.actividades = data.map((actividad: any) => ({
          ...actividad,
          imagenes: this.parseImagenes(actividad.imagenes) // Parseamos las imágenes
        }));
      },
      (error) => console.error('Error al cargar actividades:', error)
    );
  }

  // Sanitiza una URL para usarla en el src de una imagen
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // Parsea el campo "imagenes" y lo convierte en un array de strings
  parseImagenes(imagenes: any): string[] {
    if (Array.isArray(imagenes)) {
      return imagenes;
    } else if (typeof imagenes === 'string') {
      try {
        return JSON.parse(imagenes); // Intenta parsear como JSON
      } catch (e) {
        return imagenes.split(',').map((img: string) => img.trim()); // Separa por comas si falla el parseo
      }
    }
    return [];
  }

  openActividadModal(): void {
    this.modalService.component = this.newActividadTemplate;
    this.modalService.openModal();
  }

  closeActividadModal(): void {
    this.modalService.closeModal();
  }

  verDetallesActividad(actividad: Actividad): void {
    this.actividadSeleccionada = actividad;
    this.modalService.component = this.actividadDetalleTemplate;
    this.modalService.openModal();
  }
  
  // Método para manejar la selección de archivos de imágenes
  onFileSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);

    if (!this.actividadSeleccionada.imagenes) {
      this.actividadSeleccionada.imagenes = [];
    }

    // Convertir cada archivo seleccionado a base64 y almacenarlo como string
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.actividadSeleccionada.imagenes.push(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}
