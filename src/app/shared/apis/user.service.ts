import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login.model';
import { environment } from '../../../environments/environment';
import { LoginUserDTO } from '../interfaces/login-user.dto';
import { Observable } from 'rxjs';
import { RegisterInterface } from '../models/register.model';
import { RegisterUserDTO } from '../interfaces/register-user.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string ='';

  constructor(
    private http: HttpClient,
  ) { 
    this.api = environment.apiUrl
  }

  userLogin(loginData: LoginInterface) : Observable<LoginUserDTO> {
    return this.http.get<LoginUserDTO>(`${this.api}/user/?username=${loginData.username}&password=${loginData.password}`);
  }

  userCreate(registerData: RegisterInterface) : Observable<RegisterUserDTO> {    
    return this.http.post<RegisterUserDTO>(`${this.api}/user/`,registerData);
  }



}
