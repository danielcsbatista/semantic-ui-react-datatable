import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

function HeaderTable(params: any) {
  const { header, entities, sortedColumn, order, sortByColumn } = params;
  let headerKey = 0;

  const SortIconHeader = () => {
    if (order === 'asc') return <Icon name="sort up" />;
    else return <Icon name="sort down" />;
  };

  return (
    <Table.Header>
      <Table.Row>
        {header.map((key: any) => {
          const nameColumn = key.title || '';
          if (nameColumn === '' || !key.key || key.key === '') return null;
          headerKey += 1;
          return (
            <Table.HeaderCell
              key={headerKey}
              onClick={() =>
                key.sortable || key.sortable === undefined
                  ? entities.items.length !== 0
                    ? sortByColumn(key.key)
                    : {}
                  : {}
              }
              className="headerColumn"
            >
              {key.key === sortedColumn && <SortIconHeader />}
              {nameColumn}
            </Table.HeaderCell>
          );
        })}
      </Table.Row>
    </Table.Header>
  );
}

export default HeaderTable;
