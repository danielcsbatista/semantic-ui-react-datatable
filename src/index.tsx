import React, { useState, useEffect, memo } from 'react';
import { IDataTableProps, IEntities } from './interfaces';
import { isEqual } from 'lodash';
import './style.scss';

import {
  Table,
  Input,
  Icon,
  Segment,
  Grid,
  Pagination
} from 'semantic-ui-react';
import LoadingML from '../Loader';
import Rows from './helpers/rows';
import Error from './helpers/error';
import HeaderTable from './helpers/headerTable';
import ExtractJSONValues from './helpers/extractJSONValues';

function MlDataTable(props: IDataTableProps) {
  const [entities, setEntities] = useState<IEntities>({
    items: [],
    pageIndex: 1,
    pageSize: props.itemsPerPage || 25,
    totalCount: -1,
    totalPages: -1,
    hasPrevious: false,
    hasNext: false
  });
  const [sortedColumn, setSortedColumn] = useState<string>(
    props.sortedColumn || props.columnHeader[0].key
  );
  const [order, setOrder] = useState<string>(props.order || 'desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPerPage] = useState<number>(props.itemsPerPage || 25);

  useEffect(() => {
    setCurrentPage(1);
    setLoading(props.externalLoader || false);
  }, [props.externalLoader]);

  useEffect(() => {
    const { data, errorMessage } = props.data;

    if (
      data === undefined &&
      errorMessage !== '' &&
      errorMessage !== undefined
    ) {
      if (error === '') setError(errorMessage);
    }

    const validation = data
      ? !isEqual(entities.items, data.items || [])
      : false;

    if (validation) {
      setEntities(data);
      setLoading(false);
      setError('');
    }
  }, [error, props.data, entities.items]);

  const fetchEntities = (
    numberPage: number,
    orderPage: string = order,
    column: string = sortedColumn
  ) => {
    setLoading(true);
    props.fetchFunction({
      totalPerPage,
      currentPage: numberPage || 1,
      sortedColumn: column,
      order: orderPage
    });
  };

  const changePage = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | undefined,
    data: any
  ) => {
    setCurrentPage(data.activePage);
    fetchEntities(data.activePage);
  };

  function sortByColumn(column: string) {
    let newOrder = '';
    if (column === sortedColumn) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
      fetchEntities(1, newOrder, sortedColumn);
    } else {
      newOrder = 'asc';
      setSortedColumn(column);
      fetchEntities(1, newOrder, column);
    }
    setOrder(newOrder);
    setCurrentPage(1);
  }

  const PaginationTable = (params: any) => {
    const { totalPages } = params;
    return (
      <Pagination
        onPageChange={changePage}
        ellipsisItem={null}
        activePage={currentPage}
        totalPages={totalPages}
      />
    );
  };

  if (error) return <Error description={error} />;

  const { columnHeader, search } = props;

  return (
    <Segment
      basic
      style={{
        padding: '0px'
      }}
    >
      {loading && <LoadingML />}
      <Grid>
        <Grid.Column>
          {search && (
            <Input
              icon={<Icon name="search" inverted circular link color="blue" />}
              placeholder="Buscar..."
            />
          )}
        </Grid.Column>
      </Grid>
      <Table size="small">
        <HeaderTable
          data={entities}
          header={columnHeader}
          entities={entities}
          sortedColumn={sortedColumn}
          order={order}
          sortByColumn={(key: string) => sortByColumn(key)}
        />
        <Table.Body>
          <Rows
            loading={loading}
            items={entities.items}
            columnHeader={columnHeader}
            extractValues={ExtractJSONValues}
          />
        </Table.Body>
      </Table>
      <Grid>
        <Grid.Column textAlign="center">
          <PaginationTable totalPages={entities.totalPages} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export function areEqual(
  prevProps: IDataTableProps,
  nextProps: IDataTableProps
) {
  const prev = {
    items: prevProps.data?.data?.items,
    externalLoader: prevProps.externalLoader
  };
  const next = {
    items: nextProps.data?.data?.items,
    externalLoader: nextProps.externalLoader
  };
  return isEqual(prev, next);
}

export default memo(MlDataTable, areEqual);
