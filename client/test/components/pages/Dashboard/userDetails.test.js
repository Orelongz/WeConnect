/* eslint no-undef: "off" */
import React from 'react';
import UserDetails from './../../../../src/components/pages/Dashboard/UserDetails.jsx';

let props;
let propsOnEdit;
const setup = () => {
  props = {
    User: {
      firstname: jest.fn().getMockName(),
      lastname: jest.fn().getMockName(),
      email: jest.fn().getMockName()
    },
    data: {},
    isEditing: false,
    errors: {},
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    toggleEditStatus: jest.fn(),
    displayImage: jest.fn().getMockName()
  };
  return shallow(<UserDetails { ...props } />);
};

const setupOnEdit = () => {
  propsOnEdit = {
    ...props,
    isEditing: true
  };
  return shallow(<UserDetails { ...propsOnEdit } />);
};


describe('UserDetails component', () => {
  it('should render the Register page successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(7);
    expect(wrapper.find('img').length).to.eql(1);
    expect(wrapper.find('label').length).to.eql(2);
    expect(wrapper.find('h3').length).to.eql(2);
    expect(wrapper.find('button').length).to.eql(1);
  });

  it('should render the Register page successfully', () => {
    const wrapper = setupOnEdit();
    expect(wrapper.find('EditUserDetails').length).to.eql(1);
  });
});
