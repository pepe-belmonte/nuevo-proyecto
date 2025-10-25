import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private _isLogged: BehaviorSubject<boolean>;
  private homeRoute: string  = '/';
  private loginRoute: string  = '/login';

  constructor(
    private router: Router,
  ) { 
    this._isLogged = new BehaviorSubject<boolean>(false);
  }

  // observable para cambio de estado
  public getLogged(): Observable<boolean> {
    return this._isLogged.asObservable();
  }

  // cambia el estado
  public setLogged(newValue: boolean) {
    if (newValue != this._isLogged.value) {
      this._isLogged.next(newValue);
    }
  }

  // comprueba si está logado y si hay que cambiar estado
  public isLogged() {
    if (this.getToken()) {
      this.setLogged(true);
    }else{
      this.setLogged(false);
    }
    return this._isLogged.value;
  }

  // recupera los datos d eusuario, 
  // se simula el token en base64, debería utilizarse JWT
  public getToken() : any {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token));
    }else{
      return false;
    }
  }

  public setToken(token: any) {
    localStorage.setItem('token', token);
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public login(newToken: string ) {
    this.setToken(newToken);
    this.setLogged(true);
  }

  public logout() {
    this.removeToken();
    this.setLogged(false);
    this.goToLogin();
  }

  public goToLogin() {
    this.removeToken();
    this.router.navigate([this.loginRoute]);
  }

  public goToHome() {
    this.router.navigate([this.homeRoute]);
  }


}
