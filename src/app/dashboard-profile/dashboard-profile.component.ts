/* import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/auth/login.service';
import { Router } from '@angular/router';
import { User } from '../services/user/user';
import { UserService } from '../services/user/user.service';
import { ModalService } from '../modal/modal.service';
import { ProfileComponent } from './profile-template/profile-template.component';
import { ImcTemplateComponent } from "./imc-template/imc-template.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-profile',
  imports: [CommonModule, ProfileComponent, ImcTemplateComponent],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: './dashboard-profile.component.css'
})
export class DashboardProfileComponent implements OnInit {
  dashboardData: any[] = [];
  isAuthenticated: boolean = false;
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    phone: 0,
    password: '',
    confirmPassword: '',
  };

  @ViewChild('profile') profileTemplate!: TemplateRef<any>;
  @ViewChild('imc') imcTemplate!: TemplateRef<any>;
  private userSubscription!: Subscription;

  constructor(private loginService: LoginService, private router: Router, private userService: UserService, private modalService: ModalService) {}

  ngOnInit(): void {
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
}
 */

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


@Component({
  selector: 'app-dashboard-profile',
  imports: [CommonModule, ProfileComponent, ImcTemplateComponent],
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    phone: 0,
    password: '',
    confirmPassword: '',
    image: ''
  };
  defaultImage = '../../assets/default-profile.png';
  
  @ViewChild('fileInput') fileInput!: any;
  @ViewChild('profile') profileTemplate!: TemplateRef<any>;
  @ViewChild('imc') imcTemplate!: TemplateRef<any>;
  private userSubscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private modalService: ModalService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
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

  /* onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      this.http.patch<User>('http://127.0.0.1:8000/api/user/', formData, {
        headers: { 'Authorization': `Bearer ${this.loginService.userToken}` }
      }).subscribe(updatedUser => {
        this.user.image = updatedUser.image;
      });
    }
  } */
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
    
        this.http.patch<User>('http://127.0.0.1:8000/api/user/', formData, {
          headers: {
            Authorization: `Bearer ${this.loginService.userToken}`
          }
        }).subscribe({
          next: (updatedUser) => {
            this.user.image = updatedUser.image;
            console.log("Imagen actualizada correctamente.");
          },
          error: (err) => {
            console.error("Error al subir la imagen:", err.error);
          }
        });
      }
    }
    
  
}
