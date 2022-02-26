import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private url = `${environment.serviceUrl}/position`

  constructor(private http: HttpClient) { }

  getPositions() : any{
    return this.http.get<any>(this.url);
  }

  getPositionById(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  addPosition(position:any){
    return this.http.post<any>(this.url,position)
    .pipe(map((res)=>{
      return res;
    }))
  }

  updatePosition(id:any,position:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,position)
    .pipe(map((res)=>{
      return res;
    }))
  }

  deletePosition(id:any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }


}
