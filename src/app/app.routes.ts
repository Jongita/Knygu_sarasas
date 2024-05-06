import { Routes } from '@angular/router';
import { ListOfBooksComponent } from './components/list-of-books/list-of-books.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { MainListComponent } from './components/main-list/main-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

export const routes: Routes = [
    {path: '', component:LoginFormComponent},
    {path:"list", component:ListOfBooksComponent},
    {path:"addnew", component:AddNewBookComponent},
    {path:"edit/:id", component:EditBookComponent}
];
