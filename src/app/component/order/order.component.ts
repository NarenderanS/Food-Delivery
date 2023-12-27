import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { CONSTANT } from 'src/app/utils/constant';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/emptyCart.json',
  };
  orders: any = [];
  user: AppUser = this.storageService.getLoggedInUser();
  adminOrders:any=[];
  total = 0;

  constructor(
    private storageService: StorageService,
    private orderService: OrderService
  ) {
    orderService.getOrderedProducts(this.user.id).subscribe({
      next: (response: AppResponse) => {
        this.orders = response.data;
        console.log(this.orders);
        console.log(this.orders[1].orderStatus);
        for (let i of this.orders) {
          // console.log(i.orderedProducts)
          // console.log(i.address)
        }
      },
    });
    orderService.getAllOrders().subscribe({
      next: (response: AppResponse) => {
        this.adminOrders = response.data;
        console.log(this.adminOrders);
        console.log(this.adminOrders[1].orderStatus);
        for (let i of this.orders) {
          // console.log(i.orderedProducts)
          // console.log(i.address)
        }
      },
    });
  }

  ngOnInit(): void {}
  getOrdersCount(): number {
    return this.orders.length;
  }
  getAllOrdersCount(){
    return this.adminOrders.length;
  }
  reOrder(orderId: number) {
    // console.log(orderId)
    for (let order of this.orders) {
      if (order.id === orderId) {
        for (let product of order.orderedProducts) {
          console.log(product.id);
          let item = {
            userId: order.userId,
            productId: product.id,
            count: product.count,
          };

        }
      }
    }
  }
  // timeStampConvertor(timeStamp:any):String{
  //   getLocaleDateFormat
  //   return timeStamp;
  // }

  getPrice(p:Product[]):number{
    let price:number=0;
    for(let item of p)
    {
        price+=item.price;
    }
    return price;
  }
  isUser(): boolean {
    if (this.user.role === CONSTANT.USER)
      return true;
    return false;
  }
 
  printBill(id:number): void {
    const orderData = this.generateBill(id);
    const printWindow = window.open('','_blank');
   
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Order Bill</title>
          </head>
          <body>
            ${orderData}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Unable to open new window for printing.');
    }
  }

  generateBill(order:any) {
    // order:[]=this.orders.find((id)->)
    let products:Product[]=order.orderedProducts;
   
    let billDetails= ` 
    <table
    class="table align-items-start table-bordered table-striped border border-3"
  >
    <thead>
      <tr class="table-primary">
        <th scope="col">OrderId</th>
        <th scope="col">Orders</th>
        <th scope="col">Status</th>
        <th scope="col">Print Bill</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border border-5">
        <th scope="row"><div>${order.id}</div> </th>
        <td>
          <div class="small text-muted mb-0">
            Ordered Date & Time : ${order.orderTime}
          </div>
          <div>
            <hr class="link-opacity-10" />
            ${this.productDetailss(order.orderedProducts)}
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>
                    <div class="">
                      ₹ ${ this.getPrice(order.orderedProducts) }
                    </div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>

          <div>
            <p class="small text-muted mb-0">Delivery Address</p>

            <p class="small text-muted mb-0">
              ${ order.address.address },${ order.address.city },${
                order.address.zipcode
              }
            </p>
          </div>
        </td>
        <td>{{ order.orderStatus }}</td>
      </tr>
    </tbody>
  </table>
    `

  }
  productDetailss(products:Product[]){
    return `<table class="table table-striped">
              <thead>
                <tr class="table-warning">
                  <th>Product  Price</th>
                  
                </tr>
              </thead> 
              <tbody >
                <tr>
                  <td>{this.productDetails(products)}</td>
                </tr>
              </tbody>`
  }
}
