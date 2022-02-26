import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from 'src/app/service/job-post.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-job-post-edit',
  templateUrl: './job-post-edit.component.html',
  styleUrls: ['./job-post-edit.component.css']
})
export class JobPostEditComponent implements OnInit {

  currentPost:any;
  id:any;

  constructor(private service: JobPostService, private router : Router,private activatedRouter: ActivatedRoute, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    })

    this.service.getJobPostById(this.id).subscribe((res)=>{
      this.currentPost = res.data
    })

  }

}
