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
  swichArrow: boolean;
  swichArrowID: boolean;
  swichArrowEN: boolean;
  swichArrowUA: boolean;
  swichIDSort: boolean;
  swichNameENSort: boolean;
  swichNameUASort: boolean;

  modalAddSwich: boolean;
  modalSwichDelete: boolean;



  constructor(private CategoryServise: CategoryService) { }

  ngOnInit(): void {
    this.adminJSONCategory();
  }

  private adminJSONCategory(): void {
    this.CategoryServise.getJSONCategory().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory(): void {
    if (this.nameEN && this.nameUA) {
      const category: ICategory = new Category(this.cID, this.nameEN, this.nameUA);
      delete category.id;
      this.CategoryServise.postJSONCategory(category).subscribe(
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
    this.CategoryServise.deleteJSONCategory(this.cID).subscribe(
      () => { this.adminJSONCategory(); }
    );
  }


  sort() {
    this.swichArrow = true;
    this.swichArrowEN = false;
    this.swichArrowUA = false;
    this.swichIDSort = !this.swichIDSort;
    this.swichNameENSort = false;
    this.swichNameUASort = false;
  }
  sortNameEN() {
    this.swichArrowEN = true;
    this.swichArrowUA = false;
    this.swichArrow = false;
    this.swichNameENSort = !this.swichNameENSort;
    this.swichIDSort = false;
    this.swichNameUASort = false;
  }
  sortNameUA() {
    this.swichArrowEN = false;
    this.swichArrowUA = true;
    this.swichArrow = false;
    this.swichNameUASort = !this.swichNameUASort;
    this.swichIDSort = false;
    this.swichNameENSort = false;
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
