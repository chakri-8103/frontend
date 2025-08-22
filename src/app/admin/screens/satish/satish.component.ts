import { Component, OnInit } from '@angular/core';
import { satishService } from 'src/app/core/services/satish.service';

@Component({
  selector: 'app-satish',
  templateUrl: './satish.component.html'
})
export class SatishComponent implements OnInit {
  suc = '';
  student = '';
  campus = '';
  course = '';

  subscribedList: any[] = []; // Store all subscriptions

  constructor(public fcm: satishService) {}

  ngOnInit() {
    const storedData = localStorage.getItem('subscribedList');
    if (storedData) {
      this.subscribedList = JSON.parse(storedData);
    }
  }

  subscribe() {
    const newEntry = {
      suc: this.suc,
      student: this.student,
      campus: this.campus,
      course: this.course,
      date: new Date().toLocaleString()
    };

    // Send to server
    this.fcm.subscribeToNotifications(this.suc, this.student, this.campus, this.course);

    // Save to list
    this.subscribedList.push(newEntry);

    // Save to localStorage
    localStorage.setItem('subscribedList', JSON.stringify(this.subscribedList));

    // Clear form
    this.suc = '';
    this.student = '';
    this.campus = '';
    this.course = '';
  }
}
