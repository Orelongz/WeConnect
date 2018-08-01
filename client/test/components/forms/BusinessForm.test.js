/* eslint no-undef: "off" */
import React from 'react';
import BusinessForm from './../../../src/components/forms/BusinessForm.jsx';

let props;
const setup = () => {
  props = {
    displayPreview: jest.fn(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    data: {},
    errors: {},
    categories: [],
    FormAction: jest.fn().getMockName(),
    history: {},
    ImageHeader: jest.fn().getMockName()
  };
  return shallow(<BusinessForm {...props} />);
};

describe('BusinessForm component', () => {
  it('should render the BusinessForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(18);
    expect(wrapper.find('label').length).to.eql(10);
    expect(wrapper.find('input').length).to.eql(6);
    expect(wrapper.find('select').length).to.eql(4);
    expect(wrapper.find('textarea').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(2);
  });
});
