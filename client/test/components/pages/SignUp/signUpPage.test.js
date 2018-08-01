/* eslint no-undef: "off" */
import React from 'react';
import connectedSignUpPage, { SignUpPage } from './../../../../src/components/pages/SignUp/SignUpPage.jsx';

let props;
const setup = () => {
  props = {
    signup: jest.fn(() => Promise.resolve()),
    isRequestLoading: false,
    serverError: 'Some error'
  };
  return shallow(<SignUpPage { ...props } />);
};

const setupWithUser = () => {
  props = {
    signup: jest.fn(),
    isRequestLoading: false,
    serverError: 'Some error',
    userId: '4af144cc-6964-423f-b5c0-1793ae2a4361'
  };
  return shallow(<SignUpPage { ...props } />);
};

describe('SignUpPage component', () => {
  describe('unconnected SignUpPage component', () => {
    it('should render the SignUpPage component successfully', () => {
      const wrapper = setup();
      expect(wrapper.find('main').length).to.eql(1);
      expect(wrapper.find('div').length).to.eql(7);
      expect(wrapper.find('h2').length).to.eql(1);
      expect(wrapper.find('SignUpForm').length).to.eql(1);
      expect(wrapper.find('InfoMessage').length).to.eql(1);
      expect(wrapper.find('p').length).to.eql(2);
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

    it('should change the value of lastname in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'lastname',
          value: 'longe'
        }
      };
      action.onChange(event);
      expect(action.state.data.lastname).to.eql('longe');
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

    it('should change the value of confirmPassword in the component state', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: {
          name: 'confirmPassword',
          value: 'dopePassword'
        }
      };
      action.onChange(event);
      expect(action.state.data.confirmPassword).to.eql('dopePassword');
    });

    it('should call the onSubmit method', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const submit = jest.spyOn(wrapper.instance(), 'onSubmit');
      action.onSubmit({ preventDefault: () => 1 });
      jestExpect(submit).toBeCalled();
    });
  });

  describe('unconnected SignUpPage component with user', () => {
    it('should render the SignUpPage component successfully', () => {
      const wrapper = setupWithUser();
      expect(wrapper.find('Redirect').length).to.eql(1);
    });
  });

  describe('Connected SignUpPage component', () => {
    it('tests that the component successfully renders', () => {
      const store = mockStore({
        isRequestLoading: false,
        serverError: 'Some error',
        userId: '4af144cc-6964-423f-b5c0-1793ae2a4361'
      });
      const wrapper = shallow(<connectedSignUpPage store={store} />);
      expect(wrapper.length).to.eql(1);
    });
  });
});
