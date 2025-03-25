import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-aside-publicitario',
  templateUrl: './aside-publicitario.component.html',
  styleUrls: ['./aside-publicitario.component.css']
})
export class AsidePublicitarioComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.startAdRotation('aside');
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

