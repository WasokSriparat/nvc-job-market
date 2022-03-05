import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = `${environment.serviceUrl}/company`
  
  constructor(private http: HttpClient) { }

  login(login: any) {
    return this.http.post<any>(`${this.url}/login`,
      login)
      .pipe(map((res) => {
        return res;
      }));
  }

  register(company:any){
    return this.http.post<any>(`${this.url}/register`,
    company)
      .pipe(map((res) => {
        return res;
      }));
  }

  getCompanies() : any{
    return this.http.get<any>(this.url);
  }

  getCompanyById(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  updateCompany(id:any,company:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,company)
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

  deleteCompany(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl)
    .pipe(map((res)=>{
      return res;
    }));
  }

}
