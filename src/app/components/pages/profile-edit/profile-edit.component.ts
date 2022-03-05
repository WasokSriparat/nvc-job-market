import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { MemberService } from 'src/app/service/member.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  userName: any;
  currentUser: any;
  educations: any;
  isLoggedIn = false;
  statusMember = false;

  infoForm!: FormGroup;
  addressForm!: FormGroup;
  educationForm!: FormGroup;
  picForm!: FormGroup;

  profilePic = "../../../../assets/images/NullProfile.png";

  constructor(private tokenStorage: TokenStorageService, private memberService: MemberService, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();


      if (this.currentUser.category == "member") {
        this.statusMember = true;
        this.userName = `${this.currentUser.firstName}  ${this.currentUser.lastName}`;
  
        if(this.currentUser.profilePic){
          this.profilePic = this.currentUser.profilePic;
        }

        this.picForm = new FormGroup({
          pic: new FormControl()
        })

        this.infoForm = new FormGroup({
  
          firstName: new FormControl(),
          lastName: new FormControl(),
          phoneNumber: new FormControl(),
          birthDay: new FormControl(),
          description: new FormControl(),
  
        });
  
        this.infoForm.controls['firstName'].setValue(this.currentUser.firstName);
        this.infoForm.controls['lastName'].setValue(this.currentUser.lastName);
        this.infoForm.controls['birthDay'].setValue(this.currentUser.birthDay);
  
        this.educations = this.currentUser.educations;
  
        this.educationForm = new FormGroup({
          id: new FormControl(),
          academy: new FormControl(),
          qualification: new FormControl(),
          department: new FormControl(),
          gpa: new FormControl(),
        });
  
  
  
      } else {
        this.userName = this.currentUser.name;
        if(this.currentUser.profilePic){
          this.profilePic = this.currentUser.profilePic;
        }

        this.picForm = new FormGroup({
          pic: new FormControl()
        })
  
        this.infoForm = new FormGroup({
  
          companyName: new FormControl(),
          email: new FormControl(),
          phoneNumber: new FormControl(),
          description: new FormControl(),
  
        });
  
        this.infoForm.controls['companyName'].setValue(this.currentUser.name);
  
      }
  
      this.infoForm.controls['phoneNumber'].setValue(this.currentUser.phoneNumber);
      this.infoForm.controls['description'].setValue(this.currentUser.description);
  
      this.addressForm = new FormGroup({
        houseNo: new FormControl(),
        district: new FormControl(),
        subDistrict: new FormControl(),
        province: new FormControl(),
        country: new FormControl(),
        zipCode: new FormControl()
      });
  
      this.addressForm.controls['houseNo'].setValue(this.currentUser.address?.houseNo);
      this.addressForm.controls['district'].setValue(this.currentUser.address?.district);
      this.addressForm.controls['subDistrict'].setValue(this.currentUser.address?.subDistrict);
      this.addressForm.controls['province'].setValue(this.currentUser.address?.province);
      this.addressForm.controls['country'].setValue(this.currentUser.address?.country);
      this.addressForm.controls['zipCode'].setValue(this.currentUser.address?.zipCode);

    }

  }

  onSavePic(){
    let pic = {
      pic: this.picForm.value.pic
    }
    if(this.statusMember){
      this.memberService.updatePic(this.currentUser._id,pic).subscribe((res)=>{
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })
    }else{
      this.companyService.updatePic(this.currentUser._id,pic).subscribe((res)=>{
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })
    }
  }

  onSaveInfo() {

    if (this.statusMember) {

      let member = {
        firstName: this.infoForm.value.firstName,
        lastName: this.infoForm.value.lastName,
        email: this.currentUser.email,
        phoneNumber: this.infoForm.value.phoneNumber,
        birthDay: this.infoForm.value.birthDay,
        description: this.infoForm.value.description,
      }

      this.memberService.updateMember(this.currentUser._id, member).subscribe((res) => {
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })

    } else {

      let company = {
        name: this.infoForm.value.companyName,
        email: this.currentUser.email,
        phoneNumber: this.infoForm.value.phoneNumber,
        description: this.infoForm.value.description,
      }

      this.companyService.updateCompany(this.currentUser._id, company).subscribe((res) => {
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })
    }
  }

  onResetInfo() {
    if (this.statusMember) {
      this.infoForm.controls['firstName'].setValue(this.currentUser.firstName);
      this.infoForm.controls['lastName'].setValue(this.currentUser.lastName);
      this.infoForm.controls['birthDay'].setValue(this.currentUser.birthDay);
    } else {
      this.infoForm.controls['companyName'].setValue(this.currentUser.name);
    }
    this.infoForm.controls['phoneNumber'].setValue(this.currentUser.phoneNumber);
    this.infoForm.controls['description'].setValue(this.currentUser.description);
  }

  onSaveAddress() {

    let address = {
      houseNo: this.addressForm.value.houseNo,
      district: this.addressForm.value.district,
      subDistrict: this.addressForm.value.subDistrict,
      province: this.addressForm.value.province,
      country: this.addressForm.value.country,
      zipCode: this.addressForm.value.zipCode
    }

    if (this.statusMember) {
      this.memberService.updateAddress(this.currentUser._id, address).subscribe((res) => {
        // console.log(res);
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })
    } else {
      this.companyService.updateAddress(this.currentUser._id, address).subscribe((res) => {
        // console.log(res);
        this.tokenStorage.saveUser(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไข้สำเร็จ'
        })
        window.location.reload();
      })
    }

  }

  onResetAddress() {
    this.addressForm.controls['houseNo'].setValue(this.currentUser.address.houseNo);
    this.addressForm.controls['district'].setValue(this.currentUser.address.district);
    this.addressForm.controls['subDistrict'].setValue(this.currentUser.address.subDistrict);
    this.addressForm.controls['province'].setValue(this.currentUser.address.province);
    this.addressForm.controls['country'].setValue(this.currentUser.address.country);
    this.addressForm.controls['zipCode'].setValue(this.currentUser.address.zipCode);
  }

  onSaveEducation() {
    let education = {
      academy: this.educationForm.value.academy,
      qualification: this.educationForm.value.qualification,
      department: this.educationForm.value.department,
      gpa: this.educationForm.value.gpa,
    }
    this.memberService.addEducation(this.currentUser._id, education).subscribe((res) => {
      this.tokenStorage.saveUser(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'เพิ่มสำเร็จ'
      })
      window.location.reload();
    })
  }

  onDeleteEducation(education_id: any) {
    let education = {
      _id: education_id
    }
    this.memberService.deleteEducation(this.currentUser._id, education).subscribe((res) => {
      this.tokenStorage.saveUser(res.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'ลบสำเร็จ'
      })
      window.location.reload();
    })
  }

}
