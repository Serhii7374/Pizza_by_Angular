import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  userProduct: Array<IProduct> = [];
  category: string;  

  constructor(
    // private ProductService: ProductService,
    private orderService: OrderService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud:AngularFirestore) {
    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     const categoryName = this.actRoute.snapshot.paramMap.get('category');
    //     this.getProducts(categoryName);
    //   }
    // });
        this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
      }
    });
  }

  ngOnInit(): void {
    // this.adminFirebaseProducts();
  }

  private getProducts(categoryName: string = 'pizza'): void {
    this.userProduct = [];
    this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          const id = document.id;
          this.userProduct.push({ id, ...data });
        });
        this.category = this.userProduct[0]?.category.nameUA;
      }
    );
  }

  // private getProducts(categoryName: string = 'pizza'): void {
  //   this.ProductService.getCategoryProduct(categoryName).subscribe(data => {
  //     this.userProduct = data;
  //     this.category = this.userProduct[0]?.category.nameUA;
  //   });
  // }

  countPlus(product: IProduct) {
    if (product.count < 99) {
      product.count++
    }
  }
  countMinus(product: IProduct) {
    if (product.count > 1) {
      product.count--
    }
  }

  addBasket(product: IProduct): void {
    this.orderService.addBasket(product);
    product.count = 1;
  }
}
