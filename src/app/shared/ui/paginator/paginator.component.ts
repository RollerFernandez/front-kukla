import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent {
  @Input() page = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Input() totalPages = 0;
  @Input() pageSize = 0;
  @Input() totalItems = 0;
  @Output() changePage = new EventEmitter<PageChangedEvent>();
  @Input() pageSizes = [10, 25, 50, 100];
  get isFirstPage(): boolean {
    return this.page === 1;
  }
  get isLastPage(): boolean {
    return this.page === this.totalPages;
  }
  get firstIndexPage(): number {
    return this.pageSize * (this.page - 1) + 1;
  }
  get lastIndexPage(): number {
    return Math.min(this.firstIndexPage + this.pageSize - 1, this.totalItems);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.emitPageChange();
      this.emitChangePage();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.emitPageChange();
      this.emitChangePage();
    }
  }

  emitChangePage(): void {
    this.changePage.emit({
      page: this.page,
      itemsPerPage: this.pageSize,
    });
  }

  emitPageChange(): void {
    this.pageChange.emit(this.page);
  }

  changePageSize(event: number): void {
    this.pageSize = event;
    this.emitChangePage();
  }
}
