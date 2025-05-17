import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  errorMessage!: string;
  customerId!: number;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email
        });
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error loading customer';
      }
    });
  }

  handleUpdateCustomer(): void {
    if (this.customerForm.valid) {
      const updatedCustomer = {
        ...this.customerForm.value,
        id: this.customerId
      };

      this.customerService.updateCustomer(this.customerId, updatedCustomer).subscribe({
        next: () => {
          this.router.navigateByUrl('/customers');
        },
        error: (err) => {
          this.errorMessage = err.message || 'Error updating customer';
        }
      });
    }
  }
} 