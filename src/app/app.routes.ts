import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './dashboard-profile/profile-template/profile-template.component';
import { ParquesComponent } from './parques/parques.component';
import { ActividadesComponent } from './actividades/actividades.component';
export const routes: Routes = [

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'modal', component: ModalComponent },

  {
    path: 'dashboard-profile',
    component: DashboardProfileComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        title: 'PERFIL',
        parent: '',
        path: 'dashboard-profile',
      },
    },
  },
  {
    path: 'app-profile-template',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        title: 'PERFIL-edith',
        parent: '',
        path: 'app-profile-template',
      },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    /*      canActivate: [AuthGuard], */
    data: {
      breadcrumb: {
        title: 'LOGIN',
        parent: '',
        path: 'login',
      },
    },
  },
  {
    path: 'registro', // Ruta para el registro
    component: RegistroComponent, // Componente de registro
    data: {
      breadcrumb: {
        title: 'REGISTRO',
        parent: '',
        path: 'registro',
      },
    },
  },
  {
    path: 'actividades',
    component: ActividadesComponent,
    data: {
      breadcrumb: {
        title: 'ACTIVIDADES',
        parent: '',
        path: 'actividades',
      },
    },
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      breadcrumb: {
        title: 'QUIENES SOMOS',
        parent: '',
        path: 'about-us',
      },
    },
  },
  {
    path: 'parques',
    component: ParquesComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        title: 'PARQUES',
        parent: '',
        path: 'parques',
      },
    },
  },
];
