// accounts.component.ts
import { Component } from '@angular/core';

interface AccountOperationDTO {
  id: number;
  operationDate: string;
  type: string;
  amount: number;
}

interface AccountDetails {
  id: string;
  balance: number;
  accountOperationDTOS: AccountOperationDTO[];
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  // Dummy static data to show in the template
  accountDetails: AccountDetails = {
    id: '123456',
    balance: 2500.75,
    accountOperationDTOS: [
      { id: 1, operationDate: '2025-05-17T10:30:00', type: 'DEBIT', amount: 100 },
      { id: 2, operationDate: '2025-05-16T14:20:00', type: 'CREDIT', amount: 250 },
      { id: 3, operationDate: '2025-05-15T09:10:00', type: 'TRANSFER', amount: 300 }
    ]
  };

  // No backend calls, no observables
}
