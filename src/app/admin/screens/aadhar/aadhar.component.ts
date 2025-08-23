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
  mergedResponse: any = {}; // single merged response
  errorMessage: string = '';
  selectedFile: File | null = null;
  loading: boolean = false;
  uploadDisabled: boolean = true; // Upload button control

  docTypes = [
    { value: 'aadhar', label: 'Aadhaar' },
    { value: 'marks', label: 'Marksheet' },
    { value: 'tc', label: 'Transfer Certificate' }
  ];

  objectKeys = Object.keys;

  constructor(private fb: FormBuilder, private aadhaarService: aadhaarService) {
    this.uploadForm = this.fb.group({
      filename: ['', Validators.maxLength(100)],
      docType: ['aadhar', Validators.required]
    });

    // Load previously merged response
    const savedData = sessionStorage.getItem('mergedResponse');
    if (savedData) {
      this.mergedResponse = JSON.parse(savedData);
      console.log('Loaded merged response:', this.mergedResponse);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadDisabled = false; // enable upload after file select
    } else {
      this.uploadDisabled = true;
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

    const docType = this.uploadForm.get('docType')?.value;
    this.loading = true;

    this.aadhaarService.extractData(formData, docType).subscribe(
      (response: any) => {
        if (response && Object.keys(response).length > 0) {
          if (docType === 'aadhar' && response.address) {
            response.addressLines = response.address.split(',');
          }

          // Merge response into single object
          this.mergedResponse = { ...this.mergedResponse, ...response };

          // Save merged data in sessionStorage
          sessionStorage.setItem('mergedResponse', JSON.stringify(this.mergedResponse));

          console.log('Updated merged response:', this.mergedResponse);

          // Auto select next docType
          const currentIndex = this.docTypes.findIndex(d => d.value === docType);
          if (currentIndex !== -1 && currentIndex < this.docTypes.length - 1) {
            this.uploadForm.patchValue({ docType: this.docTypes[currentIndex + 1].value });
          }

          this.errorMessage = '';
        } else {
          this.errorMessage = 'No data extracted from the file.';
        }

        this.loading = false;
        this.selectedFile = null;
        this.uploadForm.get('filename')?.reset();
        this.uploadDisabled = true; // disable until new file selected
      },
      (error: any) => {
        this.errorMessage = 'Error extracting data. Please try again.';
        this.loading = false;
        this.uploadDisabled = true;
        console.error('API error:', error);
      }
    );
  }
}
