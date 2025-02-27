import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicformComponent {
  jsonInput: string = ''; // JSON input
  dynamicForm: FormGroup = new FormGroup({}); // FormGroup
  formKeys: { key: string; isSection: boolean; isArray?: boolean; arrayData?: any[] }[] = []; // Store keys (normal, sections, and arrays)
  jsonError: boolean = false;
  structuredData: any = {};

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  generateForm() {
    try {
      const parsedData = JSON.parse(this.jsonInput);
      this.jsonError = false;
      this.structuredData = parsedData;

      const formControls: { [key: string]: FormControl } = {};
      const keysList: { key: string; isSection: boolean; isArray?: boolean; arrayData?: any[] }[] = [];

      const extractFields = (obj: any, parentKey: string = '') => {
        Object.entries(obj).forEach(([key, value]) => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key;

          if (this.isObject(value)) {
            // If the value is an object, treat it as a section
            keysList.push({ key: fullKey, isSection: true });
            extractFields(value, fullKey); // Recursively extract fields from the object
          } else if (this.isArray(value)) {
            // If the value is an array, treat it as a dropdown
            keysList.push({ key: fullKey, isSection: false, isArray: true, arrayData: value });
          } else {
            // If the value is a primitive, treat it as a normal input field
            formControls[fullKey] = new FormControl(value);
            keysList.push({ key: fullKey, isSection: false });
          }
        });
      };

      extractFields(parsedData);
      this.dynamicForm = new FormGroup(formControls);
      this.formKeys = keysList;
    } catch (error) {
      this.jsonError = true;
    }
  }

  onSubmit() {
    console.log('Form Data:', this.dynamicForm.value);
    alert('Form Submitted Successfully!');
  }

  formatLabel(field: string): string {
    return field.replace(/\./g, ' > ').replace(/_/g, ' ');
  }
}