/* eslint no-undef: "off" */
import React from 'react';
import connectedHomePage, { HomePage } from './../../../../src/components/pages/HomePage/HomePage.jsx';

let props;
const setup = () => {
  props = {
    contactUs: jest.fn(() => Promise.resolve()),
    isLoading: false
  };
  return shallow(<HomePage { ...props } />);
};

describe('HomePage component', () => {
  describe('unconnected HomePage component', () => {
    it('should render the HomePage component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).to.eql(46);
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('section').length).to.eql(5);
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('h1').length).to.eql(1);
      expect(wrapper.find('p').length).to.eql(15);
      expect(wrapper.find('img').length).to.eql(7);
      expect(wrapper.find('h6').length).to.eql(4);
      expect(wrapper.find('h2').length).to.eql(3);
      expect(wrapper.find('ContactForm').length).to.eql(1);
      expect(wrapper.find('i').length).to.eql(6);
    });

    it('should change the value of name in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'name',
          value: 'Longe Pelumi'
        }
      };
      action.onChange(event);
      expect(action.state.data.name).to.eql('Longe Pelumi');
    });

    it('should change the value of email in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'email',
          value: 'longe@mail.com'
        }
      };
      action.onChange(event);
      expect(action.state.data.email).to.eql('longe@mail.com');
    });

    it('should change the value of message in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'message',
          value: 'This is a new message'
        }
      };
      action.onChange(event);
      expect(action.state.data.message).to.eql('This is a new message');
    });

    it('should call the onSubmit method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const submit = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.state.data = {
        name: '', email: '', message: ''
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();

      action.state.data = {
        name: 'name', email: 'mail@mail.com', message: 'some message'
      };
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();
    });
  });

  describe('Connected HomePage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        isLoading: false
      });
      const wrapper = shallow(<connectedHomePage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
