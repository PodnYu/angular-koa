import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  APIUrl = 'http://localhost:5007';
  departmentAPIUrl = `${this.APIUrl}/departments/`;
  employeeAPIUrl = `${this.APIUrl}/employees/`;
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http
      .get<any>(this.departmentAPIUrl)
      .pipe(map((data) => data.departments));
  }

  addDepartment(body: any): Observable<any> {
    return this.http.post<any>(this.departmentAPIUrl, body);
  }

  updateDepartment(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.departmentAPIUrl}${id}`, body);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.departmentAPIUrl}${id}`);
  }

  getEmployees(): Observable<any[]> {
    return this.http
      .get<any>(this.employeeAPIUrl)
      .pipe(map((data) => data.employees));
  }

  addEmployee(body: any): Observable<any> {
    return this.http.post<any>(this.employeeAPIUrl, body);
  }

  updateEmployee(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.employeeAPIUrl}${id}`, body);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.employeeAPIUrl}${id}`);
  }
}
