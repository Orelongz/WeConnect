/* eslint no-undef: "off" */
import React from 'react';
import Footer from './../../../src/components/common/Footer.jsx';

const setup = () => shallow(<Footer />);

describe('Footer component', () => {
  it('should render the Footer component successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('footer').length).to.eql(1);
    expect(wrapper.find('div').length).to.eql(9);
    expect(wrapper.find('Link').length).to.eql(1);
    expect(wrapper.find('h4').length).to.eql(1);
    expect(wrapper.find('p').length).to.eql(1);
    expect(wrapper.find('i').length).to.eql(3);
  });
});
