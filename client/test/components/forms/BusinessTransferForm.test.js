/* eslint no-undef: "off" */
import React from 'react';
import BusinessTransferForm from './../../../src/components/forms/BusinessTransferForm.jsx';

let props;
const setup = () => {
  props = {
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    transferData: {
      email: '',
      error: { email: 'required' }
    }
  };
  return shallow(<BusinessTransferForm {...props} />);
};

describe('BusinessTransferForm component', () => {
  it('should render the BusinessTransferForm component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(2);
    expect(wrapper.find('input').length).to.eql(1);
    expect(wrapper.find('label').length).to.eql(1);
    expect(wrapper.find('button').length).to.eql(1);
  });
});
