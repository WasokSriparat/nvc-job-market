import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { PositionService } from 'src/app/service/position.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-post-add',
  templateUrl: './job-post-add.component.html',
  styleUrls: ['./job-post-add.component.css']
})
export class JobPostAddComponent implements OnInit {

  isLoggedIn = false;
  jobPostForm!: FormGroup;
  departmentForm!: FormGroup;
  positionForm!: FormGroup;
  currentUser: any;
  positions: any;
  departments: any;
  statusMember = false;
  companyData = false;

  constructor(
    private jobPostService: JobPostService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {

    this.departmentService.getDepartments().subscribe((res: any) => {
      this.departments = res.data;
    });

    this.positionService.getPositions().subscribe((res: any) => {
      this.positions = res.data;
    });

    this.departmentForm = new FormGroup({
      departmentName : new FormControl()
    })

    this.positionForm = new FormGroup({
      positionName : new FormControl()
    })

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      if (this.currentUser.phoneNumber == null || this.currentUser.address == null) {
        this.companyData = true;
      }

      if (this.currentUser.category == "member") {
        this.statusMember = true;
      }
    }

    this.jobPostForm = new FormGroup({
      title: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      ageMin: new FormControl(),
      ageMax: new FormControl(),
      salaryMin: new FormControl(),
      salaryMax: new FormControl(),
      description: new FormControl(),
      department: new FormControl(),
      position: new FormControl()
    })


  }

  onAddDepartment(){
    let deparment = {
      name: this.departmentForm.value.departmentName
    }
    this.departmentService.addDepartment(deparment).subscribe((res)=>{
      if(res.msg == "ok"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มสำเร็จ'
        })
        this.departmentService.getDepartments().subscribe((res:any)=>{
          this.departments = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'เพิ่มไม่สำเร็จ'
        })
      }
    })
  }

  onAddPosition(){
    let position = {
      name: this.positionForm.value.positionName
    }
    this.positionService.addPosition(position).subscribe((res)=>{
      if(res.msg == "ok"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มสำเร็จ'
        })
        this.positionService.getPositions().subscribe((res:any)=>{
          this.positions = res.data;
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'เพิ่มไม่สำเร็จ'
        })
      }
    })
  }

  cancel(){
    this.departmentForm.reset();
    this.positionForm.reset();
  }

  onSavePost() {

    if (this.companyData) {
      Swal.fire({
        icon: 'warning',
        title: 'ไม่สามารถโพสต์ได้',
        text: 'กรุณากรอกข้อมูลส่วนตัวให้ครบ',
        footer: '<a href="/profile/edit">แก้ไข ข้อมูลส่วนตัว</a>'
      })
    } else {
      let jobpost = {
        company_id: this.currentUser._id,
        companyName: this.currentUser.name,
        title: this.jobPostForm.value.title,
        startDate: this.jobPostForm.value.startDate,
        endDate: this.jobPostForm.value.endDate,
        ageMin: this.jobPostForm.value.ageMin,
        ageMax: this.jobPostForm.value.ageMax,
        salaryMin: this.jobPostForm.value.salaryMin,
        salaryMax: this.jobPostForm.value.salaryMax,
        description: this.jobPostForm.value.description,
        department: this.jobPostForm.value.department,
        position: this.jobPostForm.value.position,
      }

      if (this.jobPostForm.value.title == null ||
        this.jobPostForm.value.startDate == null ||
        this.jobPostForm.value.description == null ||
        this.jobPostForm.value.department == null ||
        this.jobPostForm.value.position == null) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'กรุณากรอกข้อมูลครบ'
        })
      } else {
        this.jobPostService.addJobPost(jobpost).subscribe((res) => {

          if (res.msg == "Post Complete") {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'เพิ่มสำเร็จ'
            })
            this.router.navigate([`/jobpost/company`]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error',
              text: 'เพิ่มไม่สำเร็จ'
            })
            this.router.navigate(["/jobpost/add"]);
          }
        });
      }
    }



  }

}
