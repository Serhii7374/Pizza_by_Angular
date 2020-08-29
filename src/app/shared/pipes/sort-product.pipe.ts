import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'sortProduct'
})
export class SortProductPipe implements PipeTransform {

  transform(p: Array<IProduct>, order: string, reverse: boolean): Array<IProduct> {
    // if (order === "id" && !reverse) {
    //   return p.sort((a, b) => a.id - b.id);
    // } else if (order === "id" && reverse) {
    //   return p.sort((a, b) => b.id - a.id);
    // };
    if (order === "category.nameEN" && !reverse) {
      return p.sort((a, b) => a.category.nameEN.toLowerCase() < b.category.nameEN.toLowerCase() ? -1 : 1);
    } else if (order === "category.nameEN" && reverse) {
      return p.sort((a, b) => a.category.nameEN.toLowerCase() < b.category.nameEN.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "nameEN" && !reverse) {
      return p.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1);
    } else if (order === "nameEN" && reverse) {
      return p.sort((a, b) => a.nameEN.toLowerCase() < b.nameEN.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "nameUA" && !reverse) {
      return p.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1);
    } else if (order === "nameUA" && reverse) {
      return p.sort((a, b) => a.nameUA.toLowerCase() < b.nameUA.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "weight" && !reverse) {
      return p.sort((a, b) => a.weight.toLowerCase() < b.weight.toLowerCase() ? -1 : 1);
    } else if (order === "weight" && reverse) {
      return p.sort((a, b) => a.weight.toLowerCase() < b.weight.toLowerCase() ? -1 : 1).reverse();
    };
    if (order === "price" && !reverse) {      
      return p.sort((a, b) => a.price - b.price);
    } else if (order === "price" && reverse) {
      return p.sort((a, b) => b.price - a.price);
    };
    
  }

}
