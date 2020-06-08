import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Books } from '../models/books.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  items: any;
  books: Books[];
  loading;
  queryField: FormControl = new FormControl();
  onBorrowed = false;

  constructor(private bookService: BooksService) {}

  ngOnInit() {
    this.loading = false;
    this.queryField.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((queryField: any) => {
        let te = queryField.replace(/\s/g, '');
        console.log(te);
        if (te.length > 2) {
          this.bookService.getBook(queryField).subscribe((result: any) => {
            this.loading = true;
            setTimeout(() => {
              this.items = result.items;
              console.log(this.items);
            }, 200);
          });
        }
      });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  onBorrow() {
    console.log('Emprunter');
  }
}
