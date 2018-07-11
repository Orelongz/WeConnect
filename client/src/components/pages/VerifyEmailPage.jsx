import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { verifyAccount } from '../../actions/AuthAction';
import { pageSpinner } from './../../../public/images';

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
      <div className="fill-page d-flex">
      <div className="container align-self-center text-center">
        <div>
          {
            (User.id) && !User.isConfirmed && isLoading &&
            <div>
              <h1 className="display-4">
                Hello {User.firstname}
              </h1>
              <h3>Please wait, while we are verify your account</h3>
              <img src="pageSpinner" alt="loading bar"/>
            </div>
          }
          {
            User.isConfirmed &&
            <div>
              <h1 className="display-4">
                Account verified.
              </h1>
              <h3>Thank you and have a wonderful time on WeConnect</h3>
              <Link to="/dashboard" className="btn btn-primary">
                Go to dashboard
              </Link>
            </div>
          }
        </div>
      </div>
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
    isLoading: state.loadingReducer.isRequestLoading,
  };
}

export default connect(mapStateToProps, {
  verifyAccount
})(VerifyEmail);
