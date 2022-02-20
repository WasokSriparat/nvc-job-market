import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './components/pages/main/main.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterCompanyComponent } from './components/pages/register-company/register-company.component';
import { RegisterMemberComponent } from './components/pages/register-member/register-member.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  {path: "",component:MainComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"register/member",component:RegisterMemberComponent},
  {path:"register/company",component:RegisterCompanyComponent},
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
