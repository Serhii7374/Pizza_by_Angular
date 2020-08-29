import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { IOrder } from '../../shared/interfaces/order.interface';
import { Order } from '../../shared/models/order.model';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  SearchOrder: string;
  SearchProduct: string;
  reverse = false;
  sortValue: string = 'category.nameEN';
  orders: Array<IOrder> = [];

  order: Array<IProduct> = [];

  product: Array<IProduct> = [];

  orderID = '1';
  orderStatus: string;
  orderName: string;
  orderPhone: string;
  orderCity: string;
  orderStreet: string;
  orderHouse: string;
  orderComment: string;
  orderDate: Date;
  totalPrice = 0;

  statusColor: string;

  modalDetailsSwich: boolean;
  modalAddSwich: boolean;
  modalSwichDelete: boolean;


  constructor(
    private orderService: OrderService,
    private ProductService: ProductService,
    private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    // this.adminJSONOrder();
    // this.adminJSONProduct();
    this.adminFirebaseOrders();
    this.adminFirebaseProducts();
  }

  // private adminJSONOrder(): void {
  //   this.orderService.getJSONOrder().subscribe(data => {
  //     this.orders = data;
  //   });
  // }

  // private adminJSONProduct(): void {
  //   this.ProductService.getJSONProduct().subscribe(data => {
  //     this.product = data;
  //   });
  // }

  private adminFirebaseProducts(): void {
    this.ProductService.getFirecloudProduct().subscribe(
      collection => {
        this.product = collection.map(product => {
          const data = product.payload.doc.data() as IProduct;
          const id = product.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  private adminFirebaseOrders(): void {
    this.orderService.getFirecloudOrder().subscribe(
      collection => {
        this.orders = collection.map(order => {
          const data = order.payload.doc.data() as IOrder;
          const id = order.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  setStatus(value: string) {
    this.orderStatus = value;
  }

  // --- видалення замовлення ---
  deleteOrder(order: IOrder): void {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.orderID = order.id;
  }
  delete() {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.orderService.deleteFirecloudOrder(this.orderID).then(
      () => { this.adminFirebaseProducts(); }
    );
    // this.orderService.deleteJSONOrder(this.orderID).subscribe(
    //   () => { this.adminJSONOrder(); }
    // );
  }
  // --------------------

  // --- редагування ---
  orderDatails(order: IOrder) {
    this.modalDetailsSwich = !this.modalDetailsSwich;
    this.orderID = order.id;
    this.orderName = order.userName;
    this.orderPhone = order.userPhone;
    this.orderCity = order.userCity;
    this.orderStreet = order.userStreet;
    this.orderHouse = order.userHouse;
    this.orderComment = order.userComment;
    this.order = order.ordersDetails;
    this.orderDate = order.dateOrder;
    this.orderStatus = order.status;
    this.getTotal();
  }
  saveOrder() {
    const product: IOrder = new Order(
      this.orderID,
      this.orderName,
      this.orderPhone,
      this.orderCity,
      this.orderStreet,
      this.orderHouse,
      this.order,
      this.totalPrice,
      this.orderDate,
      this.orderComment,
      this.orderStatus);
      this.orderService.updateFirecloudOrder(Object.assign({}, product)).then(
        () => {
          console.log('update order');
        }
      );

    // this.orderService.updateOrder(product).subscribe(
    //   () => { this.adminJSONOrder(); }
    // );
    this.reset();
  }
  // ----------------------

  // --- add Product ---

  addProduct() {
    this.modalAddSwich = !this.modalAddSwich;
  }
  addProdToOrder(product: IProduct) {
    this.order.push(product);
    this.getTotal();
    this.modalAddSwich = !this.modalAddSwich;
  }
  // -------------------

  // зміна кількості товару
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
    this.orderService.basket.next('check');
  }
  // ----------------------

  // видалення товару із замовлення
  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.order.findIndex(prod => prod.id === product.id);
      this.order.splice(index, 1);
      this.getTotal();
      this.orderService.basket.next('check');
    }
  }
  // ----------------------------------

  // сумування вартості товарів
  private getTotal(): void {
    this.totalPrice = this.order.reduce((total, prod) => {
      return total + (prod.price * prod.count);
    }, 0);
  }
  // ------------------------

  // --- онулення данних форми і закриття модалки ---
  reset() {
    document.forms[0].reset();
    this.orderStatus = "в обробці";
    this.modalDetailsSwich = !this.modalDetailsSwich;
  }

  // --- модалки ---
  openDetailsModal(): void {
    this.modalDetailsSwich = !this.modalDetailsSwich;
  }
  openAddModal(): void {
    this.modalAddSwich = !this.modalAddSwich;
  }
  closeDetailsModal(): void {
    this.reset();
  }
  closeAddModal(): void {
    this.modalAddSwich = !this.modalAddSwich;
  }
  closeDeleteModal(): void {
    this.modalSwichDelete = !this.modalSwichDelete;
  }
  // -----------------
  // --- Сортування ---

  sort(value: string) {
    if (this.sortValue === value) {
      this.reverse = !this.reverse;
    }
    this.sortValue = value;
  }
  // --------------------
}
