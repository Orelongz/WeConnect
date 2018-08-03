/* eslint no-undef: "off" */
import React from 'react';
import { allBusinesses } from './../../../mockData/businessData';
import connectedBusinessesPage, { BusinessesPage } from './../../../../src/components/pages/Businesses/BusinessesPage.jsx';

let props;
const setup = () => {
  props = {
    allBusinesses: jest.fn(() => Promise.resolve()),
    businesses: allBusinesses.data.businesses,
    paginate: allBusinesses.data.paginate,
    isLoading: false,
    displayError: jest.fn().getMockName()
  };
  return shallow(<BusinessesPage { ...props } />);
};

describe('BusinessesPage component', () => {
  describe('unconnected BusinessesPage component', () => {
    it('should render the BusinessesPage component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).to.eql(12);
      expect(wrapper.find('SearchBar').length).to.eql(1);
      expect(wrapper.find('Paginate').length).to.eql(0);
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('img').length).to.eql(2);
      expect(wrapper.find('Link').length).to.eql(4);
      expect(wrapper.find('p').length).to.eql(4);
      expect(wrapper.find('h5').length).to.eql(2);
      expect(wrapper.find('h2').length).to.eql(1);
    });

    it('should change the value of search in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'search',
          value: 'Soft work'
        }
      };
      action.onChange(event);
      expect(action.state.search).to.eql('Soft work');
    });

    it('should change the value of value in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'value',
          value: 'By Name'
        }
      };
      action.onChange(event);
      expect(action.state.value).to.eql('By Name');
    });

    it('should call the handleSearch method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const handleSearch = jest.spyOn(wrapper.instance(), 'handleSearch');
      action.state = {
        value: 'name', search: 'business'
      };
      action.handleSearch({ preventDefault: () => 1 });
      jestExpect(handleSearch).toBeCalled();
    });

    it('should call the onPageChange method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const pageChange = jest.spyOn(wrapper.instance(), 'onPageChange');
      action.onPageChange(2);
      jestExpect(pageChange).toBeCalled();

      action.state = {
        value: 'name', search: 'business'
      };
      action.onPageChange(2);
    });
  });

  describe('Connected BusinessesPage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        isLoading: false,
        businesses: allBusinesses.data.businesses,
        paginate: allBusinesses.data.paginate,
        displayError: jest.fn().getMockName()
      });
      const wrapper = shallow(<connectedBusinessesPage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
