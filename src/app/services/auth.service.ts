import { User } from './../models/user.model';
import { ResponseLogin } from './../models/auth.model';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { switchMap, tap, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.API_URL;
  //Guarda el perfil del usuario y puede 
  //destruir cualquier componente  de forma reactiva (guarda un estado general)
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/login`,{
      email, password
    })
    .pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token);
      })
    );
  }

  register(name: string, email:string, password: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/register`,{
      name,email, password 
    });
  }
  registerAndLogin(name: string, email:string, password: string){
    return this.register(name,email, password)
    .pipe(
      switchMap(()=> this.login(email, password))
    );

  }

  isAvailable(email:string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiURL}/api/v1/auth/is-available`,{
      email
    });
  }

  recovery(email:string){
    return this.http.post(`${this.apiURL}/api/v1/auth/recovery`,{
      email
    });
  }

  
  changePassword(token: string, newPassword: string){
    return this.http.post(`${this.apiURL}/api/v1/auth/change-password`,{
      token,newPassword
    });
  }
  
  getProfile(){
    const token = this.tokenService.getToken();
    return this.http.get<User>(`${this.apiURL}/api/v1/auth/profile`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(user => {
        this.user$.next(user);
      }));
  }
  logout(){
    this.tokenService.removeToken();
  }
}
