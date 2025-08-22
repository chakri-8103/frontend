import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  meetingAgenda: string = '';
  institute: string = '';
  startDateTime: string = '';
  duration: string = '';
  virtualGroupName: string = '';
  virtualGroups: string[] = [];

  onGroupBlur() {
    this.addVirtualGroup();
  }

  onGroupEnter(event: any) {
    event.preventDefault();
    this.addVirtualGroup();
  }

  private addVirtualGroup() {
    const name = this.virtualGroupName.trim();
    if (name && !this.virtualGroups.includes(name)) {
      this.virtualGroups.push(name);
    }
    this.virtualGroupName = '';
  }

  onSubmit(): void {
    console.log('Form submitted');
    console.log('Meeting Agenda:', this.meetingAgenda);
    console.log('Institute:', this.institute);
    console.log('Start Date & Time:', this.startDateTime);
    console.log('Duration:', this.duration);
    console.log('Virtual Groups:', this.virtualGroups);
  }
}
