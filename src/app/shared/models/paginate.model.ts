export interface Paginate<T> {
  total: number;
  pageIndex: number;
  pageSize: number;
  items: T[];
}