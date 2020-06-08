import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { FormComponent } from '../form/form.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'detail/:product', component: BookDetailComponent },
  { path: 'borrow/:product', component: FormComponent },
  { path: 'home', component: BookListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
