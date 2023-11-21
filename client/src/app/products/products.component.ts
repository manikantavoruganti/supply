import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  constructor(public product_service:ProductService, private toastr: ToastrService) {}
 
  ngOnInit(): void {
    this.product_service.fetchProductList();
  }
  
  populateForm(selectedRecord: Product) {
    this.product_service.productForm.setValue({
      _id: selectedRecord._id,
      name: selectedRecord.name,
      description: selectedRecord.description,
      company: selectedRecord.company,
      price: selectedRecord.price,
      quantity: selectedRecord.quantity

    })
  }
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.product_service.deleteProduct(_id).subscribe(res => {
        this.product_service.fetchProductList();
        this.toastr.info('Deleted successfully', 'Product Register')
      })
    }
  }
}
