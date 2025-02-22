import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-home',
  imports: [ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  counter: number = 0;
  operacion: number = 0;
  interval: any;
  sliderSections: HTMLElement[] = [];

  constructor() { }

  ngOnInit(): void {
  /*   this.interval = setInterval(() => {
      this.moveToRight();
    }, 3000); */
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }/* 

  moveToLeft(): void {
    this.counter--;
    if (this.counter < 0) {
      this.counter = this.sliderSections.length - 1;
      this.operacion = this.getSectionWidth() * (this.sliderSections.length - 1);
    } else {
      this.operacion -= this.getSectionWidth();
    }
    this.updateSlider();
  } 

  moveToRight(): void {
    if (this.counter >= this.sliderSections.length - 1) {
      this.counter = 0;
      this.operacion = 0;
    } else {
      this.counter++;
      this.operacion += this.getSectionWidth();
    }
    this.updateSlider();
  } */
/* 
  updateSlider(): void {
    const slider = document.querySelector('#slider') as HTMLElement;
    slider.style.transform = `translate(-${this.operacion}%)`;
    slider.style.transition = 'all ease .6s';
  } */

  getTotalSections(): number {
    return this.sliderSections.length;
  }

  getSectionWidth(): number {
    return 100 / this.getTotalSections();
  }
}
