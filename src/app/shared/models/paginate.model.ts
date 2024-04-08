export interface Paginate<T> {
  total: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  items: T[];
}
