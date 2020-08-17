import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IOrder } from '../../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket: Subject<any> = new Subject<any>();
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  getJSONOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  addJSONOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.url, order);    
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.url}/${order.id}`, order);
  }

  deleteJSONOrder(id: number): Observable<IOrder> {
    return this.http.delete<IOrder>(`${this.url}/${id}`);
  }


  addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)){
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += +product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next(localProducts);
  }

}
