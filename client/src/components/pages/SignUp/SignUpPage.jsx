// import required modules
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validate } from './../../../utils';
import SignUpForm from './../../forms/SignUpForm.jsx';
import { signup } from './../../../actions/AuthAction';
import InfoMessage from './../../messages/InfoMessage.jsx';

// define proptypes for SignUpPage component
const propTypes = {
  signup: PropTypes.func.isRequired,
  isRequestLoading: PropTypes.bool.isRequired,
  serverError: PropTypes.string,
  userId: PropTypes.string
};

/**
 * @class SignUpPage
 * @desc renders the SignUpPage of the app
 * @return {void}
 */
export class SignUpPage extends Component {
  /**
   * constructor
   * @desc constructor for the SignUpPage component
   * @return {void}
   */
  constructor() {
    super();
    this.state = {
      data: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {Object} new state object
   */
  onChange(event) {
    return this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the signup form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return this.props.signup(this.state.data, this.props);
    }
  }

  /**
   * render
   * @desc renders the SignUpPage component
   * @return {Object} the SignUpPage component
   */
  render() {
    const {
      isRequestLoading, serverError, userId
    } = this.props;
    const { data, errors } = this.state;

    if (userId) {
      return <Redirect to="/" />;
    }

    return (
      <main className="pb-main userForms">
        <div className="h-100 d-flex justify-content-center">
          <div
            className="card col-md-8 align-self-center mt-5"
            style={{ minHeight: '85%', height: '100%' }}
          >
            <div className="row h-100">
              <div className="col-md-6 login-img"></div>
              <div className="col-md-6 d-flex">
                <div className="container align-self-center">
                  <h2 className="text-center">Sign Up</h2>
                  {
                    !isRequestLoading && serverError &&
                    <InfoMessage text={serverError} type="danger" />
                  }
                  <SignUpForm
                    isLoading={isRequestLoading}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    errors={errors}
                    data={data}
                  />
                  <div className="d-flex justify-content-between small pt-2">
                    <p className="d-inline-block">Already a member? <Link to='/signin'>Sign In </Link></p>
                    <p className="d-inline-block"><Link to="#">Forgot Password?</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

SignUpPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} SignUpPage props
 */
const mapStateToProps = state => ({
  isRequestLoading: state.loadingReducer.isRequestLoading,
  serverError: state.userReducer.error,
  userId: state.userReducer.id
});

export default connect(mapStateToProps, { signup })(SignUpPage);
