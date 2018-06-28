// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import SignInForm from './../../forms/SignInForm.jsx';
import { signin } from './../../../actions/AuthAction';
import { handleErrorCatch } from './../../../utils';

// define proptypes for SignInPage component
const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signin: PropTypes.func.isRequired
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
    this.submit = this.submit.bind(this);
  }

  /**
   * submit
   * @desc handles submitting of the SignInForm
   * @param {Object} data user credentials collected from the SignInForm
   * @return {func} signin
   */
  submit(data) {
    return this.props
      .signin(data)
      .then((user) => {
        // alerts the user a welcome message
        alertify.success(`Welcome back, ${user.firstname}`);
        this.props.history.push('/businesses');
      })
      .catch((err) => {
        // alerts the user the error that occurred
        alertify.error(handleErrorCatch(err.response.data));
      });
  }

  /**
   * render
   * @desc renders the SignInPage component
   * @return {Object} the SignInPage component
   */
  render() {
    return (
      <div className="pb-main">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Signin</h2>
                <SignInForm submit={this.submit}/>
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

export default connect(null, { signin })(SignInPage);
