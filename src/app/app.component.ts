import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { ModalComponent } from "./modal/modal.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Perfiles';
}
