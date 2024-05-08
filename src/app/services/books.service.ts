import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books:Book[]=[];

  public onBooksCountChange=new EventEmitter();
  public onStatusChange=new EventEmitter<Number>();

  constructor(private http:HttpClient, private authService:AuthServiceService) { }

  public addBook(item:Book){
    this.books.push(item);
    // return this.http.post("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth="+this.authService.auth?.idToken,item).pipe(
   
    return this.http.post("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=",item).pipe(
      tap(()=>this.onBooksCountChange.emit())
    );
  }

//   public loadData(){
//   return this.http.get<{[key:string]:Book}>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json")
//     .pipe(
//       map((data): Book[] => {
//         let books = [];
//         for (let x in data) {
//           books.push({...data[x], id: x });
//         }
//         this.books = books;
//         return books;
//       }),
//       catchError((err, obser)=>{
//         console.log('Klaida');
        
//         throw 'Klaida';
//       }),
//       delay(1000)
//     )
// }


  public loadData(){
    // return this.http.get<{[key:string]:Book}>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth="+this.authService.auth?.idToken)

    return this.http.get<{[key:string]:Book}>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books.json")
    .pipe(
      map( (data):Book[]=>{
      let books=[];
      for(let x in data){
      books.push({...data[x], id:x });
     }
     this.books=books;
     return books;
    }))
    .pipe(
        catchError( (er,c)=>{ 
          this.onStatusChange.emit(1);
          throw "Klaida";
        })
      )   
    .pipe(
        delay(1000)
      )
  }


  

  public loadRecord(id:string){
    // return this.http.get<Book>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+id+".json?auth="+this.authService.auth?.idToken);
    // su interseptoriumi nebereikalinga si dalis
    return this.http.get<Book>("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+id+".json");
    
  }

  public updateRecord(item:Book){
    // return this.http.patch("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+item.id+".json?auth="+this.authService.auth?.idToken, item);

    return this.http.patch("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+item.id+".json", item);
  }

  public deleteRecord(id:string){
    // return this.http.delete("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+id+".json?auth="+this.authService.auth?.idToken).pipe(

    return this.http.delete("https://knygu-sarasas-default-rtdb.europe-west1.firebasedatabase.app/books/"+id+".json").pipe(
      tap(()=>this.onBooksCountChange.emit())
    );
  }
}
