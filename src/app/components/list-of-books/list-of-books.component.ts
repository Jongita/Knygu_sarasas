import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.css'
})
export class ListOfBooksComponent {
public books:Book[]=[];

public constructor(private booksService:BooksService){
  // this.books=booksService.books;
  this.booksService.loadData().subscribe((data)=>{
    for(let x in data){
      this.books.push(data[x]);
    }
  })
  }
}
