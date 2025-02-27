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
  formKeys: { key: string; isSection: boolean }[] = []; // Store keys (normal & sections)
  jsonError: boolean = false;
  structuredData: any = {};

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  generateForm() {
    try {
      const parsedData = JSON.parse(this.jsonInput);
      this.jsonError = false;
      this.structuredData = parsedData;

      const formControls: { [key: string]: FormControl } = {};
      const keysList: { key: string; isSection: boolean }[] = [];

      const extractFields = (obj: any, parentKey: string = '') => {
        Object.entries(obj).forEach(([key, value]) => {
          const fullKey = parentKey ? `${parentKey}.${key}` : key;

          if (this.isObject(value)) {
            // If the object is a section, add it separately
            keysList.push({ key: fullKey, isSection: true });
            extractFields(value, fullKey);
          } else {
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
