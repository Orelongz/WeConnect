// import required modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import UserDetails from './UserDetails.jsx';
import UserBusinesses from './UserBusinesses.jsx';
import VerifyEmailMessage from '../../messages/VerifyEmailMessage.jsx';
import {
  userBusinesses,
  deleteBusiness
} from './../../../actions/businessAction';
import { editUser } from './../../../actions/AuthAction';
import { validate } from './../../../utils';

// define proptypes for Dashboard component
const propTypes = {
  userBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  businesses: PropTypes.array,
  match: PropTypes.object.isRequired
};

/**
 * @class Dashboard
 * @desc renders the Dashboard of the app
 * @return {void}
 */
export class Dashboard extends Component {
  /**
   * constructor
   * @desc constructor for the Dashboard component
   * @return {void}
   */
  constructor() {
    super();
    this.state = {
      data: { userImage: '' },
      isEditing: false,
      errors: {}
    };
    this.toggleEditStatus = this.toggleEditStatus.bind(this);
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * deleteBusiness
   * @desc handles deleting a business
   * @param {Object} businessId
   * @return {func} deleteBusiness
   */
  deleteBusiness(businessId) {
    this.props.deleteBusiness(businessId);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {func} users businesses
   */
  componentDidMount() {
    document.title = `${this.props.User.firstname}'s profile`;
    this.props.userBusinesses(this.props);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {*} void
   */
  onChange(event) {
    if (event.target.name !== 'userImage') {
      this.setState({
        data: { ...this.state.data, [event.target.name]: event.target.value }
      });
    } else {
      const value = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          data: { ...this.state.data, userImage: value, imagePreview: reader.result }
        });
      };
      reader.readAsDataURL(value);
    }
  }

  /**
   * toggleEditStatus
   * @desc toggles editting to true or false
   * @return {func} new state object
   */
  toggleEditStatus() {
    const { id, ...rest } = this.props.User;
    if (this.state.isEditing) {
      return this.setState({
        isEditing: !this.state.isEditing
      });
    }
    return this.setState({
      isEditing: !this.state.isEditing,
      imagePreview: rest.userImage,
      data: {
        ...this.state.data, ...rest
      }
    });
  }

  /**
   * submit
   * @desc handles editting user details
   * @param {Object} event DOM event
   * @return {func} editUserDetails
   */
  onSubmit(event) {
    event.preventDefault();
    const userCredentials = this.state.data;
    const { userImage, isConfirmed, ...requiredDetails } = userCredentials;
    const errors = validate(requiredDetails);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      const userObject = new FormData();

      Object.entries(userCredentials).forEach(([key, value]) => {
        userObject.append(key, value);
      });

      this.props.editUser(userObject);
      this.setState({ isEditing: false });
    }
  }

  /**
   * render
   * @desc renders the Dashboard component
   * @return {Object} the Dashboard component
   */
  render() {
    const { User, match } = this.props;
    const { userImage, isConfirmed } = User;
    const displayImage = userImage || '/images/default_user_profile_pic.jpg';
    const {
      errors, data, isEditing
    } = this.state;
    return (
      <main className="pb-main">
        <div className="container">
          <ul className="nav nav-tabs justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to={match.url}><h3>Profile</h3></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`${match.url}/businesses`}><h3>My Businesses</h3></Link>
            </li>
          </ul>

          {!isConfirmed && <VerifyEmailMessage name={User.firstname} />}

          <Route
            path={`${match.url}/businesses`}
            render={() => (
              <UserBusinesses
                businesses={this.props.businesses}
                deleteBusiness={this.deleteBusiness}
              />
            )}
          />

          <Route
            exact
            path={match.url}
            render={() => (
              <UserDetails
                toggleEditStatus={this.toggleEditStatus}
                displayImage={displayImage}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                isEditing={isEditing}
                errors={errors}
                data={data}
                User={User}
              />
            )}
          />
        </div>
      </main>

    );
  }
}

Dashboard.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
const mapStateToProps = state => ({
  businesses: state.businessReducer.businesses,
  User: state.userReducer
});

export default connect(mapStateToProps, {
  userBusinesses,
  deleteBusiness,
  editUser
})(Dashboard);
