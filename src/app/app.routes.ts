import { Routes } from '@angular/router';
import { SignInComponent } from './modules/Auth/sign-in/sign-in.component';
import { MainComponent } from './modules/pages/main/main.component';
import { DashboardComponent } from './modules/pages/main/components/dashboard/dashboard.component';
import { AccountsComponent } from './modules/pages/main/components/accounts/accounts.component';
import { SalesComponent } from './modules/pages/main/components/sales/sales.component';
import { MaintenanceComponent } from './modules/pages/main/components/maintenance/maintenance.component';
import { InventoryComponent } from './modules/pages/main/components/inventory/inventory.component';
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: SignInComponent
  },
  {
    path: "main",
    component: MainComponent,
    children:[
      {path: 'dashboard' , component:DashboardComponent},
      {path: 'accounts' , component:AccountsComponent},
      {path: 'sales' , component:SalesComponent},
      {path: 'maintenance' , component:MaintenanceComponent},
      {path: 'inventory' , component:InventoryComponent}
    ]
  }
];
