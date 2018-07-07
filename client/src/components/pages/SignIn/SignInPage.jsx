// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from './../../forms/SignInForm.jsx';
import { signin } from './../../../actions/AuthAction';
import InfoMessage from './../../messages/InfoMessage.jsx';
import { validate } from './../../../utils';


// define proptypes for SignInPage component
const propTypes = {
  signin: PropTypes.func.isRequired,
  isRequestLoading: PropTypes.bool.isRequired,
  serverError: PropTypes.string
};

/**
 * @class SignInPage
 * @desc renders the SignInPage component
 * @return {*} void
 */
class SignInPage extends Component {
  /**
   * constructor
   * @desc constructor for the SignInPage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: ''
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
   * @desc handles submit of the signin form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return this.props.signin(this.state.data, this.props);
    }
  }

  /**
   * render
   * @desc renders the SignInPage component
   * @return {Object} the SignInPage component
   */
  render() {
    const { isRequestLoading, serverError } = this.props;
    const { errors, data } = this.state;

    return (
      <div className="pb-main">
        {!isRequestLoading && serverError && <InfoMessage text={serverError} type="danger" />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Signin</h2>
                <SignInForm
                  isLoading={isRequestLoading}
                  onSubmit={this.onSubmit}
                  onChange={this.onChange}
                  errors={errors}
                  data={data}
                />
                <div className="d-flex justify-content-between small pt-2">
                  <p className="d-inline-block">Not a member? <Link to='/signup'>Sign up </Link></p>
                  <p className="d-inline-block"><Link to='/'>Forgot Password?</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} SignInPage props
 */
function mapStateToProps(state) {
  return {
    isRequestLoading: state.loadingReducer.isRequestLoading,
    serverError: state.userReducer.error
  };
}

export default connect(mapStateToProps, { signin })(SignInPage);
