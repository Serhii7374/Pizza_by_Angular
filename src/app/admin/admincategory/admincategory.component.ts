import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.models';
import { CategoryService } from '../../shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.scss']
})
export class AdmincategoryComponent implements OnInit {
  categories: Array<ICategory> = [];
  SearchText: string;
  nameEN: string;
  nameUA: string;
  cID = '1';

  order: string = 'id';
  reverse = false;

  modalAddSwich: boolean;
  modalSwichDelete: boolean;

  constructor(
    private CategoryService: CategoryService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.adminFirebaseCategories();
    // this.adminJSONCategory();
  }


  private adminFirebaseCategories(): void {
    this.CategoryService.getFirecloudCategory().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  addCategory(): void {
    const newC = new Category(this.cID, this.nameEN, this.nameUA);
    delete newC.id;
    this.CategoryService.postFirecloudCategory(Object.assign({}, newC)).then(
      () => {
        console.log('add category');
      }
    )
    this.modalAddSwich = !this.modalAddSwich;
    this.resetForm();
  }

  // private adminJSONCategory(): void {
  //   this.CategoryService.getJSONCategory().subscribe(data => {
  //     this.categories = data;
  //   });
  // }

  // addCategory(): void {
  //   if (this.nameEN && this.nameUA) {
  //     const category: ICategory = new Category(this.cID, this.nameEN, this.nameUA);
  //     delete category.id;
  //     this.CategoryService.postJSONCategory(category).subscribe(
  //       () => { this.adminJSONCategory(); }
  //     );
  //     resetForm();
  //     this.modalAddSwich = !this.modalAddSwich;
  //   } else alert('Fill all fields');
  // }

  // видалення поста
  deleteCategory(category: ICategory): void {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.cID = category.id;
  }

  delete(): void {
    this.firestore.collection('categories').doc(this.cID).delete();
    this.modalSwichDelete = !this.modalSwichDelete;
    // this.firestore.collection('categories').doc(category.id).update(category);    
  }
  
  // delete() {
  //   this.modalSwichDelete = !this.modalSwichDelete;
  //   this.CategoryService.deleteJSONCategory(this.cID).subscribe(
  //     () => { this.adminJSONCategory(); }
  //   );
  // }




  sort(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openModal(): void {
    this.modalAddSwich = !this.modalAddSwich;
  }
  closeModal(): void {
    this.modalAddSwich = !this.modalAddSwich;
  }
  closeDeleteModal(): void {
    this.modalSwichDelete = !this.modalSwichDelete;
  }

  private resetForm(): void {
    this.cID = '1';
    this.nameEN = '';
    this.nameUA = '';
  }

}
