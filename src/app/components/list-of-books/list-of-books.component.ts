import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorComponent],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.css'
})
export class ListOfBooksComponent {
public books:Book[]=[];

public isLoading=false;
public isError=false;

public constructor(private booksService:BooksService){
 
  this.loadData();
  }

  private loadData(){
    // let x=this.booksService.loadData();
  
  let obs=this.booksService.loadData();

  this.isLoading=true;
  this.isError=false;

  obs.subscribe({
      next:(data)=>{
        this.books=data;
        this.isLoading=false;
        this.isError=false;
      },
      error:(error)=>{
        this.isError=true;
        this.isLoading=false;
      }
      
    });
  }

  public deleteRecord(id:string|null){
    if (id!=null){
    this.isLoading=true;
    this.booksService.deleteRecord(id).subscribe(()=>{
      this.loadData();

    });
  }
  }
  public closeError(){
    this.loadData();
  }

}


