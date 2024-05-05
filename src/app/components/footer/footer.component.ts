import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number=0;

  constructor (private booksService:BooksService){
    this.loadCount();
    this.booksService.onBooksCountChange.subscribe(()=>this.loadCount());
}
private loadCount(){
    this.booksService.loadData().subscribe((data)=>{
      this.count=data.length;
    });
  }

}
