import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {AccountsComponent} from './accounts/accounts.component';
import {SearchCustomersComponent} from './customers/search-customers/search-customers.component';
import {NewCustomerComponent} from './customers/new-customer/new-customer.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
    {path : "",redirectTo:"/customers",pathMatch:"full"},
    {path :"customers",component :CustomersComponent},
    {path :"accounts",component :AccountsComponent},
    {path :"customers/search",component :SearchCustomersComponent},
    {path :"customers/new",component :NewCustomerComponent},
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class AppRoutes{}