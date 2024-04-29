import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.css'
})
export class ListOfBooksComponent {
public books:Book[]=[];



public constructor(private booksService:BooksService){
  // this.books=booksService.books;
  this.loadData();
  }

  private loadData(){
    let x=this.booksService.loadData();
  
  this.booksService.loadData().subscribe((data)=>{
    this.books=[];
    // x yra ID: 
    for(let x in data){
       this.books.push({...data[x], id:x });
    }
     console.log(this.books);
  });
  }

  public deleteRecord(id:string|null){
    if (id!=null){
    this.booksService.deleteRecord(id).subscribe(()=>{
      this.loadData();

    })
  }
  }
}


