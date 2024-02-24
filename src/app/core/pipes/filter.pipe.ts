import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {

  }
  transform(value: IProduct[], searchText: string, page: number = 0, maxRows: number): Array<IProduct> {
    if (!value) return [];
    let newValue: IProduct[] = value
    if (searchText) {
      newValue = value.filter((item: IProduct) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase())
          || this.datePipe.transform(item.date_release, 'dd/MM/yyyy', '-0')?.includes(searchText.toLowerCase())
      })
    }
    newValue = newValue.slice(page, page + maxRows)
    return newValue;

  }

}
