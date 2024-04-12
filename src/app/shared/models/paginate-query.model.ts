export interface PaginateQuery {
  pageSize: number;
  pageIndex: number;
  orderColumn: string;
  orderDirection: 'ASC' | 'DESC';
}
