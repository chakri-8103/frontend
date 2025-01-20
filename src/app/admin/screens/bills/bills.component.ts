import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillsService } from './bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent {
  uploadForm: FormGroup;
  errorMessage: string = '';
  selectedFile: File | null = null;
  billData: any[] = []; // Store all pages of bill data
  currentPage: number = 0; // Track the current page
  loading: boolean = false;

  constructor(private fb: FormBuilder, private billsService: BillsService) {
    // Updated validation for form
    this.uploadForm = this.fb.group({
      filename: ['', [Validators.maxLength(100)]], // Optional custom filename
      file: [null, [Validators.required]] // Ensure a file is selected
    });
  }

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadForm.patchValue({ file });
      this.uploadForm.get('file')?.updateValueAndValidity();
    } else {
      this.uploadForm.patchValue({ file: null });
    }
  }

  // Handle file upload and data extraction
  uploadFile(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file before submitting.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    const customFilename = this.uploadForm.get('filename')?.value;
    if (customFilename) {
      formData.append('filename', customFilename);
    }

    this.loading = true;
    this.billsService.extractBillsData(formData).subscribe(
      (response: any) => {
        this.loading = false;

        if (response && response.pages && Array.isArray(response.pages)) {
          this.errorMessage = '';
          this.billData = response.pages; // Store all pages of data
          this.currentPage = 0; // Start from the first page
        } else {
          this.errorMessage = 'No data returned from the server.';
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Error extracting bill data. Please try again.';
      }
    );
  }

  // Move to the next page
  nextPage(): void {
    if (this.currentPage < this.billData.length - 1) {
      this.currentPage++;
    }
  }

  // Move to the previous page
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
