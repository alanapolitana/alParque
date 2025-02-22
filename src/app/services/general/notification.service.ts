import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnInit{
  constructor(public api: ApiService) {}

  ngOnInit(): void {
      setTimeout(() => {
        this.clearMessages();
      }, 5000);  
  }

  public notifications: string[] = [];
  public type: string = '';

  public showMessage(messages: string[], type: string) {
    this.notifications.push(...messages);
    this.type = type;
  }

  public clearMessages() {
    this.notifications = [];
    this.type = '';
  }

  showNotificationError(message: string) {
    this.showMessage([message], 'error');

    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }

  showNotificationSuccess(message: string) {
    this.showMessage([message], 'success');

    setTimeout(() => {
      this.clearMessages();
    }, 5000);
  }
}
