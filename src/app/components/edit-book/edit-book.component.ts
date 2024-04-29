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
      //Paimame aktyvaus kelio, parametrą id
    this.id=route.snapshot.params['id']
    // Uzkrauname viena irasa
    this.booksService.loadRecord(this.id).subscribe((data)=>{
      this.author=data.author;
      this.description=data.description;
      this.year=data.year;
      this.status=data.status;
      
      console.log(data);
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
      // po issaugojimo vartotoja nukreipia i sarasa
      this.router.navigate(['list'])
    });
  }
}
}
