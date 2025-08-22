import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  aadhaarForm: FormGroup;
  hasAadhaarData: boolean = false; // track if session storage has data

  constructor(private fb: FormBuilder) {
    this.aadhaarForm = this.fb.group({
      name: [''],
      aadhaar: [''],
      dob: [''],
      gender: [''],
      mobile: [''],
      address: [''],
    });
  }

  ngOnInit() {
    const dataStr = sessionStorage.getItem('aadhaarData');
    this.hasAadhaarData = !!dataStr; // true if session storage has data
    if (this.hasAadhaarData) {
      this.autoFillFromSession();
    }
  }

  autoFillFromSession() {
    const dataStr = sessionStorage.getItem('aadhaarData');
    if (dataStr) {
      const data = JSON.parse(dataStr);
      this.aadhaarForm.patchValue({
        name: data.name || '',
        aadhaar: data.aadhaar_number || '',
        dob: data.dob || '',
        gender: data.gender || '',
        mobile: data.mobile_number || '',
        address: data.address || '',
      });
    }
  }

  tryAgain() {
    sessionStorage.removeItem('aadhaarData');
    this.aadhaarForm.reset();
    this.hasAadhaarData = false; // update button visibility
  }

  onSubmit() {
    console.log(this.aadhaarForm.value);
  }
}
