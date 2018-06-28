// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import SignUpForm from './../../forms/SignUpForm.jsx';
import { signup } from './../../../actions/AuthAction';
import { handleErrorCatch } from './../../../utils';

// define proptypes for SignUpPage component
const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
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
    this.submit = this.submit.bind(this);
  }

  /**
   * submit
   * @desc handles submitting of the SignUpForm
   * @param {Object} data user credentials collected from the SignUpForm
   * @return {func} signup
   */
  submit(data) {
    return this.props
      .signup(data)
      .then((user) => {
        // alert the user a welcome message
        alertify.success(`Welcome to WeConnect, ${user.firstname}`);
        this.props.history.push('/businesses');
      })
      .catch((err) => {
        // alert the user the error that occurred
        alertify.error(handleErrorCatch(err.response.data));
      });
  }

  /**
   * render
   * @desc renders the SignUpPage component
   * @return {Object} the SignUpPage component
   */
  render() {
    return (
      <div className="pb-main">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Create your account</h2>
                <SignUpForm submit={this.submit}/>
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

export default connect(null, { signup })(SignUpPage);
