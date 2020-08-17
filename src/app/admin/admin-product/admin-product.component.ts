import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Product } from '../../shared/models/product.models';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  product: Array<IProduct> = [];
  SearchText: string;
  productID = 1;

  categories: Array<ICategory> = [];
  categoryName = "choose category..";
  productCategory: ICategory = { id: 1, nameEN: 'pizza', nameUA: 'піца' };
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productWeight: string;
  productPrice: number;
  productImage: string;
  imageStatus: boolean;
  uploadProgress: Observable<number>;

  order: string = 'id';
  reverse = false;

  modalAddSwich: boolean;
  modalSwichDelete: boolean;

  swichBtnEdit: boolean;

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.adminJSONProduct();
    this.adminJSONCategory();
  }

  private adminJSONProduct(): void {
    this.ProductService.getJSONProduct().subscribe(data => {
      this.product = data;
    });
  }

  private adminJSONCategory(): void {
    this.CategoryService.getJSONCategory().subscribe(data => {
      this.categories = data;
    });
  }
  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      });
    });
  }

  addCategory(): void {
    if (this.productNameEN && this.productNameUA) {
      const product: IProduct = new Product(
        this.productID,
        this.productCategory,
        this.productNameEN,
        this.productNameUA,
        this.productDescription,
        this.productWeight,
        this.productPrice,
        this.productImage);

      delete product.id;
      this.ProductService.postJSONProduct(product).subscribe(
        () => { this.adminJSONProduct(); }
      );
      this.reset()
    } else alert('Fill all fields');
  }

  // --- онулення данних форми і закриття модалки ---
  reset() {
    this.categoryName = "choose category..";
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = undefined;
    this.productImage = undefined;
    this.modalAddSwich = !this.modalAddSwich;
    this.swichBtnEdit = false;
  }
  // ---------------------

  // --- видалення продукта ---
  deleteCategory(product: IProduct): void {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.productID = product.id;
  }
  delete() {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.ProductService.deleteJSONProduct(this.productID).subscribe(
      () => { this.adminJSONProduct(); }
    );
  }
  // --------------------

  // --- редагування ---
  editProd(product: IProduct) {
    this.modalAddSwich = !this.modalAddSwich;
    this.productID = product.id;
    this.categoryName = product.category.nameEN
    this.productNameEN = product.nameEN;
    this.productNameUA = product.nameUA;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productImage = product.image;
    this.swichBtnEdit = true;
  }
  saveEdit() {
    if (this.productNameEN && this.productNameUA) {
      const product: IProduct = new Product(
        this.productID,
        this.productCategory,
        this.productNameEN,
        this.productNameUA,
        this.productDescription,
        this.productWeight,
        this.productPrice,
        this.productImage);
      this.ProductService.updateJSONProduct(product).subscribe(
        () => { this.adminJSONProduct(); }
      );
      this.reset()
    } else alert('Fill all fields');
  }

  // ----------------------


  // --- Сортування ---
  sort(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  // --------------------

  // --- модалки ---
  openModal(): void {
    this.modalAddSwich = !this.modalAddSwich;
  }
  closeModal(): void {
    this.reset();
  }
  closeDeleteModal(): void {
    this.modalSwichDelete = !this.modalSwichDelete;
  }
  // -----------------


}
