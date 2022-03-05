import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url = `${environment.serviceUrl}/member`
  
  constructor(private http: HttpClient) { }

  login(login: any) {
    return this.http.post<any>(`${this.url}/login`,
      login)
      .pipe(map((res) => {
        return res;
      }));
  }

  register(member:any){
    return this.http.post<any>(`${this.url}/register`,
    member)
      .pipe(map((res) => {
        return res;
      }));
  }

  getMembers() : any{
    return this.http.get<any>(this.url);
  }

  getMemberById(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  updateMember(id:any,member:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,member)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updatePic(id:any,pic:any){
    let getUrl = `${this.url}/profile/update/${id}`;
    return this.http.patch<any>(getUrl,pic)
    .pipe(map((res)=>{
      return res;
    }));
  }

  updateAddress(id:any,address:any){
    let getUrl = `${this.url}/address/update/${id}`;
    return this.http.patch<any>(getUrl,address)
    .pipe(map((res)=>{
      return res;
    }));
  }

  addEducation(id:any,education:any){
    let getUrl = `${this.url}/education/add/${id}`;
    return this.http.patch<any>(getUrl,education)
    .pipe(map((res)=>{
      return res;
    }));
  }

  deleteEducation(id:any,eduId:any){
    let getUrl = `${this.url}/education/delete/${id}`;
    return this.http.patch<any>(getUrl,eduId)
    .pipe(map((res)=>{
      return res;
    }));
  }

  deleteMember(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl)
    .pipe(map((res)=>{
      return res;
    }));
  }

}
