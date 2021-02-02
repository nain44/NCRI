import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(items: any[], value: string): any {
        if (!items || !value) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered outelse if(type === 'user') {
        return items.filter(item => item.first_name.toLowerCase().includes(value.toLowerCase()));

    }

}