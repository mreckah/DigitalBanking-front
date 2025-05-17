import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewCustomerComponent {
  customerForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  handleAddCustomer() {
    console.log('Form submitted:', this.customerForm.value);
    console.log('Form valid:', this.customerForm.valid);
    
    if (this.customerForm.valid) {
      const customer = this.customerForm.value;
      console.log('Sending customer data:', customer);
      
      this.customerService.saveCustomer(customer).subscribe({
        next: (response) => {
          console.log('Customer saved successfully:', response);
          this.router.navigateByUrl('/customers');
        },
        error: (err) => {
          console.error('Error saving customer:', err);
          this.errorMessage = err.message || 'An error occurred while saving the customer';
        }
      });
    } else {
      console.log('Form validation errors:', this.customerForm.errors);
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }
} 