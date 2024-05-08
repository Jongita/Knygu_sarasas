import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable()

export class authInterceptor implements HttpInterceptor {

  constructor (private authService: AuthServiceService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interseptorius paleistas");
    // patikrinam ar esam prisijunge
    if (this.authService.auth!=null){
    let newreq=req.clone({
      params:req.params.append("auth", this.authService.auth.idToken)
    });
    // perduodame modifikuota requesta
    return next.handle(newreq);
  }

    // issiunciam http requesta tolyn, nemodifikuota
    return next.handle(req)
    // throw new Error('Method not implemented.');
  }
}
