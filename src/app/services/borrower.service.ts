import { Injectable } from '@angular/core';
import { Borrower } from '../models/borrower.model';

import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  private borreweds: Borrower[] = [];
  borrewedSubject = new Subject<Borrower[]>();

  showValidation = false;

  constructor(
    private storageService: StorageService,
    public bookService: BooksService
  ) {}

  emitBorrewed() {
    this.borrewedSubject.next(this.borreweds);
  }

  addBorrewed(borrewed: Borrower, key: string) {
    this.borreweds.push(borrewed);
    this.storageService.set(key, JSON.stringify(this.borreweds));
    this.showValidation = !this.showValidation;
    console.log(this.showValidation);

    this.emitBorrewed();
  }

  getBorrewed(key: string) {
    const _borreweds = this.storageService.get(key);
    this.borreweds = _borreweds ? (JSON.parse(_borreweds) as Borrower[]) : [];
    this.showValidation = !this.showValidation;
    this.emitBorrewed();
  }
}
