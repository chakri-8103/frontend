import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/core/services/topic.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
})
export class NotifyComponent implements OnInit {
  sendTopic = '';
  title = '';
  body = '';
  topics: any[] = [];
  notifications: any[] = [];
  sendLoading = false; // <-- loading flag

  constructor(private topicService: TopicService) {}

  ngOnInit() {
    // this.loadNotifications();
    this.gettopics();
  }

  sendNotification() {
    if (!this.sendTopic || !this.title || !this.body) {
      alert('Please fill all fields.');
      return;
    }

    this.sendLoading = true;

    this.topicService
      .sendNotification(this.sendTopic, this.title, this.body)
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.sendTopic = '';
          this.title = '';
          this.body = '';
          this.loadNotifications();
          this.gettopics();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to send notification.');
        },
        complete: () => {
          this.sendLoading = false;
        },
      });
  }

  loadNotifications() {
    this.topicService.getNotifications(this.sendTopic).subscribe((res) => {
      if (res.success) {
        this.notifications = res.notifications;
      }
    });
  }

  gettopics() {
    this.topicService.getTopics().subscribe((res) => {
      if (res.success && res.topics.length > 0) {
        this.topics = res.topics;
        console.log('Available topics:', res.topics);
      }
    });
  }
}
