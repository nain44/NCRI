import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], value: string, type: string): any {
    debugger
    if (!items || !value) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if(type === 'role') {
      return items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));

    } else if(type === 'user') {
      return items.filter(item => item.first_name.toLowerCase().includes(value.toLowerCase()));
    }
}

}
