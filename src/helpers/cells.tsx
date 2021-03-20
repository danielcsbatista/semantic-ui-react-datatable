import React, { memo } from "react";
import { Table } from "semantic-ui-react";
import { isEqual } from "lodash";

function Cells(params: any) {
  const { data, header } = params;
  let key = 0;
  return header.map((val: any) => {
    if (!val.key || val.key === "") return null;
    key += 1;
    return <Table.Cell key={key}>{params.extractValues(data, val)}</Table.Cell>;
  });
}

export function areEqual(prevProps: any, nextProps: any) {
  return isEqual(prevProps.data, nextProps.data);
}

export default memo(Cells, areEqual);
