import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';
import { Category } from '../../shared/models/category.models';
import { CategoryService } from '../../shared/services/category.service';

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
  cID = 1;

  order: string = 'id';
  reverse = false;

  modalAddSwich: boolean;
  modalSwichDelete: boolean;

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.adminJSONCategory();
  }

  private adminJSONCategory(): void {
    this.CategoryService.getJSONCategory().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory(): void {
    if (this.nameEN && this.nameUA) {
      const category: ICategory = new Category(this.cID, this.nameEN, this.nameUA);
      delete category.id;
      this.CategoryService.postJSONCategory(category).subscribe(
        () => { this.adminJSONCategory(); }
      );
      this.nameEN = '';
      this.nameUA = '';
      this.modalAddSwich = !this.modalAddSwich;
    } else alert('Fill all fields');
  }
  
  // видалення поста
  deleteCategory(category: ICategory): void {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.cID = category.id;
  }
  delete() {
    this.modalSwichDelete = !this.modalSwichDelete;
    this.CategoryService.deleteJSONCategory(this.cID).subscribe(
      () => { this.adminJSONCategory(); }
    );
  }

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

}
