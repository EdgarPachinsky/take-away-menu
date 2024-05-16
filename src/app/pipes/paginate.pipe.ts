import { Pipe, PipeTransform } from '@angular/core';
import {IPagination} from "../models/pagination.model";

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  transform(value: any[], paginationParams: IPagination): any[] {
    const {page, pageSize} = paginationParams
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return value.slice(startIndex, endIndex);
  }

}
