import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, AccountHistory } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private backendHost = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>(`${this.backendHost}/accounts`);
  }

  public getAccount(accountId: string): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${this.backendHost}/accounts/${accountId}`);
  }

  public getAccountOperations(accountId: string, page: number, size: number): Observable<AccountHistory> {
    return this.http.get<AccountHistory>(`${this.backendHost}/accounts/${accountId}/operations?page=${page}&size=${size}`);
  }

  public debit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${this.backendHost}/accounts/debit`, {
      accountId,
      amount,
      description
    });
  }

  public credit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${this.backendHost}/accounts/credit`, {
      accountId,
      amount,
      description
    });
  }

  public transfer(accountSource: string, accountDestination: string, amount: number): Observable<any> {
    return this.http.post(`${this.backendHost}/accounts/transfer`, {
      accountSource,
      accountDestination,
      amount
    });
  }
} 