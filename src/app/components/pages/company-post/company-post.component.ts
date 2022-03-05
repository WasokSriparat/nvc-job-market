import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from 'src/app/service/job-post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-company-post',
  templateUrl: './company-post.component.html',
  styleUrls: ['./company-post.component.css']
})
export class CompanyPostComponent implements OnInit {

  jobPosts:any;
  id:any;
  isLoggedIn = false;
  currentUser:any;
  statusAdmin = false;

  constructor(private jobpostService: JobPostService, 
    private router : Router,
    private activatedRouter: ActivatedRoute,
    private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      this.id = this.currentUser._id;
      if(this.currentUser.category == 'admin'){
        this.statusAdmin = true;
      }
    }

    if(this.statusAdmin){
      this.jobpostService.getJobPosts().subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }else{
      this.jobpostService.getJobPostByCompanyId(this.id).subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }
    

  }

}
