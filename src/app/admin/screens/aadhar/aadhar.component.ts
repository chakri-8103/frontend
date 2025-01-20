import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { aadhaarService } from './aadhar.service';

@Component({
  selector: 'app-aadhar',
  templateUrl: './aadhar.component.html',
  styleUrls: ['./aadhar.component.css']
})
export class AadhaarComponent {
  uploadForm: FormGroup;
  aadhaarData: any = null;
  errorMessage: string = '';
  selectedFile: File | null = null;
  loading: boolean = false;  // Spinner control state

  constructor(private fb: FormBuilder, private aadharService: aadhaarService) {
    this.uploadForm = this.fb.group({
      filename: ['', Validators.maxLength(100)]
    });
  }

  // Handle file selection
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle file upload and data extraction
  uploadFile() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file before submitting.';
      return;
    }

    const formData = new FormData();
    formData.append('aadhaar', this.selectedFile, this.selectedFile.name);

    if (this.uploadForm.get('filename')?.value) {
      formData.append('filename', this.uploadForm.get('filename')?.value);
    }

    this.loading = true;  // Show the spinner
    this.aadharService.extractAadhaarData(formData).subscribe(
      (response) => {
        this.aadhaarData = response.aadhaar_data; // Assuming the backend response structure
        this.errorMessage = '';
        this.loading = false;  // Hide the spinner
      },
      (error) => {
        this.errorMessage = 'Error extracting Aadhaar data. Please try again.';
        console.error(error);
        this.loading = false;  // Hide the spinner
      }
    );
  }
}
