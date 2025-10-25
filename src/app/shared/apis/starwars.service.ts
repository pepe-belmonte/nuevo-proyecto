import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login.model';
import { environment } from '../../../environments/environment';
import { LoginUserDTO } from '../interfaces/login-user.dto';
import { Observable } from 'rxjs';
import { RegisterInterface } from '../models/register.model';
import { RegisterUserDTO } from '../interfaces/register-user.dto';
import { StarshipsListDTO } from '../interfaces/starships-list.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  api: string ='';

  constructor(
    private http: HttpClient,
  ) { 
    this.api = environment.apiUrlStarWars
  }

  getStarships(params: string) : Observable<StarshipsListDTO> {
    return this.http.get<StarshipsListDTO>(`${this.api}/starships/${params}`);
  }


}
