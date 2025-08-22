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
  loading: boolean = false;

  docTypes = [
    { value: 'aadhar', label: 'Aadhaar' },
    { value: 'marks', label: 'Marksheet' },
    { value: 'tc', label: 'Transfer Certificate' },
    { value: 'generic', label: 'Generic Document' },
  ];

  constructor(private fb: FormBuilder, private aadhaarService: aadhaarService) {
    this.uploadForm = this.fb.group({
      filename: ['', Validators.maxLength(100)],
      docType: ['aadhar', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file before submitting.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    if (this.uploadForm.get('filename')?.value) {
      formData.append('filename', this.uploadForm.get('filename')?.value);
    }

    this.loading = true;
    const docType = this.uploadForm.get('docType')?.value;

    this.aadhaarService.extractData(formData, docType).subscribe(
      (response: any) => {
        if (response && Object.keys(response).length > 0) {
          this.aadhaarData = { ...response, addressLines: response.address.split(',') };
          sessionStorage.setItem('aadhaarData', JSON.stringify(this.aadhaarData)); // <-- store in session storage
          this.errorMessage = '';
        } else {
          this.aadhaarData = null;
          this.errorMessage = 'No data extracted from the file.';
        }
        this.loading = false;
      },
      (error: any) => {
        this.errorMessage = 'Error extracting data. Please try again.';
        this.loading = false;
      }
    );
  }
}
