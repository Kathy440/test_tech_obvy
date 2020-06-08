import { Component, OnInit, OnDestroy, COMPILER_OPTIONS } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Borrower } from '../models/borrower.model';
import { BooksService } from '../services/books.service';

import { Subscription } from 'rxjs';
import { BorrowerService } from '../services/borrower.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  borrewed: Borrower[] = [];
  borrewedSubcription: Subscription;
  single;

  showValidation = false;

  borrewedForm: FormGroup;

  private blogID: string;

  constructor(
    private router: Router,
    private borrewedService: BorrowerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public bookService: BooksService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.params['product'];
    const slugURL = slug.split('-');
    this.blogID = slugURL.pop();

    this.initForm();
    this.singleBook();

    this.borrewedSubcription = this.borrewedService.borrewedSubject.subscribe(
      (borrewed: Borrower[]) => {
        this.borrewed = borrewed;
      }
    );
    this.borrewedService.getBorrewed(this.blogID);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  singleBook() {
    this.bookService.getUserData(this.blogID).subscribe(response => {
      this.single = response;
    });
  }

  initForm() {
    this.borrewedForm = this.formBuilder.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      rendue: ['', Validators.required],
      commentaire: ['', Validators.required]
    });
  }
  onSubmitForm() {
    const formValue = this.borrewedForm.value;
    const newBorrower = new Borrower(
      formValue['id'],
      formValue['nom'],
      formValue['date'],
      formValue['rendue'],
      formValue['commentaire']
    );
    this.singleBook();
    this.borrewedService.addBorrewed(newBorrower, this.blogID);
  }

  ngOnDestroy() {
    this.borrewedSubcription.unsubscribe();
  }
}
