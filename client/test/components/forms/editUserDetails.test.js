/* eslint no-undef: "off" */
import React from 'react';
import EditUserDetails from './../../../src/components/forms/EditUserDetails.jsx';

let props;
const setup = () => {
  props = {
    displayImage: jest.fn().getMockName(),
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    errors: {
      firstname: 'required',
      lastname: 'required',
      email: 'required'
    },
    data: {},
    toggleEditStatus: jest.fn()
  };
  return shallow(<EditUserDetails {...props} />);
};

describe('EditUserDetails component', () => {
  it('should render the EditUserDetails component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(9);
    expect(wrapper.find('img').length).to.eql(1);
    expect(wrapper.find('input').length).to.eql(4);
    expect(wrapper.find('label').length).to.eql(2);
    expect(wrapper.find('button').length).to.eql(2);
  });
});
