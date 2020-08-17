import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<ICategory>, order: string, reverse: boolean): Array<ICategory> {
    if (order !== "id" && !reverse) {
      return value.sort((a, b) => a[order].toLowerCase() < b[order].toLowerCase() ? -1 : 1);
    } else if (order !== "id" && reverse) {
      return value.sort((a, b) => a[order].toLowerCase() < b[order].toLowerCase() ? -1 : 1).reverse();
    };

    if (order === "id" && !reverse) {
      return value.sort((a, b) => a.id < b.id ? -1 : 1);
    } else if (order === "id" && reverse) {
      return value.sort((a, b) => a.id < b.id ? -1 : 1).reverse();
    };



  }
}
