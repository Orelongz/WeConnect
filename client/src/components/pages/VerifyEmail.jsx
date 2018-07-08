import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { verifyAccount } from './../../actions/AuthAction';

const propTypes = {
  verifyAccount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  User: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      verificationToken: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

/**
 * @class VerifyEmail
 * @desc shows when user is verifying account
 * @returns {*} void
 */
class VerifyEmail extends Component {
  /**
   * componentDidMount
   * @desc
   * @returns {*} void
   */
  componentDidMount() {
    const { verificationToken } = this.props.match.params;
    this.props.verifyAccount({ verificationToken });
  }

  /**
   * render()
   * @desc renders the verifyEmail component
   * @returns {Object} react component
   */
  render() {
    const { User, isLoading } = this.props;
    return (
      <div>
        {
          !User.id &&
          <div>
            You have to be logged in to verify your account.
            <Link to="/signin" className="btn btn-primary">Sign In</Link>
          </div>
        }
        {
          (User.id) && !User.isConfirmed && isLoading &&
          <div>Please wait, we are verifying your account</div>
        }
        {
          User.isConfirmed &&
          <div>
            Your account has already been verified thank you and have a wonderful time on WeConnect
            <Link to="/dashboard" className="btn btn-primary">Go to dashboard</Link>
          </div>
        }
      </div>
    );
  }
}

VerifyEmail.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
function mapStateToProps(state) {
  return {
    User: state.userReducer,
    isLoading: state.loadingReducer.isRequestLoading
  };
}

export default connect(mapStateToProps, {
  verifyAccount
})(VerifyEmail);
