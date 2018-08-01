/* eslint no-undef: "off" */
import React from 'react';
import connectedNavBar, { NavBar } from './../../../src/components/common/NavBar.jsx';

let props;
const setup = () => {
  props = {
    isAuthenticated: true || false,
    userLogout: jest.fn()
  };
  return shallow(<NavBar { ...props } />);
};

describe('NavBar component', () => {
  describe('unconnected NavBar component', () => {
    it('should render the NavBar component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('header').length).to.eql(1);
      expect(wrapper.find('nav').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(2);
      expect(wrapper.find('Link').length).to.eql(5);
      expect(wrapper.find('button').length).to.eql(1);
      expect(wrapper.find('span').length).to.eql(1);
      expect(wrapper.find('ul').length).to.eql(1);
      expect(wrapper.find('li').length).to.eql(4);
    });

    // it('should signin user when form is submitted', () => {
    //   const wrapper = setup();
    //   const action = wrapper.instance();
    //   const logout = jest.spyOn(wrapper.instance(), 'onClick');
    //   action.onClick();
    //   expect(logout).toBeCalled();
    // });
  });

  describe('Connected NavBar component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        userReducer: {
          id: '956e4ce8-38a1-41ed-bae1-546cee407184'
        }
      });
      const wrapper = shallow(<connectedNavBar store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
