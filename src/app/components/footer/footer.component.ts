import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number=0;
  public isError=false;
  public isLoggedin=false;

  constructor (private booksService:BooksService, private authService:AuthServiceService){
    if (this.authService.isLoggedin){
      this.loadCount();
    }
    this.booksService.onBooksCountChange.subscribe(()=>this.loadCount());
    this.booksService.onStatusChange.subscribe(
    (status)=>{
        if (status==0){
          this.isError=false;
        }else{
          this.isError=true;
          
        }
      
      }
    );
    this.authService.onUserStatusChange.subscribe( (isLoggedin)=>{
      this.isLoggedin=isLoggedin;
      if (isLoggedin==true) this.loadCount();
    }); 
  }

    private loadCount(){
    this.booksService.loadData().subscribe((data)=>{
      this.count=data.length;
      this.isError=false;
    });
  }

}
