/* eslint no-undef: "off" */
import React from 'react';
import SearchBar from './../../../src/components/forms/SearchBar.jsx';

let props;
const setup = () => {
  props = {
    data: {},
    handleSearch: jest.fn(),
    onChange: jest.fn(),
    reset: jest.fn()
  };
  return shallow(<SearchBar {...props} />);
};

describe('SearchBar component', () => {
  it('should render the SearchBar component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('section').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(3);
    expect(wrapper.find('h1').length).to.eql(1);
    expect(wrapper.find('p').length).to.eql(1);
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('input').length).to.eql(1);
    expect(wrapper.find('option').length).to.eql(3);
    expect(wrapper.find('select').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(1);
    expect(wrapper.find('span').length).to.eql(1);
  });
});
