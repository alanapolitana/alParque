import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from './modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
   imports: [CommonModule,],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input()
  template!: TemplateRef<any> | null;
  showModal: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.showModal$.subscribe((show) => {
      this.showModal = show;
      this.template = this.modalService.component;
    });
  }

  close() {
    this.modalService.closeModal();
  }
}
