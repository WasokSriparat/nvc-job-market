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
  applicantForm!: FormGroup;

  id:any;

  currentPost:any;
  currentUser:any;
  positions: any;
  departments: any;
  myApply: any;

  statusMember = false;
  memberData =  false;
  statusEditer = false;
  statusPoster = false;
  statusApply = false;
  postActive = true;

  constructor(
    private jobPostService: JobPostService,
    private router : Router,
    private activatedRouter: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private positionService: PositionService,
    private departmentService: DepartmentService, 
  ) { }

  ngOnInit(): void {
    
    this.applicantForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      description: new FormControl()
      
    })

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();

      if (this.currentUser.category == "member"){
        this.statusMember = true;


        if(this.currentUser.phoneNumber == null || this.currentUser.address == null){
          this.memberData = true;
        }
        

        this.applicantForm.controls['firstName'].setValue(this.currentUser?.firstName);
        this.applicantForm.controls['lastName'].setValue(this.currentUser?.lastName);

      }else if(this.currentUser?.category == 'admin'){
        this.statusEditer = true;
      }

    }

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

      if(this.statusMember){
        for(let a of this.currentPost.applicants){
          if(a.member_id == this.currentUser._id){
            this.statusApply = true;
            this.myApply = a;
          }
        }
      }

    })

    this.departmentService.getDepartments().subscribe((res:any)=>{
      this.departments = res.data;
    });

    this.positionService.getPositions().subscribe((res:any)=>{
      this.positions =  res.data;
      
    });

    

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
          this.router.navigate([`/jobpost/search`]);
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

  onApply(){

    if(this.memberData){
      Swal.fire({
        icon: 'warning',
        title: 'ไม่สามารถสมัครได้',
        text: 'กรุณากรอกข้อมูลส่วนตัวให้ครบ',
        footer: '<a href="/profile/edit">แก้ไข ข้อมูลส่วนตัว</a>'
      })
    }else{
      let applicant = {
        member_id: this.currentUser._id,
        memberName: `${this.applicantForm.value.firstName} ${this.applicantForm.value.lastName}`,
        description: this.applicantForm.value.description
      }
      Swal.fire({
        title: "คุณต้องการสมัครงานนี้หรือไม่ ?",
        text: "",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน'
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobPostService.addApplicant(this.id,applicant).subscribe((res)=>{
            Swal.fire(
              'Success!',
              "สมัครสำเร็จ",
              'success'
            )
            window.location.reload();
          })
        }
      })
    }

    
  }

  updateApplicant(applicantId:any,status:any){
    let applicant = {
      applicant_id:applicantId,
      status:status
    }
    console.log(this.id,applicant)
    this.jobPostService.updateApplicantStatus(this.id,applicant).subscribe((res)=>{
      Swal.fire(
        'Success!',
        "ยืนยันสำเร็จ",
        'success'
      )
      window.location.reload();
    })
    
  } 

  deleteApplicant(applicantId:any){
    let applicant = {
      applicant_id : applicantId
    }
    Swal.fire({
      title: "คุณต้องการยกเลิกการสมัครงานนี้หรือไม่ ?",
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobPostService.deleteApplicant(this.id,applicant).subscribe((res)=>{
          Swal.fire(
            'Success!',
            "ยกเลิกสำเร็จ",
            'success'
          )
          window.location.reload();
        })
      }
    })
    
  }

}
