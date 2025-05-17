// accounts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AccountsService } from "../services/accounts.service";
import { catchError, Observable, throwError } from "rxjs";
import { AccountDetails, AccountHistory } from '../model/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AccountsComponent implements OnInit {
  accounts!: AccountDetails[];
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  selectedAccount!: AccountDetails;
  accountHistoryObservable!: Observable<AccountHistory>;
  operationFromGroup!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private accountService: AccountsService) { }

  ngOnInit(): void {
    this.loadAccounts();
    this.initForms();
  }

  initForms() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('', [Validators.required])
    });

    this.operationFromGroup = this.fb.group({
      operationType: this.fb.control(null, [Validators.required]),
      amount: this.fb.control(0, [Validators.required, Validators.min(0)]),
      description: this.fb.control(null, [Validators.required]),
      accountDestination: this.fb.control(null)
    });

    // Add conditional validation for accountDestination
    this.operationFromGroup.get('operationType')?.valueChanges.subscribe(value => {
      const accountDestinationControl = this.operationFromGroup.get('accountDestination');
      if (value === 'TRANSFER') {
        accountDestinationControl?.setValidators([Validators.required]);
      } else {
        accountDestinationControl?.clearValidators();
      }
      accountDestinationControl?.updateValueAndValidity();
    });
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error(err);
      }
    });
  }

  handleSearchAccount() {
    if (this.accountFormGroup.valid) {
      const accountId = this.accountFormGroup.value.accountId;
      this.accountService.getAccount(accountId).subscribe({
        next: (account) => {
          this.selectedAccount = account;
          this.loadAccountOperations(accountId);
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.error(err);
        }
      });
    }
  }

  selectAccount(account: AccountDetails) {
    this.selectedAccount = account;
    this.loadAccountOperations(account.id);
  }

  loadAccountOperations(accountId: string) {
    this.accountHistoryObservable = this.accountService.getAccountOperations(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    if (this.selectedAccount) {
      this.loadAccountOperations(this.selectedAccount.id);
    }
  }

  handleAccountOperation() {
    if (this.operationFromGroup.valid && this.selectedAccount) {
      const accountId = this.selectedAccount.id;
      const operationType = this.operationFromGroup.value.operationType;
      const amount = this.operationFromGroup.value.amount;
      const description = this.operationFromGroup.value.description;
      const accountDestination = this.operationFromGroup.value.accountDestination;

      if (operationType === 'DEBIT') {
        this.accountService.debit(accountId, amount, description).subscribe({
          next: () => {
            alert("Success Debit");
            this.operationFromGroup.reset();
            this.loadAccounts();
            this.loadAccountOperations(accountId);
          },
          error: (err) => {
            this.errorMessage = err.message || "Error performing debit operation";
            console.error(err);
          }
        });
      } else if (operationType === 'CREDIT') {
        this.accountService.credit(accountId, amount, description).subscribe({
          next: () => {
            alert("Success Credit");
            this.operationFromGroup.reset();
            this.loadAccounts();
            this.loadAccountOperations(accountId);
          },
          error: (err) => {
            this.errorMessage = err.message || "Error performing credit operation";
            console.error(err);
          }
        });
      } else if (operationType === 'TRANSFER') {
        if (!accountDestination) {
          this.errorMessage = "Destination account is required for transfer";
          return;
        }
        this.accountService.transfer(accountId, accountDestination, amount).subscribe({
          next: () => {
            alert("Success Transfer");
            this.operationFromGroup.reset();
            this.loadAccounts();
            this.loadAccountOperations(accountId);
          },
          error: (err) => {
            this.errorMessage = err.message || "Error performing transfer operation";
            console.error(err);
          }
        });
      }
    }
  }
}
