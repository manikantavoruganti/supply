import { NgModule } from '@angular/core';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { OrdersComponent } from './orders/orders.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path: 'orders', component: OrdersComponent },
  {path: 'suppliers', component: SuppliersComponent },
  {path: 'products', component: ProductsComponent },
  {path: 'inventories', component: InventoriesComponent},
  {path: '', redirectTo: '/home', pathMatch:'full' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

