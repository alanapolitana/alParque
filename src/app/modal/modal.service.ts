import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public showModal$: Observable<boolean> = this.showModalSubject.asObservable();
  public component: TemplateRef<any> | null = null;
  public data: any;
  constructor() {}

  public openModal(): void {
    this.showModalSubject.next(true);
  }

  public closeModal(): void {
    this.showModalSubject.next(false);
    this.component = null;
  }
}
