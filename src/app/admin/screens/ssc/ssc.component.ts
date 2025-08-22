import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { aadhaarService } from 'src/app/admin/screens/aadhar/aadhar.service';

@Component({
  selector: 'app-ssc',
  templateUrl: './ssc.component.html',
  styleUrls: ['./ssc.component.css']
})
export class SscComponent {
  // uploadForm: FormGroup;
  // marksheetData: any = null;
  // errorMessage: string = '';
  // selectedFile: File | null = null;
  // loading: boolean = false; // Spinner control state

  // constructor(private fb: FormBuilder, private sscService: aadhaarService) {
  //   this.uploadForm = this.fb.group({
  //     filename: [
  //       '', 
  //       [Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9_-]*$/)] // Optional custom filename validation
  //     ]
  //   });
  // }

  // // Handle file selection
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Validate file type and size
  //     if (file.type !== 'application/pdf') {
  //       this.errorMessage = 'Only PDF files are allowed.';
  //       this.selectedFile = null;
  //     } else if (file.size > 5 * 1024 * 1024) { // Example: 5MB max size
  //       this.errorMessage = 'File size exceeds 5MB limit.';
  //       this.selectedFile = null;
  //     } else {
  //       this.selectedFile = file;
  //       this.errorMessage = ''; // Clear error messages
  //     }
  //   }
  // }

  // // Handle file upload and data extraction
  // uploadFile() {
  //   if (!this.selectedFile) {
  //     this.errorMessage = 'Please select a valid file before submitting.';
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('marksheet', this.selectedFile, this.selectedFile.name); // Corrected key name

  //   const customFilename = this.uploadForm.get('filename')?.value;
  //   if (customFilename) {
  //     formData.append('filename', customFilename);
  //   }

  //   this.loading = true; // Start loading spinner
  //   this.sscService.extractMarksheetData(formData).subscribe(
  //     (response) => {
  //       this.marksheetData = response.marksheet_data; // Assuming the backend response structure
  //       this.errorMessage = '';
  //       this.loading = false; // Hide the spinner when data is loaded
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error extracting SSC data. Please try again.';
  //       console.error(error);
  //       this.loading = false; // Hide the spinner on error
  //     }
  //   );
  // }
}
