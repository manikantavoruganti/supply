import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Supplier } from './supplier.model';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  
  readonly baseURL = 'https://store-management-system-y5ye.onrender.com';
  list: Supplier[] = [];

    supplierForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phone_No: ['', Validators.required],
      address:[''],
      productSupplied: ['', Validators.required],
    
     })

     fetchSupplierList() {
      this.http.get(this.baseURL)
        .pipe(catchError(this.errorHandler))
        .subscribe(data => {
          this.list = data as Supplier[];
          
        })
      }
     postSupplier(){
      return this.http.post(this.baseURL, this.supplierForm.value)
      .pipe(catchError(this.errorHandler))
     }
     putSupplier() {
      return this.http.put(this.baseURL + this.supplierForm.get('_id')?.value, this.supplierForm.value)
        .pipe(catchError(this.errorHandler))
    }
  
    deleteSupplier(_id: string) {
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

