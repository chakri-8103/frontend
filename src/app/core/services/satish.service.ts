// src/app/services/fcm.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class satishService {
  logMessages: string[] = [];

  firebaseConfig = {
    apiKey: "AIzaSyDNn6mTQSSziK0euwazJYp7vQPZoT3ZEPo",
    authDomain: "callwebview-61c3a.firebaseapp.com",
    projectId: "callwebview-61c3a",
    messagingSenderId: "440935657909",
    appId: "1:440935657909:web:86f4e12e35802f8d91a9fc"
  };

  app = initializeApp(this.firebaseConfig);
  messaging = getMessaging(this.app);

  constructor(private http: HttpClient) { }

  private log(msg: string) {
    console.log(msg);
    this.logMessages.push(msg);
  }

  async subscribeToNotifications(suc: string, student: string, campus: string, course: string) {
    try {
      this.log(`📌 Input Data -> SUC: ${suc}, Student: ${student}, Campus: ${campus}, Course: ${course}`);

      const permission = await Notification.requestPermission();
      this.log(`🔔 Notification permission: ${permission}`);
      if (permission !== 'granted') return;

      const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
      console.log("✅ Service Worker registered:", registration);

      // Wait until it's active
      await navigator.serviceWorker.ready;
      console.log("✅ Service Worker ready");

      const token = await getToken(this.messaging, {
        vapidKey: 'BEBSBvKWLGx6At08ltRQ9Q-r2dNG7xUHIXQLOZMT-8va2QlL02yTBxmahf58Dgu3x0_uIbinrS2PS7Zes8yzZS4',
        serviceWorkerRegistration: registration
      });

      console.log("📡 Retrieved FCM Token:", token);


      const payload = {
        token,
        topics: [suc, campus, course],
        suc,
        student_name: student,
        campus_name: campus,
        course_name: course
      };

      this.log("📤 Sending subscription to server...");
      const res = await this.http.post('http://localhost:8000/subscribe', payload, { responseType: 'text' }).toPromise();
      this.log("✅ Server response: " + res);

      // Foreground messages
      onMessage(this.messaging, (payload) => {
        this.log("💬 Foreground message received: " + JSON.stringify(payload));
      });

    } catch (err: any) {
      this.log("❌ Error: " + err.message);
    }
  }
}
