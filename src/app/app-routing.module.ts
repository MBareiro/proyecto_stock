import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component'; // Importa el componente para la página principal
import { NavigationComponent } from './components/navigation/navigation.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/navigation/inventory', pathMatch: 'full' },
  { path: 'navigation', component: NavigationComponent, children: [/* 
    { path: 'catalog', component: CatalogComponent },
    { path: 'user-management', component: UserCreateComponent },  
       
    { path: 'loan', component: LoanComponent },
    { path: 'loan-list', component: LoanListComponent },
    { path: 'loan-create', component: LoanCreateComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'authors', component: AuthorsComponent },
    { path: 'editorials', component: EditorialsComponent },
    { path: 'genres', component: GenresComponent },*/
    { path: 'inventory', component: InventoryComponent },
    { path: 'income', component: IngresosComponent },  
    { path: 'outcome', component: SalidasComponent },  
    { path: 'change-password', component: ChangePasswordComponent },     
    { path: 'user-create', component: UserCreateComponent, canActivate: [AdminGuard] },
    { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard] },  
    { path: '', redirectTo: '/navigation', pathMatch: 'full' },
  ]},  
   { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },/*
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
