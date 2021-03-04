import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor, RequestInterceptor } from './services/http-interceptors';
import { LocalStorageService } from './services/local-storage';
import { MessageService } from './services/msgs';
import { HomeComponent } from './ui/home/home.component';
import { LeftMenuComponent } from './ui/left-menu/left-menu.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HashService } from './services/hash-service';
import { RootService } from './services/root-service';
import { BaseEncodingService } from './services/base-encoding-service';
import { HashFormComponent } from './ui/hash-form/hash-form.component';
import { RandomService } from './services/random-service';
import { BaseEncodingFormComponent } from './ui/base-encoding-form/base-encoding-form.component';
import { RandomNumberFormComponent } from './ui/random-number-form/random-number-form.component';
import { RandomNamesFormComponent } from './ui/random-names-form/random-names-form.component';
import { H3lp3rMaterialModule } from './h3lp3r-material.module';
import { OracleQuestionFormComponent } from '@appui/oracle-question-form/oracle-question-form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    HomeComponent,
    DashboardComponent,
    HashFormComponent,
    BaseEncodingFormComponent,
    RandomNumberFormComponent,
    RandomNamesFormComponent,
    OracleQuestionFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkTableModule,
    CdkAccordionModule, 
    FlexLayoutModule,
    H3lp3rMaterialModule  ],
  providers: [
    LocalStorageService,
    MessageService,
    HashService,
    RootService,
    RandomService,
    BaseEncodingService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
