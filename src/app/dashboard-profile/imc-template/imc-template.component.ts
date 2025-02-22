/* import { Component, OnInit } from '@angular/core';
import { ImcService } from './imc.sercives';
import { NotificationService } from '../../services/general/notification.service';
import { ModalService } from '../../modal/modal.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imc-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './imc-template.component.html',
  styleUrls: ['./imc-template.component.css'],
})
export class ImcTemplateComponent implements OnInit {
  imcList: any[] = [];
  explicacionIMC: string = '';
  nuevoIMC = {
    user: 0,
    peso: 0,
    altura: 0,
    imc: 0,
  };
  mensajeIMC: string = ''; // Corregido para ser una propiedad
  

  constructor(
    private imcService: ImcService,
    private modalService: ModalService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();
    if (userId) {
      const userIdNumber = Number(userId);
      if (!isNaN(userIdNumber)) {
        this.userService.getUser(userIdNumber).subscribe({
          next: (usuario) => {
            if (usuario) {
              this.nuevoIMC.user = usuario.id;
            } else {
              this.notificationService.showNotificationError('Usuario no encontrado.');
            }
          },
          error: () => {
            this.notificationService.showNotificationError('Error al obtener los datos del usuario.');
          },
        });
      } else {
        this.notificationService.showNotificationError('El ID de usuario no es válido.');
      }
    } else {
      this.notificationService.showNotificationError('Debe estar autenticado para registrar su IMC.');
    }
  }

  get notification() {
    return this.notificationService;
  }

  getUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('userId');
  }

  saveIMC(): void {
    if (this.nuevoIMC.user === 0) {
      this.notificationService.showNotificationError('El ID de usuario no es válido.');
      return;
    }

    const data = {
      user: this.nuevoIMC.user,
      peso: this.nuevoIMC.peso.toString(),
      altura: this.nuevoIMC.altura.toString(),
      imc: this.nuevoIMC.imc.toString(),
    };

    this.imcService.saveIMC(data).subscribe({
      next: () => {
        this.notificationService.showNotificationSuccess('IMC guardado con éxito.');
        this.nuevoIMC = { user: this.nuevoIMC.user, peso: 0, altura: 0, imc: 0 };
      },
      error: () => {
        this.notificationService.showNotificationError('Error al guardar el IMC.');
      },
    });
  }

  calcularIMC(peso: number, altura: number): void {
    if (peso > 0 && altura > 0) {
      this.nuevoIMC.imc = peso / (altura * altura);
      this.mensajeIMC = this.getIMCMessage(this.nuevoIMC.imc); // Actualizamos el mensaje basado en el IMC calculado
    } else {
      this.nuevoIMC.imc = 0;
      this.notificationService.showNotificationError('Por favor, ingresa valores válidos para peso y altura.');
    }
  }

  getIMCMessage(imc: number): string {
    if (imc < 18.5) {
      return 'Bajo peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else {
      return 'Obesidad';
    }
  }

  exportarIMC(): void {
    this.imcService.exportarIMC().subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'imc_data.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.showNotificationSuccess('Datos de IMC exportados con éxito.');
      },
      error: () => {
        this.notificationService.showNotificationError('Error al exportar los datos de IMC.');
      },
    });
  }

  verGraficaIMC(): void {
    this.imcService.verGraficaIMC().subscribe({
      next: (imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        const imgElement = document.getElementById('grafica-imc') as HTMLImageElement;
        imgElement.src = imageUrl;
      },
      error: () => {
        this.notificationService.showNotificationError('Error al obtener la gráfica de IMC.');
      },
    });
  }

  onCancel(): void {
    this.modalService.closeModal();
  }
}
 */
import { Component, OnInit } from '@angular/core';
import { ImcService } from './imc.sercives';
import { NotificationService } from '../../services/general/notification.service';
import { ModalService } from '../../modal/modal.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imc-template',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './imc-template.component.html',
  styleUrls: ['./imc-template.component.css'],
})
export class ImcTemplateComponent implements OnInit {
  imcList: any[] = [];
  explicacionIMC: string = '';
  nuevoIMC = {
    user: 0,
    peso: 0,
    altura: 0,
    imc: 0,
  };
  mensajeIMC: string = ''; // Corregido para ser una propiedad


  // Array para almacenar mensajes
  notificationMessages: { message: string, type: string }[] = [];

  constructor(
    private imcService: ImcService,
    private modalService: ModalService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();
    if (userId) {
      const userIdNumber = Number(userId);
      if (!isNaN(userIdNumber)) {
        this.userService.getUser(userIdNumber).subscribe({
          next: (usuario) => {
            if (usuario) {
              this.nuevoIMC.user = usuario.id;
            } else {
              this.showNotificationError('Usuario no encontrado.');
            }
          },
          error: () => {
            this.showNotificationError('Error al obtener los datos del usuario.');
          },
        });
      } else {
        this.showNotificationError('El ID de usuario no es válido.');
      }
    } else {
      this.showNotificationError('Debe estar autenticado para registrar su IMC.');
    }
  }

  getUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('userId');
  }

  saveIMC(): void {
    if (this.nuevoIMC.user === 0) {
      this.showNotificationError('El ID de usuario no es válido.');
      return;
    }

    const data = {
      user: this.nuevoIMC.user,
      peso: this.nuevoIMC.peso.toString(),
      altura: this.nuevoIMC.altura.toString(),
      imc: this.nuevoIMC.imc.toString(),
    };

    this.imcService.saveIMC(data).subscribe({
      next: () => {
        this.showNotificationSuccess('IMC guardado con éxito.');
        this.nuevoIMC = { user: this.nuevoIMC.user, peso: 0, altura: 0, imc: 0 };
      },
      error: () => {
        this.showNotificationError('Error al guardar el IMC.');
      },
    });
  }

  calcularIMC(peso: number, altura: number): void {
    if (peso > 0 && altura > 0) {
      this.nuevoIMC.imc = peso / (altura * altura);
    } else {
      this.nuevoIMC.imc = 0;
      this.showNotificationError('Por favor, ingresa valores válidos para peso y altura.');
    }
  }

  showNotificationSuccess(message: string) {
    this.notificationMessages.push({ message, type: 'success' });
  }

  showNotificationError(message: string) {
    this.notificationMessages.push({ message, type: 'error' });
  }

  clearNotification(notification: any) {
    this.notificationMessages = this.notificationMessages.filter(n => n !== notification);
  }
  getIMCMessage(imc: number): string {
    if (imc < 18.5) {
      return 'Bajo peso';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Sobrepeso';
    } else {
      return 'Obesidad';
    }
  }
  exportarIMC(): void {
    this.imcService.exportarIMC().subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'imc_data.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
        this.notificationService.showNotificationSuccess('Datos de IMC exportados con éxito.');
      },
      error: () => {
        this.notificationService.showNotificationError('Error al exportar los datos de IMC.');
      },
    });
  }

  verGraficaIMC(): void {
    this.imcService.verGraficaIMC().subscribe({
      next: (imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        const imgElement = document.getElementById('grafica-imc') as HTMLImageElement;
        imgElement.src = imageUrl;
      },
      error: () => {
        this.notificationService.showNotificationError('Error al obtener la gráfica de IMC.');
      },
    });
  }

  onCancel(): void {
    this.modalService.closeModal();
  }
}
