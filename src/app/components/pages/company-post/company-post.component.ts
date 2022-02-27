import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPostService } from 'src/app/service/job-post.service';

@Component({
  selector: 'app-company-post',
  templateUrl: './company-post.component.html',
  styleUrls: ['./company-post.component.css']
})
export class CompanyPostComponent implements OnInit {

  jobPosts:any;
  id:any;

  constructor(private jobpostService: JobPostService, 
    private router : Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    // this.searchForm = new FormGroup({
    //   title: new FormControl()
    // })

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    })

    this.jobpostService.getJobPostByCompanyId(this.id).subscribe((res:any)=>{
      this.jobPosts = res.data;
    })

  }

  // onSearch(){
  //   if(this.searchForm.value.title == null || this.searchForm.value.title == "" || this.searchForm.value.title == " "){
  //     this.jobpostService.getJobPosts().subscribe((res:any)=>{
  //       this.jobPosts = res.data;
  //     })
  //   }else{
  //     this.title = this.searchForm.value.title;
  //     this.jobpostService.getJobPostByTitle(this.title).subscribe((res:any)=>{
  //       this.jobPosts = res.data;
  //     })
  //   }
    
  // }

}
