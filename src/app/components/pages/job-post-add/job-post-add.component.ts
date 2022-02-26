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
  currentUser:any;
  positions: any;
  departments: any;
  statusMember = false;

  constructor(
    private jobPostService: JobPostService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {

    this.departmentService.getDepartments().subscribe((res:any)=>{
      this.departments = res.data;
    });

    this.positionService.getPositions().subscribe((res:any)=>{
      this.positions =  res.data;
    });

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();

      if (this.currentUser.category == "member"){
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

  onSavePost(){
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

    if(this.jobPostForm.value.title == null ||
      this.jobPostForm.value.startDate == null ||
      this.jobPostForm.value.description == null ||
      this.jobPostForm.value.department == null ||
      this.jobPostForm.value.position == null ){
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'กรุณากรอกข้อมูลครบ'
      })
    }

    if(this.jobPostForm.value.ageMin != Number ||
      this.jobPostForm.value.ageMax != Number ||
      this.jobPostForm.value.salaryMin != Number ||
      this.jobPostForm.value.salaryMax != Number ){
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'กรุณากรอกข้อมูล อายุ และ เงินเดือน เป็นตัวเลข'
        })
      }

    console.log(jobpost);
    this.jobPostService.addJobPost(jobpost).subscribe((res)=>{
      
      if(res.msg == "Post Complete"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'เพิ่มสำเร็จ'
        })
        this.router.navigate(["/jobpost"]);
      }else{
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
