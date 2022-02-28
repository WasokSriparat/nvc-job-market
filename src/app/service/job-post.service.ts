import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {
  private url = `${environment.serviceUrl}/jobpost`

  constructor(private http: HttpClient) { }

  getJobPosts() : any{
    return this.http.get<any>(this.url);
  }

  getJobPostById(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  getJobPostByTitle(titel:any){
    let getUrl = `${this.url}/title/${titel}`;
    return this.http.get<any>(getUrl);
  }

  getJobPostByCompanyId(id:any){
    let getUrl = `${this.url}/company/${id}`;
    return this.http.get<any>(getUrl);
  }

  addJobPost(jobPost:any){
    return this.http.post<any>(this.url,jobPost)
    .pipe(map((res)=>{
      return res;
    }))
  }

  updateJobPost(id:any,jobPost:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,jobPost)
    .pipe(map((res)=>{
      return res;
    }))
  }

  addApplicant(id:any,applicant:any){
    let getUrl = `${this.url}/applicant/add/${id}`;
    return this.http.patch<any>(getUrl,applicant)
    .pipe(map((res)=>{
      return res;
    }))
  }

  updatePostStatus(id:any){
    let getUrl = `${this.url}/update/status/${id}`
    return this.http.patch<any>(getUrl,null)
    .pipe(map((res)=>{
      return res;
    }))
  }

  deletePost(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

}
