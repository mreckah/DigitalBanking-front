import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app.routes';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { SearchCustomersComponent } from './customers/search-customers/search-customers.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

@NgModule({
  declarations: [
    AccountsComponent,
    CustomersComponent,
    SearchCustomersComponent,
    NewCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 