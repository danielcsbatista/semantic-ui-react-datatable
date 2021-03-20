import React, { memo } from 'react';
import { Table } from 'semantic-ui-react';
import { IColumnHeader } from '../interfaces';
import { isEqual } from 'lodash';
import Cells from './cells';

interface IRows {
  items: Array<any>;
  columnHeader: Array<IColumnHeader>;
  extractValues: Function;
  loading: boolean;
}

function Rows({ items, columnHeader, extractValues, loading }: IRows) {
  if (items.length > 0 && !loading) {
    let key = 0;
    return (
      <>
        {items.map((item: any) => {
          key += 1;
          return (
            <Table.Row key={key}>
              <Cells
                data={item}
                header={columnHeader}
                extractValues={extractValues}
              />
            </Table.Row>
          );
        })}
      </>
    );
  } else {
    return (
      <Table.Row>
        <Table.Cell textAlign="center">Nenhum item encontrado.</Table.Cell>
      </Table.Row>
    );
  }
}

function areEqual(prevProps: IRows, nextProps: IRows) {
  return isEqual(prevProps.items, nextProps.items);
}

export default memo(Rows, areEqual);
