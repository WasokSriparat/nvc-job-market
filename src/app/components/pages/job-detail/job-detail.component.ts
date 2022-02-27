import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { PositionService } from 'src/app/service/position.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  isLoggedIn = false;
  editPostForm!: FormGroup;
  applicantForm!: FormGroup;
  currentPost:any;
  currentUser:any;
  id:any;
  positions: any;
  departments: any;
  statusMember = false;
  statusEditer = false;
  statusPoster = false;
  postActive!: Boolean;

  constructor(
    private jobPostService: JobPostService,
    private router : Router,
    private activatedRouter: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private positionService: PositionService,
    private departmentService: DepartmentService, 
  ) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();

      if (this.currentUser.category == "member"){
        this.statusMember = true;
      }else if(this.currentUser?.category == 'admin'){
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
      this.postActive = this.currentPost.postStatus;

      if(this.currentPost.company_id == this.currentUser?._id ){
        this.statusEditer = true;  
        this.statusPoster = true;
      }

      this.editPostForm = new FormGroup({
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
      this.editPostForm.controls['title'].setValue(this.currentPost?.title);
      this.editPostForm.controls['startDate'].setValue(this.currentPost?.startDate);
      this.editPostForm.controls['endDate'].setValue(this.currentPost?.endDate);
      this.editPostForm.controls['ageMin'].setValue(this.currentPost?.ageMin);
      this.editPostForm.controls['ageMax'].setValue(this.currentPost?.ageMax);
      this.editPostForm.controls['salaryMin'].setValue(this.currentPost?.salaryMin);
      this.editPostForm.controls['salaryMax'].setValue(this.currentPost?.salaryMax);
      this.editPostForm.controls['description'].setValue(this.currentPost?.description);
      this.editPostForm.controls['department'].setValue(this.currentPost?.department);
      this.editPostForm.controls['position'].setValue(this.currentPost?.position);

    })

  }

  onDelete(){
    Swal.fire({
      title: 'คุณต้องการลบโพสต์หรือไม่ ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobPostService.deletePost(this.id).subscribe((res)=>{
          Swal.fire(
            'Deleted!',
            'ลบโพสต์เสร็จสิ้น',
            'success'
          )
          this.router.navigate([`/jobpost/company/${this.currentPost.company_id}`]);
        })
      }
    })
  }

  changeStatus(){
    let title = "";
    let text = "";
    if(this.postActive){
      title = "คุณต้องการปิดรับสมัครหรือไม่ ?"
      text = "ปิดโพสต์รับสมัครแล้ว";
    }else{
      title = "คุณต้องการเปิดรับสมัครหรือไม่ ?"
      text = "เปิดโพสต์รับสมัครแล้ว";
    }
    Swal.fire({
      title: title,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobPostService.updatePostStatus(this.id).subscribe((res)=>{
          Swal.fire(
            'Update!',
            text,
            'success'
          )
          window.location.reload();
        })
      }
    })
  }

}
