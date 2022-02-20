import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { MemberService } from 'src/app/service/member.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errMessage = "";
  isLoginFailed = false;
  isLoggedIn = false;

  constructor(private memberService: MemberService,private companyService: CompanyService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.loginForm = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
        category: new FormControl(),
      });
    }
  }

  onLogin() {
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.password;

    if (this.loginForm.value.category == null) {
      Swal.fire(
        'กรุณาเลือกประเภทที่จะเข้าสู่ระบบ ?',
        '',
        'warning'
      )
    } else {
      if (email == null || email == ""
        || pass == null || pass == "") {
        Swal.fire(
          'คุณลืมอะไรไปหริอเปล่า ?',
          'คุณกรอกข้อมูลครบแล้วหรือยัง ?',
          'warning'
        )
      } else {

        let login = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }

        if(this.loginForm.value.category == "member"){
          this.memberService.login(login).subscribe((res) => {
            this.tokenStorage.saveToken(res.token);
            this.tokenStorage.saveUser(res.userCredentials);
            this.isLoggedIn = true;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'เข้าสู่ระบบสำเร็จ'
            })
            window.location.reload();
          }, err => {
            this.errMessage = err.error.msg;
            this.isLoginFailed = true;
            Swal.fire({
              icon: 'error',
              title: this.errMessage,
              text: 'เข้าสู่ระบบผิดพลาด'
            })
          });
        }else{
          this.companyService.login(login).subscribe((res) => {
            this.tokenStorage.saveToken(res.token);
            this.tokenStorage.saveUser(res.userCredentials);
            this.isLoggedIn = true;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'เข้าสู่ระบบสำเร็จ'
            })
            window.location.reload();
          }, err => {
            this.errMessage = err.error.msg;
            this.isLoginFailed = true;
            Swal.fire({
              icon: 'error',
              title: this.errMessage,
              text: 'เข้าสู่ระบบผิดพลาด'
            })
          });
        }

        

        
      }
    }


  }

}
