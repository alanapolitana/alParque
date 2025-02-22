import { Component, Input } from '@angular/core';
import { Actividad } from '../actividad.model';  // Importa el modelo de Actividad
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-detalles-template',
  templateUrl: './actividad-detalles-template.component.html',
  styleUrls: ['./actividad-detalles-template.component.css'],
  imports:[CommonModule]
})
export class ActividadDetallesTemplateComponent {
 // @Input() actividadSeleccionada!: Actividad;   Recibe la actividad seleccionada desde el componente padre
  @Input() actividadSeleccionada: Actividad | null = null;

  constructor() { }
  registrarActividad(): void {
    console.log('Registrado en la actividad:', this.actividadSeleccionada?.nombre);
    // Aquí puedes agregar lógica para registrar a un usuario en la actividad, por ejemplo:
    // this.actividadService.registrar(actividadId);
  }
  
  // Método para cerrar el modal
  closeModal(): void {
    this.actividadSeleccionada = null;
  }
}
