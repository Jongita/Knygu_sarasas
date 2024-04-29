import { Routes } from '@angular/router';
import { ListOfBooksComponent } from './components/list-of-books/list-of-books.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';

export const routes: Routes = [
    {path:"list", component:ListOfBooksComponent},
    {path:"addnew", component:AddNewBookComponent}
];
