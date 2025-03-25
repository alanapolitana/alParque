import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ModalComponent } from "./modal/modal.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { AsidePublicitarioComponent } from './shared/aside-publicitario/aside-publicitario.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ModalComponent, FooterComponent,/*  AsidePublicitarioComponent */],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Perfiles';
}
