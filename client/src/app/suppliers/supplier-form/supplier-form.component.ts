import { Component, OnInit } from '@angular/core';
import { SupplierService} from 'src/app/shared/supplier.service';
import { Supplier } from 'src/app/shared/supplier.model';
import { ToastrService } from 'ngx-toastr';
import { GeocodingService } from 'src/app/geocoding.service';


@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styles: [
  ]
})
export class SupplierFormComponent  {
  submitted:boolean=false;

  constructor(public supplier_service:SupplierService, private toastr: ToastrService, private geocodingService: GeocodingService){}

  onSubmit(): void {
    this.submitted=true;
    if(this.supplier_service.supplierForm.valid) {
      debugger;
      if (this.supplier_service.supplierForm.get('_id')?.value == '')
      this.supplier_service.postSupplier().subscribe(res=> {
        this.supplier_service.fetchSupplierList();
        this.toastr.success('Created successfully', 'Supplier Register')
        this.resetForm();
        
      })
      else
        this.supplier_service.putSupplier().subscribe(res => {
          this.supplier_service.fetchSupplierList();
          this.toastr.info('Updated successfully', 'Supplier Register')
          this.resetForm();
      })

    }
  }

  resetForm(){
    this.supplier_service.supplierForm.reset();
    this.submitted=false;
  }


}
