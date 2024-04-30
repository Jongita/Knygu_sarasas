import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  public id:string;
  public author:string|null=null;
  public description:string|null=null;
  public year:string|null=null;
  public status:string|null=null;

  constructor(route:ActivatedRoute, private router:Router, private booksService:BooksService){
      
    this.id=route.snapshot.params['id']
  
    this.booksService.loadRecord(this.id).subscribe((data)=>{
      this.author=data.author;
      this.description=data.description;
      this.year=data.year;
      this.status=data.status;
    });
  }

  public updateRecord() {
    if(this.author!=null && this.description!=null && this.year!=null && this.status!=null){
      const record:Book={
      id:this.id,
      author:this.author,
      description:this.description,
      year:this.year,
      status:this.status
    }
    this.booksService.updateRecord(record).subscribe(()=>{
      this.router.navigate(['list'])
    });
  }
}
}
