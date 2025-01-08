import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/student.service'; // Import the service

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  tcInfo: any;
  issuedResponse: any;
  viewTCResponse: any;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getTCInfo(256520);
    this.viewTC(262962);
  }

  // Fetch TC Info for a student
  getTCInfo(studentId: number): void {
    this.studentService.getTCInfo(studentId).subscribe(
      (response) => {
        this.tcInfo = response;
        console.log('TC Info:', this.tcInfo);
      },
      (error) => {
        console.error('Error fetching TC Info:', error);
      }
    );
  }

  // Issue TC for a student
  issueTC(): void {
    const data = {
      year_name: '2024-2025',
      std_id: 264927,
      school_name: 'ADITYA JUNIOR COLLEGE',
      school_address: 'SUBBARAO PETA',
      school_city: 'TADEPALLIGUDEM 08818-227575,226464',
      tccollegecode: null,
      tccollegename: null,
      tcotherinfo: null,
      studentname: 'TONTAPAKA GAYATRI',
      father_name: 'TONTAPAKA SIMHACHALAM',
      mother_name: 'SYAMALA',
      nationality: 'INDIAN - HINDU',
      caste: 'BC',
      course_name: 'JRCEC',
      dob: '13/04/2007',
      conduct: 'SATISFACTORY',
      scholarship: 'YES',
      concession: 'YES',
      universityEligibility: 'YES',
      motherTongue: 'TELUGU',
      admissionDate: '01/01/1970',
      dateOfLeaving: '12/12/2024',
      dateOfTC: '12/12/2024',
      classStudying: 'Senior Intermediate',
      firstLanguage: 'ENGLISH',
      secondLanguage: 'SANSKRIT',
      optionalSubjects: 'MATHEMATICS-PHYSICS',
      firstAdmittedClass: '1/2 YEAR',
      qualifiedForSecondYear: 'Appeared for 2-year I.P.E held in MARCH-2024',
      identificationMark1: 'As Per SSC',
      identificationMark2: 'As Per SSC',
    };

    this.studentService.issueTC(data).subscribe(
      (response) => {
        this.issuedResponse = response;
        console.log('TC Issued:', this.issuedResponse);
      },
      (error) => {
        console.error('Error issuing TC:', error);
      }
    );
  }

  // Confirm TC is issued
  confirmIssuedTC(): void {
    const data = { student_id: 247487, issued_by: 43 };

    this.studentService.confirmIssuedTC(data).subscribe(
      (response) => {
        console.log('TC Issued Confirmation:', response);
      },
      (error) => {
        console.error('Error confirming TC issuance:', error);
      }
    );
  }

  // View TC for a student
  viewTC(studentId: number): void {
    this.studentService.viewTC(studentId).subscribe(
      (response) => {
        this.viewTCResponse = response;
        console.log('View TC Response:', this.viewTCResponse);
      },
      (error) => {
        console.error('Error viewing TC:', error);
      }
    );
  }
}
