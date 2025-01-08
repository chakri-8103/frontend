import { NgModule, NO_ERRORS_SCHEMA, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { HeadersInterceptor } from './interceptor/headers.interceptor';
import { googleclientID } from './utilities/socialauth';
import { SharedModule } from './shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { RegistrationComponent } from './registration/registration.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    routingComponents,
    SharedModule,
    CommonModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [
    {provide: LocationStrategy, useClass:HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
  },HttpClient,
  
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              googleclientID
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
