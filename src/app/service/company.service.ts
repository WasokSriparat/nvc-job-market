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
}
