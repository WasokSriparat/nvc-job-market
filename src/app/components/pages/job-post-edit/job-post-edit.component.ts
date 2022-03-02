import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { PositionService } from 'src/app/service/position.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.css']
})
export class JobPostEditComponent implements OnInit {

  isLoggedIn = false;
  jobPostForm!: FormGroup;
  currentPost:any;
  currentUser:any;
  id:any;
  positions: any;
  departments: any;
  statusEditer = true;

  constructor(private jobPostService: JobPostService,private positionService: PositionService,
    private departmentService: DepartmentService,  private router : Router,private activatedRouter: ActivatedRoute, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

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

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();

      if(this.currentUser?.category == 'admin'){
        this.statusEditer = true;
      }

    }

    this.departmentService.getDepartments().subscribe((res:any)=>{
      this.departments = res.data;
    });

    this.positionService.getPositions().subscribe((res:any)=>{
      this.positions =  res.data;
      
    });

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    })

    this.jobPostService.getJobPostById(this.id).subscribe((res)=>{
      this.currentPost = res.data

      if(this.currentPost.company_id == this.currentUser?._id ){
        this.statusEditer = true;
      }
            
      this.jobPostForm.controls['title'].setValue(this.currentPost?.title);
      this.jobPostForm.controls['startDate'].setValue(this.currentPost?.startDate);
      this.jobPostForm.controls['endDate'].setValue(this.currentPost?.endDate);
      this.jobPostForm.controls['ageMin'].setValue(this.currentPost?.ageMin);
      this.jobPostForm.controls['ageMax'].setValue(this.currentPost?.ageMax);
      this.jobPostForm.controls['salaryMin'].setValue(this.currentPost?.salaryMin);
      this.jobPostForm.controls['salaryMax'].setValue(this.currentPost?.salaryMax);
      this.jobPostForm.controls['description'].setValue(this.currentPost?.description);
      this.jobPostForm.controls['department'].setValue(this.currentPost?.department);
      this.jobPostForm.controls['position'].setValue(this.currentPost?.position);

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

    this.jobPostService.updateJobPost(this.id,jobpost).subscribe((res)=>{
      
      if(res.msg == "OK"){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'แก้ไขสำเร็จ'
        })
        this.router.navigate([`/jobpost/detail/${this.id}`]);
      }else{
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'แก้ไขสำเร็จ'
        })
        this.router.navigate(["/jobpost/edit"]);
      }
    });
  }

}
