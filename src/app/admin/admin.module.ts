import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './menu/menu.component';
import { adminScreensComponent } from './screens/screens.component';  // Corrected class name capitalization
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { TransferComponent } from './screens/transfer/transfer.component';
import { MufasaComponent } from './screens/mufasa/mufasa.component';
import { UploadComponent } from './screens/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';  // Added to handle HTTP requests
import { FormsModule } from '@angular/forms';
import { AadhaarComponent } from './screens/aadhar/aadhar.component';
import { SscComponent } from './screens/ssc/ssc.component';
import { billsComponent } from './screens/bills/bills.component';  // Added for two-way data binding in forms

@NgModule({
  declarations: [
    MenuComponent,
    adminScreensComponent,
    DashboardComponent,
    BlankpageComponent,
    TransferComponent,
    MufasaComponent,
    UploadComponent,
    AadhaarComponent,
    SscComponent,
    billsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,  // Added to make HTTP requests
    FormsModule,
    ReactiveFormsModule  // Added for form handling
  ]
})
export class AdminModule { }
