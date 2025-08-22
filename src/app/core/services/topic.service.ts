import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TopicService {
  // private apiBase= 'http://10.70.9.29:3000'; //mobile App
  private apiBase= 'http://10.70.9.29:4000'; // website App
  // private apiBase = 'https://c54cde006c15.ngrok-free.app '; // ngrok URL for testing


  constructor(private http: HttpClient) {}

  createTopic(topic: string, description: string) {
    return this.http.post<any>(`${this.apiBase}/create-topic`, { topic, description });
  }

  getTopics() {
    return this.http.get<any>(`${this.apiBase}/topics`);
  }

  deleteTopic(topic: string) {
    return this.http.delete<any>(`${this.apiBase}/delete-topic/${topic}`);
  }

  sendNotification(topic: string, title: string, body: string) {
    return this.http.post<any>(`${this.apiBase}/send-to-topic`, { topic, title, body });
  }
  getNotifications(topic: string) {
    return this.http.get<any>(`${this.apiBase}/notifications/${topic}`);
  }
  
} 
