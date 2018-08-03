/* eslint no-undef: "off" */
import React from 'react';
import Paginate from './../../../src/components/common/Paginate.jsx';

const setup = () => {
  props = {
    count: 3,
    pageSize: 3,
    onChange: jest.fn(),
    current: 1
  };
  return shallow(<Paginate { ...props } />);
};

describe('Paginate component', () => {
  it('should render the Footer component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(1);
    expect(wrapper.find('Pagination').length).to.eql(1);
  });
});
