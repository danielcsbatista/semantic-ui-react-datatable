import { TableProps } from 'semantic-ui-react';
export interface IEntities {
  items: any[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface IFetchParam {
  currentPage: number;
  sortedColumn: string;
  totalPerPage: number;
  order: string;
}

export interface IDataTableState {
  entities: IEntities;
  firstPage: number;
  currentPage: number;
  sortedColumn: string;
  totalPerPage: number;
  order: string;
  error: string;
  loading: boolean;
  refresh: boolean;
}
export interface IColumnHeader {
  key: string;
  sortable?: boolean;
  title: string;
  subKey?: string;
  render?: Function;
  type?: string;
  config?: object;
}

export interface IDataTableProps extends TableProps {
  columnHeader: Array<IColumnHeader>;
  fetchFunction: Function;
  data: any;
  search?: boolean;
  refresh?: boolean;
  sortedColumn?: string;
  order?: string;
  externalLoader?: boolean;
  itemsPerPage?: number;
}
