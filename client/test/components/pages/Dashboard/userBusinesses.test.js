/* eslint no-undef: "off" */
import React from 'react';
import { allBusinesses } from './../../../mockData/businessData';
import UserBusinesses from './../../../../src/components/pages/Dashboard/UserBusinesses.jsx';

let props;
const setup = () => {
  props = {
    deleteBusiness: jest.fn(() => Promise.resolve()),
    businesses: allBusinesses.data.businesses
  };
  return shallow(<UserBusinesses { ...props } />);
};

describe('UserBusinesses component', () => {
  it('should render the UserBusinesses successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).to.eql(14);
    expect(wrapper.find('img').length).to.eql(2);
    expect(wrapper.find('Link').length).to.eql(6);
    expect(wrapper.find('h5').length).to.eql(2);
    expect(wrapper.find('p').length).to.eql(4);
    expect(wrapper.find('button').length).to.eql(2);
  });
});
