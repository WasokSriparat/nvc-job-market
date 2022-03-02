import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from 'src/app/service/job-post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.css']
})
export class JobRegisterComponent implements OnInit {

  jobPosts:any;
  id:any;
  isLoggedIn = false;
  currentUser:any;

  constructor(private jobpostService: JobPostService, 
    private router : Router,
    private activatedRouter: ActivatedRoute,
    private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      this.id = this.currentUser._id;
    }

    this.jobpostService.getJobPostByMemberId(this.id).subscribe((res:any)=>{
      this.jobPosts = res.data;
    })

  }

}
