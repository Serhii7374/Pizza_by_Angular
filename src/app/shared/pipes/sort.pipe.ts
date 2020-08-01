import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(cat: Array<ICategory>, swichIDSort: boolean, swichNameENSort: boolean, swichNameUASort: boolean): unknown {
    if (swichNameENSort) {
      return cat.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1);
    } else if (swichNameUASort) {
      return cat.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1);
    } else if (swichIDSort) {
      return cat.sort((a, b) => a.id < b.id ? -1 : 1).reverse();
    } else if(swichNameENSort === false || swichNameUASort === false || swichIDSort === false){
      return cat.reverse();
    } else return cat;
  }
}
