/* eslint no-undef: "off" */
import React from 'react';
import { signinResponse } from './../../../mockData/userData';
import { allBusinesses } from './../../../mockData/businessData';
import connectedDashboard, { Dashboard } from './../../../../src/components/pages/Dashboard/Dashboard.jsx';

let props;
const setup = () => {
  props = {
    userBusinesses: jest.fn(() => Promise.resolve()),
    deleteBusiness: jest.fn(() => Promise.resolve()),
    editUser: jest.fn(() => Promise.resolve()),
    User: signinResponse.data.user,
    businesses: allBusinesses.data.businesses,
    match: {
      url: jest.fn().getMockName()
    }
  };
  return shallow(<Dashboard { ...props } />);
};

describe('Dashboard component', () => {
  describe('unconnected Dashboard component', () => {
    it('should render the Register page successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).to.eql(1);
      expect(wrapper.find('ul').length).to.eql(1);
      expect(wrapper.find('Link').length).to.eql(2);
      expect(wrapper.find('Route').length).to.eql(2);
      expect(wrapper.find('VerifyEmailMessage').length).to.eql(1);
    });

    it('should change the value of firstname in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'firstname',
          value: 'pelumi'
        }
      };
      action.onChange(event);
      expect(action.state.data.firstname).to.eql('pelumi');
    });

    it('should call the toggleEditStatus method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const toggleEditStatus = jest.spyOn(wrapper.instance(), 'toggleEditStatus');
      action.toggleEditStatus();
      jestExpect(toggleEditStatus).toBeCalled();
      expect(action.state.isEditing).to.eql(true);
      action.toggleEditStatus();
      expect(action.state.isEditing).to.eql(false);
    });

    it('should call the componentDidMount method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const mount = jest.spyOn(wrapper.instance(), 'componentDidMount');
      action.componentDidMount();
      jestExpect(mount).toBeCalled();
    });

    it('should call the onSubmit method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const submit = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();
    });

    it('should call the deleteBusiness method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const deleteBusiness = jest.spyOn(wrapper.instance(), 'deleteBusiness');
      action.deleteBusiness({ preventDefault: () => 1 });
      jestExpect(deleteBusiness).toBeCalled();
    });
  });

  describe('Connected Dashboard component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        businesses: allBusinesses.data.businesses,
        User: signinResponse.data.user,
      });
      const wrapper = shallow(<connectedDashboard store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
