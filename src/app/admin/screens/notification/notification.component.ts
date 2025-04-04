import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.requestPermission();
    this.notificationService.messages$.subscribe((message) => {
      if (message) this.showNotification(message);
    });
  }

  requestPermission() {
    if (Notification.permission === 'granted') {
      console.log('✅ [SUCCESS] Notification permission already granted.');
      return;
    }

    if (Notification.permission === 'default') {
      console.log('🔘 [INFO] Asking user for notification permission...');
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('✅ [SUCCESS] Permission granted.');
        } else {
          console.warn('❌ [WARNING] Notification permission denied.');
          alert('To receive notifications, please enable them in browser settings.');
        }
      });
    } else {
      console.warn('❌ [WARNING] Notifications are blocked!');
      alert('You have blocked notifications. Enable them manually.');
    }
  }

  showNotification(message: string) {
    if (Notification.permission !== 'granted') {
      console.warn('❌ [WARNING] Notification permission denied.');
      return;
    }

    console.log('🔔 [NOTIFICATION] Showing Windows Notification...');
    new Notification('📢 Alert!' , {
      body: message,
      // icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Notification-icon.png',
      silent: false,
    });
  }

  startNotifications() {
    console.log('🔘 [INFO] Start button clicked');
    this.notificationService.sendMessage('start');
  }
}
