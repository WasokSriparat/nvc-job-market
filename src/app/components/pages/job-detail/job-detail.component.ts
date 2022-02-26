import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { PositionService } from 'src/app/service/position.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

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

      if(this.currentPost.company_id == this.currentUser?._id ){
        this.statusEditer = true;  
        this.statusPoster = true;
      }

    })

    

  }
}
