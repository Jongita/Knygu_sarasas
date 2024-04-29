import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books:Book[]=[];

  constructor(private http:HttpClient) { }

  private addTodataBase(item:Book){
    this.http.post("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json",item).subscribe(()=>{});
  }

  public addBook(item:Book){
    this.books.push(item);
    this.addTodataBase(item);
  }

  public loadData(){
    return this.http.get<{[key:string]:Book}>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json");
  }
}
