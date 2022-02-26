import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  registerForm!: FormGroup;
  errMessage = "";
  isLoginFailed = false;
  isLoggedIn = false;
  constructor(private service : CompanyService,private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.registerForm = new FormGroup({
        companyName: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmPass: new FormControl()
      });
    }
    
  }

  onRegis(){
    let companyName = this.registerForm.value.companyName;
    let email = this.registerForm.value.email;
    let pass = this.registerForm.value.password;
    let conPass = this.registerForm.value.confirmPass;

    if(companyName == null || companyName == ""
      || email == null || email == ""
      || pass == null || pass == ""
      || conPass == null || conPass == ""){
      Swal.fire(
        'คุณลืมอะไรไปหริอเปล่า ?',
        'คุณกรอกข้อมูลครบแล้วหรือยัง ?',
        'question'
      )
    }else{
      if(pass != conPass){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ยืนยันรหัสผ่านไม่ถูกต้อง'
        })
      }else{
        let company = {
          name:this.registerForm.value.companyName,
          email:this.registerForm.value.email,
          password:this.registerForm.value.password
        }

        this.service.register(company).subscribe((res)=>{
          if(res.msg="New Company created"){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'ลงทะเบียนเสร็จสิ้น'
            })
            this.router.navigate(["/login"]);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'ผิดพลาด',
              text: 'ลงทะเบียนไม่สำเร็จ'
            })
            this.router.navigate(["/register/member"]);
          }
        })
      }
    }
  }

}
