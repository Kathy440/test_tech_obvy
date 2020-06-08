import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  key = 'AIzaSyDMLbqmku8J9Nvrx92zMaI02PeMgnjajTM';
  constructor(private httpClient: HttpClient) {}

  getBook(queryField: string) {
    return this.httpClient.get(
      `https://www.googleapis.com/books/v1/volumes?q=${queryField}&maxResults=39&keyes&key=${this.key}`
    );
  }
  getUserData(blogID) {
    return this.httpClient.get(
      `https://www.googleapis.com/books/v1/volumes/${blogID}`
    );
  }
}
