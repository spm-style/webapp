import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value:any[], pattern:string, key:string): any[] {
    return value.filter((data:any) => pattern === '' || data[key].indexOf(pattern) >= 0)
  }

}
