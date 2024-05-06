import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public isLoggedin=false;

  public constructor(private authService:AuthServiceService){
    this.authService.onUserStatusChange.subscribe( (isLoggedin)=>{
      this.isLoggedin=isLoggedin;
    });
  }

  public onClickLogout(){
    this.authService.logout();
  }

}
