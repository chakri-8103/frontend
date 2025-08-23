import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  aadhaarForm: FormGroup;
  hasData: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.aadhaarForm = this.fb.group({
      studentName: [''],
      surname: [''],
      fatherName: [''],
      occupation: [''],
      state: [''],
      district: [''],
      pinCode: [''],
      city: [''],
      street: [''],
      email: [''],
      landNumber: [''],
      medium: ['E.M.'],
      motherName: [''],
      dob: [''],
      religion: [''],
      caste: ['OC'],
      subCaste: [''],
      proName: [''],
      nationality: [''],
      gender: [''],
      mobile: [''],
      aadhaarNo: [''],
      rollNumber: [''],
      examName: [''],
      schoolName: [''],
      totalMarks: [''],
      percentage: [''],
      result: [''],
      admissionDate: [''],
      leavingDate: [''],
      classStudied: [''],
      academicCourse: [''],
      language: [''],
      yearOfPassing: [''],
      satisfactory: [''],
      admissionSchool: ['Aditya Institute of PG Studies'],
      admissionCourse: [''],
      competitive: [''],
      busHostel: ['None'],
      stop: [''],
      category: ['']
    });

  }

  ngOnInit() {
    const dataStr = sessionStorage.getItem('mergedResponse');
    this.hasData = !!dataStr;
    if (this.hasData) {
      this.autoFillFromSession();
    }
  }

  autoFillFromSession() {
    const dataStr = sessionStorage.getItem('mergedResponse');
    if (!dataStr) return;
    const data = JSON.parse(dataStr);
    console.log('Auto-filling form with data from sessionStorage:', data);
    
    if (data.aadhaar_number) {
      console.log('Filling Aadhaar data:', data);

      // Split the single string into array
      const address = (data.address || '').split(',').map((line: string) => line.trim());

      const vtc = address.find((line: string) => line.startsWith("VTC:"))?.replace("VTC:", "").trim() || '';
      const district = address.find((line: string) => line.startsWith("District:"))?.replace("District:", "").trim() || '';
      const state = address.find((line: string) => line.startsWith("State:"))?.replace("State:", "").trim() || '';
      const pinCode = address.find((line: string) => line.startsWith("PIN Code:"))?.replace("PIN Code:", "").trim() || '';

      console.log('Extracted from address:', { vtc, district, state, pinCode });

      this.aadhaarForm.patchValue({
        studentName: data.name || '',
        aadhaarNo: data.aadhaar_number || '',
        dob: data.dob || '',
        gender: data.gender || '',
        mobile: data.mobile_number || '',
        fatherName: data.parent_name || '',
        street: address[0] || '',
        city: vtc,
        district: district,
        state: state,
        pinCode: pinCode
      });

      console.log('Parsed address:', { vtc, district, state, pinCode });
    }



    // Fill Marks Sheet data
    if (data.roll_number) {
      this.aadhaarForm.patchValue({
        studentName: data.student_name || '',
        rollNumber: data.roll_number || '',
        examName: data.exam_name || '',
        schoolName: data.school_name || '',
        totalMarks: data.total || '',
        percentage: data.percentage || '',
        result: data.result || ''
      });
    }

    // Fill TC data
    if (data.father_name) {
      this.aadhaarForm.patchValue({
        studentName: data.student_name || '',
        fatherName: data.father_name || '',
        motherName: data.mother_name || '',
        admissionDate: data.admission_date || '',
        leavingDate: data.leaving_date || '',
        classStudied: data.class_studied || '',
        academicCourse: data.academic_course || '',
        language: data.language || '',
        yearOfPassing: data.year_of_passing || '',
        satisfactory: data.satisfactory || ''
      });
    }
  }

  tryAgain() {
    if (confirm("Are you sure you want to reUpload the file?")) {
      sessionStorage.removeItem('mergedResponse');
      this.aadhaarForm.reset();
      this.hasData = false;
      this.router.navigate(['/admin/aadhar']);
    }
  }

  onSubmit() {
    console.log(this.aadhaarForm.value);
  }
}
