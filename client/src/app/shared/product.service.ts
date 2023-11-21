import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Product } from './product.model';
import { FormBuilder, Validators } from '@angular/forms';





@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor( private fb: FormBuilder, private http: HttpClient) { }
  
  readonly baseURL = 'http://localhost:3000/api/products/';
  list: Product[] = [];

    productForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      price:[0, Validators.required],
      quantity: [0, Validators.required],
    
     })

     fetchProductList(){
      this.http.get(this.baseURL)
        .pipe(catchError(this.errorHandler))
        .subscribe(data => {
          this.list = data as Product[];
          
        })
      }
     postProduct(){
      return this.http.post(this.baseURL, this.productForm.value)
      .pipe(catchError(this.errorHandler))
     }
     putProduct() {
      return this.http.put(this.baseURL + this.productForm.get('_id')?.value, this.productForm.value)
        .pipe(catchError(this.errorHandler))
    }
  
    deleteProduct(_id: string) {
      return this.http.delete(this.baseURL + _id)
        .pipe(catchError(this.errorHandler))
    }

     private errorHandler(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('An error occurred:', error.error);
      } else {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }

  }

