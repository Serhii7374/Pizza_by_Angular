import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(cat: Array<ICategory>, order: string, reverse: boolean): unknown {
    if (order === "nameEN" && !reverse) {
      return cat.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1);
    } else if (order === "nameEN" && reverse) {
      return cat.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "nameUA" && !reverse) {
      return cat.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1);
    } else if (order === "nameUA" && reverse) {
      return cat.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "id" && !reverse) {
      return cat.sort((a, b) => a.id < b.id ? -1 : 1);
    } else if (order === "id" && reverse) {
      return cat.sort((a, b) => a.id < b.id ? -1 : 1).reverse();
    };
  }

}
