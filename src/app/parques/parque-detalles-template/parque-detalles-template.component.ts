import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Parque } from '../parque.model';
import { ModalService } from '../../modal/modal.service';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-parque-detalles-template',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './parque-detalles-template.component.html',
  styleUrl: './parque-detalles-template.component.css'
})
export class ParqueDetallesTemplateComponent {
  
  @Input() parqueSeleccionado!: Parque;  

/*   @Input() parque!: Parque;
 */  @Output() cerrarModal = new EventEmitter<void>();

  constructor(private modalService: ModalService) {}
  ngOnInit() {
    console.log('Parque seleccionado:', this.parqueSeleccionado);
  }
  
  cerrar(): void {
    this.modalService.closeModal();
  }
}
