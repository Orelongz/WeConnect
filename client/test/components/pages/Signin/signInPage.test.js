/* eslint no-undef: "off" */
import React from 'react';
import connectedSignInPage, { SignInPage } from './../../../../src/components/pages/Signin/SignInPage.jsx';

let props;
const setup = () => {
  props = {
    signin: jest.fn(),
    isRequestLoading: false,
    serverError: 'Some error'
  };
  return shallow(<SignInPage { ...props } />);
};

const setupWithUser = () => {
  props = {
    signin: jest.fn(),
    isRequestLoading: false,
    serverError: 'Some error',
    userId: '4af144cc-6964-423f-b5c0-1793ae2a4361'
  };
  return shallow(<SignInPage { ...props } />);
};

describe('SignInPage component', () => {
  describe('unconnected SignInPage component', () => {
    it('should render the SignInPage component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(7);
      expect(wrapper.find('h2').length).to.eql(1);
      expect(wrapper.find('SignInForm').length).to.eql(1);
      expect(wrapper.find('InfoMessage').length).to.eql(1);
      expect(wrapper.find('p').length).to.eql(2);
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

    it('should change the value of password in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'password',
          value: 'dopePassword'
        }
      };
      action.onChange(event);
      expect(action.state.data.password).to.eql('dopePassword');
    });

    it('should call the onSubmit method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const submit = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();
    });
  });

  describe('unconnected SignInPage component with user', () => {
    it('should render the SignInPage component successfully', () => {
      const wrapper = setupWithUser();
      expect(wrapper.find('Redirect').length).to.eql(1);
    });
  });

  describe('Connected SignInPage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        isRequestLoading: false,
        serverError: 'Some error',
        userId: '4af144cc-6964-423f-b5c0-1793ae2a4361'
      });
      const wrapper = shallow(<connectedSignInPage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
