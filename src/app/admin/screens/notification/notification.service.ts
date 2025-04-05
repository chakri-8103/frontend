import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private ws!: WebSocket;
  private serverUrl = 'ws://10.70.9.157:8080'; // Change to wss:// for HTTPS
  private messagesSubject = new BehaviorSubject<string>('');
  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    console.log('🔵 [INFO] Connecting to WebSocket Server...');
    this.ws = new WebSocket(this.serverUrl);

    this.ws.onopen = () => console.log('✅ [SUCCESS] WebSocket Connected!');

    this.ws.onerror = (error) => console.error('❌ [ERROR] WebSocket Error:', error);

    this.ws.onclose = () => {
      console.warn('⚠️ [WARNING] WebSocket Disconnected! Reconnecting...');
      setTimeout(() => this.connectWebSocket(), 3000);
    };

    this.ws.onmessage = (event) => {
      console.log('📥 [MESSAGE] From Server:', event.data);
      this.messagesSubject.next(event.data);
    };
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log(`✅ [SUCCESS] Sending message: ${message}`);
      this.ws.send(message);
    } else {
      console.warn('⚠️ [WARNING] WebSocket not connected!');
    }
  }
}
