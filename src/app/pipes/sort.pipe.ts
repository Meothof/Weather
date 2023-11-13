import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform<T>(array: T[] | null, compareFn: (a: T, b: T) => number): T[] | null{
    if (array == null) {
      return null;
    }
    return array.sort(compareFn);
  }

}
