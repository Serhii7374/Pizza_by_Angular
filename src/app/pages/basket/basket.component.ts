import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IOrder } from '../../shared/interfaces/order.interface';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.model';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  swichPill: number = 1;
  order: Array<IProduct> = [];
  totalPrice = 0;
  orderID = 1;
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userComments: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();
  }


  private getBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.order = JSON.parse(localStorage.getItem('myOrder'));
    }
  }

  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.getTotal();
    this.updateBasket();
    this.orderService.basket.next('check');
  }

  private getTotal(): void {
    this.totalPrice = this.order.reduce((total, prod) => {
      return total + (prod.price * prod.count);
    }, 0);
  }

  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.order));
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.order.findIndex(prod => prod.id === product.id);
      this.order.splice(index, 1);
      this.updateBasket();
      this.getTotal();
      this.orderService.basket.next('check');
    }
  }

  addOrder(form: NgForm): void {
    const order: IOrder = new Order(
      this.orderID,
      form.controls.userName.value,
      form.controls.userPhone.value,
      form.controls.userCity.value,
      form.controls.userStreet.value,
      form.controls.userHouse.value,
      this.order,
      this.totalPrice,
      new Date(),
      form.controls.userComments.value);        
    delete order.id;

    this.orderService.addJSONOrder(order).subscribe(
      () => {
        this.resetBasket();
      }
    );
  }

  private resetBasket(): void {
    localStorage.clear();
    this.order = [];
    this.totalPrice = 0;
    this.orderService.basket.next('check');
    document.forms[0].reset();
  }

  swich(count: number) {
    this.swichPill = count;
  }

}