import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NewParqueComponent } from './new-parque/new-parque.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal/modal.service';
import { Router } from '@angular/router';
import { ParqueService } from './parques-services.service';
import { Parque } from './parque.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ParqueDetallesTemplateComponent } from './parque-detalles-template/parque-detalles-template.component';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css'],
  imports: [NewParqueComponent, CommonModule, ParqueDetallesTemplateComponent]
})
export class ParquesComponent implements OnInit {
  parqueSeleccionado!: Parque;
  parqueDetail: any = {};
  parqueData: any = { nombre: '', ubicacion: '' }; // Datos de ejemplo para actualizar/parque
  parques: Parque[] = [];

  @ViewChild('newParque', { static: true }) newParqueTemplate!: TemplateRef<any>;
  @ViewChild('parqueDetalleTemplate', { static: true }) parqueDetalleTemplate!: TemplateRef<any>;

  constructor(
    private parqueService: ParqueService,
    private router: Router,
    private modalService: ModalService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getParques();
  }



  getParques(): void {
    this.parqueService.getParques().subscribe(
      (data) => {
        this.parques = data.map((parque: any) => ({
          ...parque,
          imagenes: this.parseImagenes(parque.imagenes)
        }));
        console.log('Parques procesados:', this.parques);
      },
      (error) => {
        console.error('Hubo un error al obtener los parques:', error);
      }
    );
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  parseImagenes(imagenes: any): string[] {
    if (Array.isArray(imagenes)) {
      return imagenes;
    } else if (typeof imagenes === 'string') {
      return imagenes.split(',').map((img: string) => img.trim());
    }
    return [];
  }
  

  // Obtiene un parque en particular por ID
  getParque(id: number): void {
    this.parqueService.getParque(id).subscribe(
      (data) => {
        this.parqueDetail = data;
        console.log('Detalle del parque:', this.parqueDetail);
      },
      (error) => {
        console.error('Hubo un error al obtener el parque:', error);
      }
    );
  }
  openModal(): void {
    this.modalService.component = this.newParqueTemplate;
    this.modalService.openModal();
  }


  // Cierra el modal
  closeModal(): void {
    this.modalService.closeModal();
  }
  // Abre el modal con los detalles de un parque
 /*  verDetalles(parque: Parque): void {
    this.parqueSeleccionado = parque;
    this.modalService.component = this.parqueDetalleTemplate;
    this.modalService.openModal();
  } */
    verDetalles(parque: Parque): void {
      this.parqueSeleccionado = parque;
      console.log("parqueSeleccionado en verDetalles:", this.parqueSeleccionado); // Verifica si los datos llegan aquí
      this.modalService.component = this.parqueDetalleTemplate;
      this.modalService.openModal();
    }
    

  // Actualiza un parque y refresca la lista
  updateParque(id: number): void {
    this.parqueService.updateParque(id, this.parqueData).subscribe(
      (data) => {
        console.log('Parque actualizado:', data);
        this.getParques(); // Refrescar lista de parques
      },
      (error) => {
        console.error('Hubo un error al actualizar el parque:', error);
      }
    );
  }


}
