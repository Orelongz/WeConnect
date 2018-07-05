// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpForm from './../../forms/SignUpForm.jsx';
import { signup } from './../../../actions/AuthAction';
import InfoMessage from './../../messages/InfoMessage.jsx';

// define proptypes for SignUpPage component
const propTypes = {
  signup: PropTypes.func.isRequired,
  isRequestLoading: PropTypes.bool.isRequired,
  error: PropTypes.string
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
    return this.props.signup(data, this.props);
  }

  /**
   * render
   * @desc renders the SignUpPage component
   * @return {Object} the SignUpPage component
   */
  render() {
    const { isRequestLoading, error } = this.props;

    return (
      <div className="pb-main">
        {!isRequestLoading && error && <InfoMessage text={error} type="danger" />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card col-xs-10 col-sm-8 col-md-6 col-lg-4">
              <div className="container">
                <h2 className="text-center my-4">Create your account</h2>
                <SignUpForm submit={this.submit} isLoading={isRequestLoading}/>
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
    error: state.userReducer.error
  };
}

export default connect(mapStateToProps, { signup })(SignUpPage);
