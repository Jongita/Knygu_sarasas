import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-book.component.html',
  styleUrl: './add-new-book.component.css'
})
export class AddNewBookComponent {
    author:string|null=null;
    description:string|null=null;
    year:string|null=null;
    status:string|null=null;

    public constructor(private booksService:BooksService){

    }

    public addBook(){
      if (this.author!=null && this.description!=null && this.year!=null && this.status!=null ){
        this.booksService.addBook({
        author:this.author,
        description:this.description,
        year:this.year,
        status:this.status,
        id:null,
      }).subscribe(()=>{
        this.author=null;
        this.description=null;
        this.year=null;
        this.status=null;
      });
      }
    }
}
