import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent {

  submitted:boolean=false;

  constructor(public service:ProductService, private toastr: ToastrService, public fb:FormBuilder){}
  productForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    company: ['', Validators.required],
    price:[0, Validators.required],
    quantity: [0, Validators.required],
  
   })
  onSubmit(){
    this.submitted=true;
    if(this.service.productForm.valid) {
      debugger;
      if (this.service.productForm.get('_id')?.value == '')
      this.service.postProduct().subscribe(res=> {
        this.service.fetchProductList();
        this.toastr.success('Created successfully', 'Product Register')
        this.resetForm();
        
      })
      else
        this.service.putProduct().subscribe(res => {
          this.service.fetchProductList();
          this.toastr.info('Updated successfully', 'Product Register')
          this.resetForm();
      })

    }
  }

  resetForm(){
    this.service.productForm.reset(new Product());
    this.submitted=false;
  }


}

