import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Inventory } from './inventory.model';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  
  readonly baseURL = 'https://store-management-system-y5ye.onrender.com/api/inventories/';
  list: Inventory[] = [];

    inventoryForm = this.fb.group({
      _id: [''],
      productName: ['', Validators.required],
      description:['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      supplierName:['', Validators.required],
      manufacturingDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      location: ['', Validators.required],
      
  })
    
     

     fetchInventoryList() {
      this.http.get(this.baseURL)
        .pipe(catchError(this.errorHandler))
        .subscribe(data => {
          this.list = data as Inventory[];
          
        })
      }
     postInventory(){
      return this.http.post(this.baseURL, this.inventoryForm.value)
      .pipe(catchError(this.errorHandler))
     }
     putInventory() {
      return this.http.put(this.baseURL + this.inventoryForm.get('_id')?.value, this.inventoryForm.value)
        .pipe(catchError(this.errorHandler))
    }
  
    deleteInventory(_id: string) {
      return this.http.delete(this.baseURL + _id)
        .pipe(catchError(this.errorHandler))
    }


     private errorHandler(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

}

