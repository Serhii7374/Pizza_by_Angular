import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(cat: Array<ICategory>, searchString: string): unknown {
    if (!cat) {
      return [];
    }
    if (!searchString) {
      return cat;
    }
    return cat.filter(elem => elem.nameEN.toLowerCase().includes(searchString.toLowerCase())
      || elem.nameUA.toLowerCase().includes(searchString.toLowerCase()))
  }
}
