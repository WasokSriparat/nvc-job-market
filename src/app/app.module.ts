import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { MainComponent } from './components/pages/main/main.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegisterMemberComponent } from './components/pages/register-member/register-member.component';
import { RegisterCompanyComponent } from './components/pages/register-company/register-company.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ProfileEditComponent } from './components/pages/profile-edit/profile-edit.component';
import { JobPostComponent } from './components/pages/job-post/job-post.component';
import { JobPostAddComponent } from './components/pages/job-post-add/job-post-add.component';
import { JobRegisterComponent } from './components/pages/job-register/job-register.component';
import { JobApplicantComponent } from './components/pages/job-applicant/job-applicant.component';
import { JobDetailComponent } from './components/pages/job-detail/job-detail.component';
import { JobPostEditComponent } from './components/pages/job-post-edit/job-post-edit.component';
import { ViewCompanyComponent } from './components/pages/view-company/view-company.component';
import { ViewMemberComponent } from './components/pages/view-member/view-member.component';
import { BrowserAnimationsModule,NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyPostComponent } from './components/pages/company-post/company-post.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { ListCompanyComponent } from './components/pages/list-company/list-company.component';
import { ListMemberComponent } from './components/pages/list-member/list-member.component';
import { ListDepartAndPositionComponent } from './components/pages/list-depart-and-position/list-depart-and-position.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    RegisterMemberComponent,
    RegisterCompanyComponent,
    ProfileComponent,
    ProfileEditComponent,
    JobPostComponent,
    JobPostAddComponent,
    JobRegisterComponent,
    JobApplicantComponent,
    JobDetailComponent,
    JobPostEditComponent,
    ViewCompanyComponent,
    ViewMemberComponent,
    CompanyPostComponent,
    ListCompanyComponent,
    ListMemberComponent,
    ListDepartAndPositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
