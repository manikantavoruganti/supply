import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/shared/inventory.service';
import { Inventory } from 'src/app/shared/inventory.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styles: [
  ]
})
export class InventoryFormComponent {
  submitted:boolean=false;

  constructor(public inventory_service:InventoryService, private toastr: ToastrService){}

  onSubmit(){
    this.submitted=true;
    if(this.inventory_service.inventoryForm.valid) {
      debugger;
      if (this.inventory_service.inventoryForm.get('_id')?.value == '')
      this.inventory_service.postInventory().subscribe(res=> {
        this.inventory_service.fetchInventoryList();
        this.toastr.success('Created successfully', 'Inventory Register')
        this.resetForm();
        
      })
      else
        this.inventory_service.putInventory().subscribe(res => {
          this.inventory_service.fetchInventoryList();
          this.toastr.info('Updated successfully', 'Inventory Register')
          this.resetForm();
      })
      

    }
  }

  resetForm(){
    this.inventory_service.inventoryForm.reset(new Inventory);
    this.submitted=false;
  }


}




