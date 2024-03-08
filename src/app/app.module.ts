import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { MatSelectModule } from '@angular/material/select';
import { FormValidators } from './components/shared/form-validators/form-validators';
import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { NewProductComponent } from './components/dialogs/new-product/new-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';
import {MatDividerModule} from '@angular/material/divider';
import { NewFolderComponent } from './components/dialogs/new-folder/new-folder.component';
import { EditProductDialogComponent } from './components/dialogs/edit-product-dialog/edit-product-dialog.component';
import { EditCategoryDialogComponent } from './components/dialogs/edit-category-dialog/edit-category-dialog.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { SalidasComponent } from './components/salidas/salidas.component';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserCreateComponent,
    UserListComponent,
    ChangePasswordComponent,
    InventoryComponent,
    NewProductComponent,
    NewFolderComponent,
    EditProductDialogComponent,
    EditCategoryDialogComponent,
    IngresosComponent,
    SalidasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatTreeModule,
    MatDividerModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [FormValidators],
  bootstrap: [AppComponent]
})
export class AppModule { }
