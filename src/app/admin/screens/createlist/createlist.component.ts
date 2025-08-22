import { Component, OnInit } from '@angular/core';

import { TopicService } from 'src/app/core/services/topic.service';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
})
export class CreatelistComponent implements OnInit {
  topicName = '';
  description = '';
  topics: any[] = [];

  constructor(private topicService: TopicService) {}

  ngOnInit() {
    this.loadTopics();
  }

  createTopic() {
    this.topicService.createTopic(this.topicName, this.description).subscribe(res => {
      alert(res.message);
      this.loadTopics();
      this.topicName = '';
      this.description = '';
    });
  }

  loadTopics() {
    this.topicService.getTopics().subscribe(res => {
      this.topics = res.topics || [];
    });
  }

  deleteTopic(topic: string) {
    this.topicService.deleteTopic(topic).subscribe(res => {
      alert(res.message);
      this.loadTopics();
    });
  }
}
