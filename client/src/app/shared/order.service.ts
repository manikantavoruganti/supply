import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Order } from './order.model';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  
  readonly baseURL = 'https://store-management-system-y5ye.onrender.com';
  list: Order[] = [];

    orderForm = this.fb.group({
      _id: [''],
      product: ['', Validators.required],
      quantity: [0, Validators.required],
      totalPrice: [0, Validators.required],
      customerName:['', Validators.required],
      phoneNo: ['', Validators.required],
      address: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderStatus: ['', Validators.required],
      paymentStatus: ['', Validators.required],
  })
    
     

     fetchOrderList() {
      this.http.get(this.baseURL)
        .pipe(catchError(this.errorHandler))
        .subscribe(data => {
          this.list = data as Order[];
          
        })
      }
     postOrder(){
      return this.http.post(this.baseURL, this.orderForm.value)
      .pipe(catchError(this.errorHandler))
     }
     putOrder() {
      return this.http.put(this.baseURL + this.orderForm.get('_id')?.value, this.orderForm.value)
        .pipe(catchError(this.errorHandler))
    }
  
    deleteOrder(_id: string) {
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

