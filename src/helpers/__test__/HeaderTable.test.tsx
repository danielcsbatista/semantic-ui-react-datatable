import React from 'react';
import { mount } from 'enzyme';
import {
  mockResultJson,
  columnsHeadersUndefined,
  columnsHeadersSortableUndefined,
  mockItemEmpty
} from '../../__test__/mocks';
import HeaderTable from '../headerTable';
import { Table } from 'semantic-ui-react';

describe('HeaderTable', () => {
  it('Should to render empty table head', () => {
    const wrapper = mount(
      <HeaderTable
        header={columnsHeadersUndefined}
        entities={mockResultJson}
        sortedColumn={undefined}
        order="asc"
        sortByColumn={() => {}}
      />
    );
    expect(wrapper.html()).toEqual(
      '<thead class=""><tr class=""></tr></thead>'
    );
    wrapper.unmount();
  });

  it('Should to click on table head', () => {
    const wrapper = mount(
      <HeaderTable
        header={columnsHeadersSortableUndefined}
        entities={mockResultJson.data}
        sortedColumn={undefined}
        order="asc"
        sortByColumn={() => {}}
      />
    );

    const headerTable = wrapper.find('tr').at(0);
    headerTable.simulate('click');
    wrapper.update();

    expect(headerTable.html()).toEqual(
      '<tr class=""><th class="headerColumn">Cpf</th></tr>'
    );
    wrapper.unmount();
  });
});
