import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IPagination} from "../../../models/pagination.model";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() itemsLength!: number
  @Input() paginationParams!: IPagination;
  @Output() onPageChange = new EventEmitter<IPagination>();

  pageSizes: number[] = [24, 48, 96]

  currentPage!: number
  currentPageSize!: number;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['paginationParams']) {
      const paginationParams = changes['paginationParams'].currentValue as IPagination;
      this.currentPageSize = paginationParams.pageSize;
      this.currentPage = paginationParams.page;
    }

    if (changes['itemsLength']) {
      this.currentPage = 1;
    }
  }

  get pages(): number[] {
    const numberOfPages = Math.ceil(this.itemsLength / this.currentPageSize);
    return  Array.from({length: numberOfPages}, (_, i) => i + 1);
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.emitPageChange();
  }

  pageSizeChange(pageSize: number) {
    this.currentPage = 1;
    this.currentPageSize = pageSize;
    this.emitPageChange();
  }

  private emitPageChange() {
    this.onPageChange.emit({
      page: this.currentPage,
      pageSize: this.currentPageSize
    })
  }

}
