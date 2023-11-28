import { Component } from '@angular/core';
import { InventoryService } from '../shared/inventory.service';
import { Inventory } from '../shared/inventory.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventories',
  templateUrl: './inventories.component.html',
  styles: [
  ]
})
export class InventoriesComponent {

  constructor(public inventory_service:InventoryService, private toastr: ToastrService) {}
 
  ngOnInit(): void {
    this.inventory_service.fetchInventoryList();
  }
  
  populateForm(selectedRecord: Inventory) {
    this.inventory_service.inventoryForm.setValue({
      _id: selectedRecord._id,
      productName: selectedRecord.productName,
      description: selectedRecord.description,
      quantity: selectedRecord.quantity,
      price: selectedRecord.price,
      supplierName:selectedRecord.supplierName,
      manufacturingDate: selectedRecord.manufacturingDate,
      expiryDate: selectedRecord.expiryDate,
      location: selectedRecord.location,
  })
  }

  
  
  onDelete(_id: string):void {
    if (confirm('Are you sure to delete this record?')) {
      this.inventory_service.deleteInventory(_id).subscribe(res => {
        this.inventory_service.fetchInventoryList();
        this.toastr.info('Deleted successfully', 'Inventory Register');
      });
    }
  }
}
