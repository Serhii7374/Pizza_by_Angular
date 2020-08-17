import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private basket: Array<IProduct> = [];
  totalPrice = 0;
  constructor(private ordService: OrderService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
  }

  private checkBasket(): void {
    this.ordService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.totalPrice = this.basket.reduce((total, prod) => {
        return total + (prod.price * prod.count);
      }, 0);
    } else{
      this.totalPrice = 0;
    }
  }
}
