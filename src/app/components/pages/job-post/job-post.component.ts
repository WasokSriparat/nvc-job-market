import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

  jobPosts:any;
  title:any;
  searchForm!: FormGroup;

  constructor(private jobpostService: JobPostService, 
    private router : Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.searchForm = new FormGroup({
      title: new FormControl()
    })

    this.activatedRouter.params.subscribe((params)=>{
      this.title = params['title'];
    })

    if(this.title == null || this.title == "null"){
      this.jobpostService.getJobPosts().subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }else{
      this.jobpostService.getJobPostByTitle(this.title).subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }


  }

  onSearch(){
    if(this.searchForm.value.title == null || this.searchForm.value.title == "" || this.searchForm.value.title == " "){
      this.jobpostService.getJobPosts().subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }else{
      this.title = this.searchForm.value.title;
      this.jobpostService.getJobPostByTitle(this.title).subscribe((res:any)=>{
        this.jobPosts = res.data;
      })
    }
    
  }

}
