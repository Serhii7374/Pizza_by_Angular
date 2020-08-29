import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  category = 'pizza';

  constructor(
    private prodService: ProductService,
    private orderService: OrderService,
    private actRoute: ActivatedRoute,
    private firecloud:AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getMyProduct();
  }

  
  // private getMyProduct(): void {
  //   const id = this.actRoute.snapshot.paramMap.get('id');
  //   this.prodService.getOneFirecloudProduct(id).subscribe(
  //     // collection => {
  //     //   this.product = collection.map(product => {
  //     //     const data = product.payload.doc.data() as IProduct;
  //     //     const id = product.payload.doc.id;
  //     //     return { id, ...data };          
  //     //   });
  //     // }
  //   );    
  // }

  private getMyProduct(): void {    
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firecloud.collection('products').ref.where('id', '==', id).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          const id = document.id;
          this.product = ({ id, ...data });
        });
      }
    );
  }
  // private getProducts(categoryName: string = 'pizza'): void {
  //   this.userProduct = [];
  //   this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName).onSnapshot(
  //     collection => {
  //       collection.forEach(document => {
  //         const data = document.data() as IProduct;
  //         const id = document.id;
  //         this.userProduct.push({ id, ...data });
  //       });
  //       this.category = this.userProduct[0]?.category.nameUA;
  //     }
  //   );
  // }

  // getMyProduct(): void {
  //   const id = +this.actRoute.snapshot.paramMap.get('id');
  //   this.prodService.getOneProduct(id).subscribe(data => {
  //     this.product = data;
  //     this.category = this.product?.category.nameEN;
  //   });
  // }

  countPlus() {
    if (this.product.count < 99) {
      this.product.count++
    }
  }
  countMinus() {
    if (this.product.count > 1) {
      this.product.count--
    }
  }

  addBasket(product: IProduct): void {
    this.orderService.addBasket(product);
    product.count = 1;
  }

}
