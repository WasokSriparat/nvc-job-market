import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/service/member.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.css']
})
export class RegisterMemberComponent implements OnInit {
  registerForm!: FormGroup;
  errMessage = "";
  isLoginFailed = false;
  isLoggedIn = false;

  constructor(private service : MemberService,private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.registerForm = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        confirmPass: new FormControl(),
        birthDay: new FormControl(),
        gender: new FormControl()
      });
    }
    
  }

  onRegis(){
    let fName = this.registerForm.value.firstName;
    let lName = this.registerForm.value.lastName;
    let email = this.registerForm.value.email;
    let pass = this.registerForm.value.password;
    let conPass = this.registerForm.value.confirmPass;
    let birthDay = this.registerForm.value.birthDay;
    let gender = this.registerForm.value.gender;

    if(fName == null || fName == "" 
      || lName == null || lName == ""
      || email == null || email == ""
      || pass == null || pass == ""
      || conPass == null || conPass == ""
      || birthDay == null || birthDay == ""
      || gender == null || gender == ""){
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
        let member = {
          firstName:this.registerForm.value.firstName,
          lastName:this.registerForm.value.lastName,
          email:this.registerForm.value.email,
          password:this.registerForm.value.password,
          birthDay:this.registerForm.value.birthDay,
          gender:this.registerForm.value.gender
        }

        this.service.register(member).subscribe((res)=>{
          if(res.msg="New Member created"){
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
