/* eslint no-undef: "off" */
import React from 'react';
import { businessObject } from './../../../mockData/businessData';
import { signinResponse } from './../../../mockData/userData';
import BusinessProfile from './../../../../src/components/pages/BusinessProfile/BusinessProfile.jsx';

let props;
const setup = () => {
  props = {
    handleDeleteBusiness: jest.fn(),
    businessDetails: businessObject.data.business,
    User: signinResponse.data.user,
    isLoading: false
  };
  return shallow(<BusinessProfile { ...props } />);
};

describe('BusinessProfile component', () => {
  it('should render the Reviews container successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(9);
    expect(wrapper.find('ul').length).to.eql(1);
    expect(wrapper.find('li').length).to.eql(5);
    expect(wrapper.find('img').length).to.eql(1);
  });
});
