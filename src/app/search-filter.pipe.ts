import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: String): any {
    return list ? list.filter(
      item => item.nom!.toLowerCase().includes(filterText)
    ): []
  }

}
