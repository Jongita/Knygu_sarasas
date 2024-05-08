import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthResponseData } from '../models/AuthResponseData';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public auth:AuthResponseData|null=null;
  public isLoggedin=false;
  public onUserStatusChange=new EventEmitter<boolean>();


  constructor(private http:HttpClient, private router:Router) { 

  }

  public register(email:string, password:string, newUser:boolean){
    let method=(newUser)?'signUp': 'signInWithPassword';

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+method+'?key=AIzaSyDAOFW3FohZxSQ7YceDoodxbCs1a36g8ew', {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap( (response)=>{
      this.auth=response;
      this.isLoggedin=true;
      // isaugome duomenis prisijungimo
      localStorage.setItem("user", JSON.stringify(this.auth));
      this.onUserStatusChange.emit(true);
    }));
  }

  // prisijungimas panaudojant duomenis is localstorage
  public autoLogin(){
    let user = localStorage.getItem("user");
    // patikriname ar esam prisijunge
    if (user!=null){
      this.auth=JSON.parse(user);
      this.isLoggedin=true;
      this.onUserStatusChange.emit(true);
    }
  }

  public logout(){
    this.isLoggedin=false;
    this.auth=null;
    // istriname prisijungimo duomenis
    localStorage.removeItem("user")
    this.onUserStatusChange.emit(false);
    this.router.navigate(['/']);
  }
}
 



