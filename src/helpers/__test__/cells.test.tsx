import React from 'react';
import { mount } from 'enzyme';
import { areEqual } from '../cells';
import { mockResultJson, columnsHeadersUndefined } from '../../__test__/mocks';
import Cells from '../cells';

describe('Cells', () => {
  it('Should to compare two objects', () => {
    const mock = {
      data: mockResultJson
    };
    expect(areEqual(mock, mock)).toBeTruthy();
  });

  it('Should call render during render', () => {
    const wrapper = mount(
      <Cells
        data={mockResultJson}
        header={columnsHeadersUndefined}
        extractValues={() => 'ok'}
      />
    );
    expect(wrapper.html()).toBeNull();
    wrapper.unmount();
  });
});
