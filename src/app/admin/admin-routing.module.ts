import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankpageComponent } from './screens/blankpage/blankpage.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { adminScreensComponent } from './screens/screens.component';
import { TransferComponent } from './screens/transfer/transfer.component';
import { MufasaComponent } from './screens/mufasa/mufasa.component';
import { UploadComponent } from './screens/upload/upload.component';
import { AadhaarComponent } from './screens/aadhar/aadhar.component';
import { SscComponent } from './screens/ssc/ssc.component';
import { BillsComponent } from './screens/bills/bills.component';
import { DynamicformComponent } from './screens/dynamicform/dynamicform.component';
import { DynamicFormComponent } from './screens/dynamic/dynamic-form.component';
import { NotificationComponent } from './screens/notification/notification.component';


const routes: Routes = [
  {
    path:'',
    component: adminScreensComponent,
    children:[
      {
        path:'',
        component: DashboardComponent
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'blankpage',
        component: BlankpageComponent
      },
      {
        path:'transfer',
        component:TransferComponent
      },
      {
        path:'mufasa',
        component: MufasaComponent
      },
      {
        path:'upload',
        component:UploadComponent
      },
      {
        path:'aadhar',
        component:AadhaarComponent
      },
      {
        path:'ssc',
        component: SscComponent
      },
      {
        path:'bills',
        component: BillsComponent
      },
      {
        path:'dynamicform',
        component:DynamicformComponent
      },
      {
        path:'dynamic',
        component:DynamicFormComponent
      },
      {
        path:'notification',
        component:NotificationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
