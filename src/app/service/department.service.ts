import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = `${environment.serviceUrl}/department`

  constructor(private http: HttpClient) { }

  getDepartments() : any{
    return this.http.get<any>(this.url);
  }

  getDepartmentById(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  addDepartment(department:any){
    return this.http.post<any>(this.url,department)
    .pipe(map((res)=>{
      return res;
    }))
  }

  updateDepartment(id:any,department:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,department)
    .pipe(map((res)=>{
      return res;
    }))
  }

  deleteDepartment(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }
}
