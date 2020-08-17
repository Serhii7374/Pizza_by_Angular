import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';

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
  ) { }

  ngOnInit(): void {
    this.getMyProduct();
  }

  getMyProduct(): void {
    const id = +this.actRoute.snapshot.paramMap.get('id');
    this.prodService.getOneProduct(id).subscribe(data => {
      this.product = data;
      this.category = this.product?.category.nameEN;
    });
  }

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
