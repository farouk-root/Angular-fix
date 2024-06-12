import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ims } from '../model/ims';
@Injectable({
  providedIn: 'root'
})
export class ImsService {
  private baseUrl = 'http://localhost:8002/ims';
  constructor(private http: HttpClient) { }

  getAllIms(): Observable<Ims[]> {
    return this.http.get<Ims[]>(`${this.baseUrl}`);
  }
  getImsById(id:number):Observable<Ims>{
    return this.http.get<Ims>(`${this.baseUrl}/${id}`);
  }
  createIms(ims: Ims): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, ims);
  }
  deleteIms(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateIms(id: number, updateData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updateData);
  }
}
