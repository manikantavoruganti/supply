import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../shared/supplier.service';
import { Supplier } from '../shared/supplier.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styles: [
  ]
})
export class SuppliersComponent implements OnInit {

  constructor(public service:SupplierService, private toastr: ToastrService) {}
 
  ngOnInit(): void {
    this.service.fetchSupplierList();
    const storedMarkerPositions = localStorage.getItem('markerPositions');
    if (storedMarkerPositions) {
      this.markerPositions = JSON.parse(storedMarkerPositions);
    }
    
  }
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 40.7128,
      lng: -74.0060
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
};
markerPositions: google.maps.LatLngLiteral[] = [];
addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.markerPositions.push(event.latLng.toJSON());
    localStorage.setItem('markerPositions', JSON.stringify(this.markerPositions));
    }
    
}
  
  populateForm(selectedRecord: Supplier) {
    this.service.supplierForm.setValue({
      _id: selectedRecord._id,
      name: selectedRecord.name,
      contactPerson:selectedRecord.contactPerson,
      phone_No: selectedRecord.phone_No,
      address:selectedRecord.address,
      productSupplied:selectedRecord.productSupplied,


    })
  }
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteSupplier(_id).subscribe(res => {
        this.service.fetchSupplierList();
        this.toastr.info('Deleted successfully', 'Supplier Register')
      })
    }
  }
}

