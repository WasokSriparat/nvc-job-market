import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobApplicantComponent } from './components/pages/job-applicant/job-applicant.component';
import { JobDetailComponent } from './components/pages/job-detail/job-detail.component';
import { JobPostAddComponent } from './components/pages/job-post-add/job-post-add.component';
import { JobPostEditComponent } from './components/pages/job-post-edit/job-post-edit.component';
import { JobPostComponent } from './components/pages/job-post/job-post.component';
import { JobRegisterComponent } from './components/pages/job-register/job-register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './components/pages/main/main.component';
import { ProfileEditComponent } from './components/pages/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterCompanyComponent } from './components/pages/register-company/register-company.component';
import { RegisterMemberComponent } from './components/pages/register-member/register-member.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ViewMemberComponent } from './components/pages/view-member/view-member.component';
import { ViewCompanyComponent } from './components/pages/view-company/view-company.component';
import { AuthGuard } from './guard/auth.guard';
import { CompanyPostComponent } from './components/pages/company-post/company-post.component';
import { ListCompanyComponent } from './components/pages/list-company/list-company.component';
import { ListDepartAndPositionComponent } from './components/pages/list-depart-and-position/list-depart-and-position.component';
import { ListMemberComponent } from './components/pages/list-member/list-member.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "register/member", component: RegisterMemberComponent },
  { path: "register/company", component: RegisterCompanyComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile/edit", component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: "jobpost/search", component: JobPostComponent },
  { path: "jobpost/search/:title", component: JobPostComponent },
  { path: "jobpost/add", component: JobPostAddComponent, canActivate: [AuthGuard] },
  { path: "jobpost/edit/:id", component: JobPostEditComponent, canActivate: [AuthGuard] },
  { path: "jobpost/detail/:id", component: JobDetailComponent },
  { path: "jobpost/register", component: JobRegisterComponent, canActivate: [AuthGuard] },
  { path: "jobpost/applicant", component: JobApplicantComponent, canActivate: [AuthGuard] },
  {path: "jobpost/company",component: CompanyPostComponent, canActivate: [AuthGuard] },
  { path: "profile/member/:id", component: ViewMemberComponent },
  { path: "profile/company/:id", component: ViewCompanyComponent },
  {path:"manage/company",component: ListCompanyComponent, canActivate: [AuthGuard] },
  {path:"manage/member",component: ListMemberComponent, canActivate: [AuthGuard] },
  {path:"manage/departmentAndPosition",component: ListDepartAndPositionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
