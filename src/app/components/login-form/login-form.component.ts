import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  public isLoginMode=true;
  public email:string|null=null;
  public password:string|null=null;

  public constructor(private authService:AuthServiceService, private router:Router){

  } 
  public changeMode(){
    this.isLoginMode=! this.isLoginMode;
  }

  public login(){
    if (this.email!=null && this.password!=null){
      this.authService.register(this.email, this.password, !this.isLoginMode).subscribe(
        (response)=>{
          this.router.navigate(['list']);
        }
      )
    }
    

  }

}