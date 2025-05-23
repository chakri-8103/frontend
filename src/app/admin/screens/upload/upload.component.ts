import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { uploadService } from './upload.service';  // Correct service name

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  uploadForm: FormGroup;
  aadhaarData: any = null;
  errorMessage: string = '';
  selectedFile: File | null = null;  // Track the selected file

  constructor(private fb: FormBuilder, private uploadService: uploadService) {  // Corrected service name
    this.uploadForm = this.fb.group({
      filename: ['', Validators.maxLength(100)]  // Optional custom filename
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

    // Call the service to send data to the backend
    this.uploadService.extractAadhaarData(formData).subscribe(
      (response) => {
        this.aadhaarData = response.aadhaar_data;  // Assuming the backend response structure
        this.errorMessage = '';  // Clear any previous error messages
      },
      (error) => {
        this.errorMessage = 'Error extracting Aadhaar data. Please try again.';
        console.error(error);
      }
    );
  }
}
