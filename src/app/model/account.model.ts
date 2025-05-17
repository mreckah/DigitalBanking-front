export interface AccountDetails {
  id: string;
  balance: number;
  type: string;
  createdAt: Date;
  customerId: number;
  customerName: string;
  overDraft?: number;
  interestRate?: number;
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}

export interface AccountHistory {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
} 