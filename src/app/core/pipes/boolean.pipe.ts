import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'booleanTransform'
})

export class BooleanTransform implements PipeTransform {
    transform(value: any): any {
        if(value === true){
            return 'Yes'
        }else if(value === false){
            return 'No'
        }else{
            return ''
        }
    }
}