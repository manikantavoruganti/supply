import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/order.service';
import { Order } from 'src/app/shared/order.model';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styles: [
  ]
})
export class OrderFormComponent {
  submitted:boolean=false;

  constructor(public order_service:OrderService, private toastr: ToastrService){}

  

  onSubmit(){
    this.submitted=true;
    if(this.order_service.orderForm.valid) {
      debugger;
      if (this.order_service.orderForm.get('_id')?.value == '')
      this.order_service.postOrder().subscribe(res=> {
        this.order_service.fetchOrderList();
        this.toastr.success('Created successfully', 'Order Register')
        this.resetForm();
        
      })
      else
        this.order_service.putOrder().subscribe(res => {
          this.order_service.fetchOrderList();
          this.toastr.info('Updated successfully', 'Order Register')
          this.resetForm();
      })
      

    }
  }

  resetForm(){
    this.order_service.orderForm.reset(new Order);
    this.submitted=false;
  }


}



