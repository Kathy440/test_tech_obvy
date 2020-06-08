import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  single;
  slug;
  sub;
  date;
  constructor(
    private route: ActivatedRoute,
    public bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.singleBlog();
  }

  singleBlog() {
    this.slug = this.route.snapshot.params['product'];
    const slugURL = this.slug.split('-');
    const blogID = slugURL.pop();
    console.log(blogID);
    this.bookService.getUserData(blogID).subscribe(response => {
      this.single = response;
    });
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }

  goBorrower() {
    this.router.navigate(['borrow/:product']);
  }
}
