import { Component, ElementRef, NgZone, ViewChild, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { ToastrService } from 'ngx-toastr';
import { GeocodingService } from 'src/app/geocoding.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var google: any; // Declare the 'google' object

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
    options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid'
  };
  apiLoaded: Observable<boolean>;
  latitude: number = 0; // Initialize with a default value
  longitude: number = 0; // Initialize with a default value
  center: google.maps.LatLngLiteral;
  map!: google.maps.Map; // Declare the 'map' property
  zoom = 12; // Add this line to declare the zoom property


  
  
  constructor(
    public order_service: OrderService,
    httpClient: HttpClient,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private geocodingService: GeocodingService
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyD69wnDPcyKclEzb0NwxFZLzdckNhP_ULE&libraries=places',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );

      this.center = {
        lat: 0, // set initial latitude value
        lng: 0, // set initial longitude value
      };
  }

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  ngOnInit(): void {
    this.order_service.fetchOrderList();
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  }

  showCoordinates(address: string): void {
    this.geocodingService.geocodeAddress(address).subscribe(
      response => {
        const location = response.results[0]?.geometry?.location;
        if (location && location.lat && location.lng) {
          this.latitude = location.lat;  // Use latitude from the geocoding service
          this.longitude = location.lng;  // Use longitude from the geocoding service
          this.initMap(this.latitude, this.longitude);
        } else {
          // If geocoding service does not provide valid coordinates, set default values
          this.latitude = 0;
          this.longitude = 0;
          console.error('Latitude or longitude is undefined. Defaulting to 0, 0.');
          this.initMap(this.latitude, this.longitude);
        }
      },
      error => {
        console.error('Error occurred while geocoding:', error);
      }
    );
  }
  
  initMap(latitude: number, longitude: number): void {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 14
    });
  }
  

  initAutocomplete(): void {
    if (google && google.maps && google.maps.places) {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
  
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        this.searchElementRef.nativeElement
      );
  
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry && place.geometry.location) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
  
            if (this.latitude !== undefined && this.longitude !== undefined) {
              this.center = {
                lat: this.latitude,
                lng: this.longitude,
              };
            } else {
              console.error('Latitude or longitude is undefined.');
            }
          }
        });
      });
    } else {
      console.error('Google Maps API or its places library is not loaded.');
    }
  }
  
  ngAfterViewInit(): void {
    if (this.searchElementRef && window.google && window.google.maps) {
      this.map = new google.maps.Map(this.searchElementRef.nativeElement, this.options);
      this.initAutocomplete();
    } else {
      // If Google Maps API is not yet loaded, wait and try again
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 100); // Retry after 100 milliseconds (adjust the delay as needed)
    }
  }

  populateForm(selectedRecord: Order): void {
    this.order_service.orderForm.setValue({
      _id: selectedRecord._id,
      product: selectedRecord.product,
      quantity: selectedRecord.quantity,
      totalPrice: selectedRecord.totalPrice,
      customerName: selectedRecord.customerName,
      phoneNo: selectedRecord.phoneNo,
      address: selectedRecord.address,
      orderDate: selectedRecord.orderDate,
      orderStatus: selectedRecord.orderStatus,
      paymentStatus: selectedRecord.paymentStatus
    });
  }

  onDelete(_id: string): void {
    if (confirm('Are you sure to delete this record?')) {
      this.order_service.deleteOrder(_id).subscribe(res => {
        this.order_service.fetchOrderList();
        this.toastr.info('Deleted successfully', 'Order Register');
      });
    }
  }
}
