import React from 'react';
import { Table, Segment, Message } from 'semantic-ui-react';

function Error(params: any) {
  const { description } = params;
  return (
    <Segment
      basic
      style={{
        padding: '0px'
      }}
    >
      <Message
        icon="exclamation circle"
        header="Ops!!"
        content={description}
        color="yellow"
      />
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="headerColumn"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center">
              Nenhum item pode ser listado.
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
}

export default Error;
