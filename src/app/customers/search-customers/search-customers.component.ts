import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer.model';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchCustomersComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  errorMessage!: string;
  searchKeyword: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }

  searchCustomers(): void {
    if (this.searchKeyword.trim()) {
      this.customers$ = this.customerService.searchCustomers(this.searchKeyword).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(() => err);
        })
      );
    } else {
      this.loadCustomers();
    }
  }
} 