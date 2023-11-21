import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierFormComponent } from './suppliers/supplier-form/supplier-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders/orders.component';
import { OrderFormComponent } from './orders/order-form/order-form.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { InventoryFormComponent } from './inventories/inventory-form/inventory-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ɵAnimationGroupPlayer } from '@angular/animations';
import { ProductService } from 'src/app/shared/product.service';
import { SupplierService} from 'src/app/shared/supplier.service';
import { OrderService } from 'src/app/shared/order.service';
import { InventoryService } from 'src/app/shared/inventory.service';
import { GeocodingService } from 'src/app/geocoding.service';
import { GoogleMapsModule } from '@angular/google-maps'
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    OrderFormComponent,
    OrdersComponent,
    SupplierFormComponent,
    SuppliersComponent,
    InventoriesComponent,
    InventoryFormComponent,
    HeaderComponent,
    HomeComponent,
  
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule, AppRoutingModule,
    RouterModule,
    GoogleMapsModule
  ],
  providers: [ ProductService, SupplierService, OrderService, InventoryService, GeocodingService ],
  bootstrap: [AppComponent]
})
export class AppModule { };



