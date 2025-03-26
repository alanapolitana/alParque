import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/auth/login.service';
import { Router } from '@angular/router';
import { User } from '../services/user/user';
import { UserService } from '../services/user/user.service';
import { ModalService } from '../modal/modal.service';
import { ProfileComponent } from './profile-template/profile-template.component';
import { ImcTemplateComponent } from "./imc-template/imc-template.component";
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActividadUsuario } from '../actividades/actividadUsuario.model';
import { ActividadUsuarioService } from '../actividades/actividadUsuario.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard-profile',
  imports: [CommonModule, ProfileComponent, ImcTemplateComponent,RouterModule],
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
  isAuthenticated: boolean = false;
  actividades: any[] = []; 
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    phone: 0,
    password: '',
    confirmPassword: '',
    image: ''
  };
  @ViewChild('fileInput') fileInput!: any;
  @ViewChild('profile') profileTemplate!: TemplateRef<any>;
  @ViewChild('imc') imcTemplate!: TemplateRef<any>;
  private userSubscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private modalService: ModalService,
    private http: HttpClient,
    private actividadUsuarioService: ActividadUsuarioService,


  ) {}

  ngOnInit(): void {
    this.cargarActividades();
    this.userSubscription = this.userService.getUserObservable().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });

    this.userService.getUser(1).subscribe();

    this.loginService.userLogin.subscribe((isAuthenticated) => {
      this.isAuthenticated = this.isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.loginService.methodlogout();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  goToProfile(): void {
    this.modalService.component = this.profileTemplate;
    this.modalService.openModal();
  }

  openIMCModal(): void {
    this.modalService.component = this.imcTemplate;
    this.modalService.openModal();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        console.log('Archivo seleccionado:', file);
        const formData = new FormData();
        formData.append('image', file);

        this.http.patch<User>('https://al-parque.vercel.app/api/user/', formData, {
            headers: {
                Authorization: `Bearer ${this.loginService.userToken}`
            }
        }).subscribe({
            next: (updatedUser) => {
                console.log("Imagen actualizada correctamente:", updatedUser.image);
                this.user.image = updatedUser.image;
            },
            error: (err) => {
                console.error("Error al subir la imagen:", err);
                if (err.status === 401) {
                    console.error("No autorizado: el token puede estar vencido.");
                }
                if (err.status === 400) {
                    console.error("Error en los datos: revisa si el archivo es válido.");
                }
            }
        });
    }
}
cargarActividades(): void {
  this.actividadUsuarioService.getActividadesUsuarios().subscribe({
    next: (actividades) => {
      this.actividades = actividades; 
      console.log('Actividades cargadas:', actividades);
    },
    error: (err) => {
      console.error("Error al obtener actividades:", err);
    }
  });
}
}