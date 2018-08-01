/* eslint no-undef: "off" */
import React from 'react';
import { credentials as businessDetails } from './../../../mockData/businessData';
import { categories } from './../../../mockData/categoriesData';
import connectedRegisterOrEditPage, { RegisterOrEditPage } from './../../../../src/components/pages/RegisterOrEditBusiness/RegisterOrEditPage.jsx';

let props;
let propsOnEdit;
const setup = () => {
  props = {
    newBusiness: jest.fn(() => Promise.resolve()),
    allCategories: jest.fn(() => Promise.resolve()),
    getBusiness: jest.fn(() => Promise.resolve()),
    editBusiness: jest.fn(() => Promise.resolve()),
    changeOwnership: jest.fn(() => Promise.resolve()),
    categories,
    history: {
      push: jest.fn()
    },
    serverError: jest.fn().getMockName(),
    match: {
      path: '/businesses/new',
      params: {}
    }
  };
  return shallow(<RegisterOrEditPage { ...props } />);
};

const setupOnEdit = () => {
  propsOnEdit = {
    ...props,
    match: {
      path: jest.fn().getMockName(),
      params: {
        businessId: jest.fn().getMockName()
      }
    },
    businessDetails
  };
  return shallow(<RegisterOrEditPage { ...propsOnEdit } />);
};

describe('RegisterOrEditPage component', () => {
  describe('unconnected RegisterOrEditPage component', () => {
    it('should render the Register page successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(4);
      expect(wrapper.find('BusinessForm').length).to.eql(1);
      expect(wrapper.find('InfoMessage').length).to.eql(1);
      expect(wrapper.find('h2').length).to.eql(1);
      expect(wrapper.find('p').length).to.eql(1);
    });

    it('should render the EditPage component successfully', () => {
      const wrapper = setupOnEdit();
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(4);
      expect(wrapper.find('BusinessForm').length).to.eql(1);
      expect(wrapper.find('InfoMessage').length).to.eql(1);
      expect(wrapper.find('BusinessTransferForm').length).to.eql(1);
      expect(wrapper.find('h2').length).to.eql(1);
      expect(wrapper.find('p').length).to.eql(1);
    });

    it('should change the value of businessName in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'businessName',
          value: 'mybusiness'
        }
      };
      action.onChange(event);
      expect(action.state.data.businessName).to.eql('mybusiness');
    });

    it('should change the value of email in the component state', () => {
      const wrapper = setupOnEdit();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'email',
          value: 'pelumi@mail.com'
        }
      };
      action.handleTransferChange(event);
      expect(action.state.transferData.email).to.eql('pelumi@mail.com');
    });

    it('should call the businessTransfer method', () => {
      const wrapper = setupOnEdit();
      const action = wrapper.instance();
      const transfer = jest.spyOn(wrapper.instance(), 'businessTransfer');
      action.businessTransfer({ preventDefault: () => 1 });
      jestExpect(transfer).toBeCalled();
    });

    it('should call the componentDidMount method', () => {
      const wrapper = setupOnEdit();
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
  });

  describe('Connected RegisterOrEditPage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        categories,
        businessDetails,
        serverError: 'Some error'
      });
      const wrapper = shallow(<connectedRegisterOrEditPage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
