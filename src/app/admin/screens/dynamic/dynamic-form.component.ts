import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup = new FormGroup({});  // ✅ Initialize with an empty FormGroup
  formData: any = {};
  formKeys: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loadFormData();
  }

  loadFormData() {
    this.http.get<any>('assets/form-data.json').subscribe(data => {
      this.formData = data;
      this.formKeys = Object.keys(this.formData);
      this.createForm();
    });
  }

  createForm() {
    let group: any = {};
    this.formKeys.forEach(field => {
      if (this.formData[field] !== "submit") {
        group[field] = new FormControl('');
      }
    });
    this.dynamicForm = new FormGroup(group); // ✅ Reassign after form controls are created
  }

  onSubmit() {
    console.log("Form Data:", this.dynamicForm.value);
  }
}
