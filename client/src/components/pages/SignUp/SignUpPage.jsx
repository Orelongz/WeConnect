// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  serverError: PropTypes.string
};

/**
 * @class SignUpPage
 * @desc renders the SignUpPage of the app
 * @return {void}
 */
class SignUpPage extends Component {
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
    const { isRequestLoading, serverError } = this.props;
    const { data, errors } = this.state;

    return (
      <div className="pb-main">
        {!isRequestLoading && serverError && <InfoMessage text={serverError} type="danger" />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Create your account</h2>
                <SignUpForm
                  isLoading={isRequestLoading}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  errors={errors}
                  data={data}
                />
                <div className="d-inline-block pull-right small pt-2">
                  <p>Already a member? <Link to='/signin'>Sign in</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} SignUpPage props
 */
function mapStateToProps(state) {
  return {
    isRequestLoading: state.loadingReducer.isRequestLoading,
    serverError: state.userReducer.error
  };
}

export default connect(mapStateToProps, { signup })(SignUpPage);
