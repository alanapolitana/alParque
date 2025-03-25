import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Actividad } from '../actividad.model';  
import { CommonModule } from '@angular/common';
import { ActividadesService } from '../actividades.service';
import { ActividadUsuarioService } from '../actividadUsuario.service';
import { ParqueService } from '../../parques/parques-services.service';
@Component({
  selector: 'app-actividad-detalles-template',
  templateUrl: './actividad-detalles-template.component.html',
  styleUrls: ['./actividad-detalles-template.component.css'],
  imports: [CommonModule]
})
export class ActividadDetallesTemplateComponent {
  @Input() actividadSeleccionada: Actividad | null = null;
  @Output() cerrarModal = new EventEmitter<void>(); // Evento para cerrar el modal desde el padre
  parque: any = null;
  constructor(private actividadService: ActividadesService, private parqueService: ParqueService, private actividadUsuarioService: ActividadUsuarioService) { }
  
  ngOnInit(): void {
    // Verificar si la actividad seleccionada tiene un parque
    if (this.actividadSeleccionada && this.actividadSeleccionada.parque) {
      this.getParque(this.actividadSeleccionada.parque);
    }
  }
  registrarActividad(): void {
    if (!this.actividadSeleccionada || !this.actividadSeleccionada.id) {
      console.error("La actividad seleccionada no tiene un ID válido.");
      return;
    }
  
    this.actividadUsuarioService.createActividadUsuario({ actividad: this.actividadSeleccionada.id })

      .subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert(`Te has registrado en la actividad: ${this.actividadSeleccionada?.nombre}`);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al registrar actividad:', error);
          alert('lalala');
        }
      });
  }
  
  
// Función para obtener el parque desde el servicio
getParque(parqueId: number): void {
  this.parqueService.getParque(parqueId).subscribe({
    next: (parque) => {
      this.parque = parque;  // Asignar el parque obtenido a la variable `parque`
    },
    error: (error) => {
      console.error('Error al obtener el parque:', error);
      alert('Hubo un error al obtener los detalles del parque.');
    }
  });
}

  closeModal(): void {
    this.cerrarModal.emit(); // Notificar al padre que debe cerrar el modal
  }
}
