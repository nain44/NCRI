import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(items: any[], value: string): any {
        debugger
        if (!items || !value) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
    }
}