import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActividadesService } from './actividades.service';
import { Actividad } from './actividad.model';
import { CommonModule } from '@angular/common';
import { ActividadDetallesTemplateComponent } from "./actividad-detalles-template/actividad-detalles-template.component";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NewActividadComponent } from "./new-actividad/new-actividad.component";
import { ModalService } from '../modal/modal.service';
import { ParqueService } from '../parques/parques-services.service'; // Importa el servicio de parques
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  imports: [CommonModule, ActividadDetallesTemplateComponent, NewActividadComponent,FormsModule]
})
export class ActividadesComponent implements OnInit {
  actividades: Actividad[] = [];
  parques: any[] = []; // Lista de parques
  parqueSeleccionado: number | null = null; // ID del parque seleccionado
  actividadSeleccionada: Actividad | null = null;


  @ViewChild('newActividad', { static: true }) newActividadTemplate!: TemplateRef<any>;
  @ViewChild('actividadDetalleTemplate', { static: true }) actividadDetalleTemplate!: TemplateRef<any>;

  constructor(
    private actividadesService: ActividadesService,
    private parqueService: ParqueService,
    private modalService: ModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cargarParques();
    this.cargarActividades();
  }

  cargarParques(): void {
    this.parqueService.getParques().subscribe(
      (data) => {
        this.parques = data;
      },
      (error) => console.error('Error al cargar parques:', error)
    );
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

  // Método para cargar actividades filtradas por parque
  cargarActividadesFiltradas(parqueId: number | null): void {
    this.actividadesService.getActividadesFiltradas(parqueId).subscribe(
      (data) => {
        this.actividades = data.map((actividad: any) => ({
          ...actividad,
          imagenes: this.parseImagenes(actividad.imagenes) // Parseamos las imágenes
        }));
      },
      (error) => console.error('Error al cargar actividades:', error)
    );
  }

  // Método para manejar el cambio de parque en el filtro
  onParqueChange(): void {
    this.cargarActividadesFiltradas(this.parqueSeleccionado);
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

  // Método para abrir el modal
  openNewActividadModal(): void {
    this.modalService.component = this.newActividadTemplate;
    this.modalService.openModal();
  }

  // Si deseas cerrar el modal desde el componente padre, lo puedes hacer aquí
  closeNewActividadModal(): void {
    this.modalService.closeModal();
  }

  verDetallesActividad(actividad: Actividad): void {
    this.actividadSeleccionada = actividad;
  }
  
  closeActividadModal(): void {
    this.actividadSeleccionada = null;
  }
  cerrarModalDesdePadre(): void {
    this.modalService.closeModal(); // cierra el modal
    
    this.cargarActividades(); // recarga la lista
  }
  
}
