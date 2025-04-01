/* import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.startAdRotation('footer');
  }

  startAdRotation(containerId: string): void {
    const ads: NodeListOf<HTMLElement> = document.querySelectorAll(`#${containerId} .ad`);
    let currentAd = 0;

    function showAd() {
      ads.forEach(ad => ad.style.display = "none");
      ads[currentAd].style.display = "flex";
      currentAd = (currentAd + 1) % ads.length;
    }

    showAd();
    setInterval(showAd, 5000); // Cambia la publicidad cada 5 segundos
  }
}
 */
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAdRotation('footer');
    }
  }

  startAdRotation(containerId: string): void {
    const ads: NodeListOf<HTMLElement> = document.querySelectorAll(`#${containerId} .ad`);
    let currentAd = 0;

    function showAd() {
      ads.forEach(ad => ad.style.display = "none");
      ads[currentAd].style.display = "flex";
      currentAd = (currentAd + 1) % ads.length;
    }

    showAd();
    setInterval(showAd, 5000); // Cambia la publicidad cada 5 segundos
  }
}
