// import required modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetails from './UserDetails.jsx';
import UserBusinesses from './UserBusinesses.jsx';
import VerifyEmailMessage from '../../messages/VerifyEmailMessage.jsx';
import {
  userBusinesses,
  deleteBusiness
} from './../../../actions/businessAction';
import { editUser } from './../../../actions/AuthAction';
import { validate } from './../../../utils';
import { defaultUserProfilePic } from './../../../../public/images';

// define proptypes for Dashboard component
const propTypes = {
  userBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  businesses: PropTypes.array,
  isConfirmed: PropTypes.bool
};

/**
 * @class Dashboard
 * @desc renders the Dashboard of the app
 * @return {void}
 */
class Dashboard extends Component {
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
      tab: 'details',
      errors: {}
    };
    this.toggleEditStatus = this.toggleEditStatus.bind(this);
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.tabChange = this.tabChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * tabChange
   * @desc handles tabchanges in the component
   * @return {Object} react component
   */
  tabChange() {
    const { User } = this.props;
    const {
      tab, errors, data, isEditing
    } = this.state;
    if (tab === 'details') {
      return (
        <UserDetails
          toggleEditStatus={this.toggleEditStatus}
          isEditing={isEditing}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          errors={errors}
          data={data}
          User={User}
        />
      );
    } else if (tab === 'myBusinesses') {
      return (
        <div className="row">
          <UserBusinesses
            businesses={this.props.businesses}
            deleteBusiness={this.deleteBusiness}
          />
        </div>
      );
    }
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
   * setTab
   * @desc sets tab name in the component state
   * @param {String} str
   * @return {Object} new state object
   */
  setTab(str) {
    this.setState({ tab: str });
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
    this.setState({
      isEditing: true,
      data: { ...this.state.data, ...rest }
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
    const { userImage, ...requiredDetails } = this.state.data;
    const errors = validate(requiredDetails);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      const userObject = new FormData();
      const { imagePreview, ...rest } = this.state.data;

      Object.entries(rest).forEach(([key, value]) => {
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
    const { User } = this.props;
    const { userImage, isConfirmed } = User;
    const displayImage = userImage || defaultUserProfilePic;

    return (
      <Fragment>
        {!isConfirmed && <VerifyEmailMessage name={User.firstname} />}
        <section className="header d-flex justify-content-center">
          <div className="text-white text-center mt-4">
            <img
              src={displayImage}
              alt="profile pic"
              className="rounded-circle img-thumbnail"
              style={{ height: '150px', width: '150px' }}
            />
            <h1>{User.firstname} {User.lastname}</h1>
          </div>
        </section>
        <main style={{ paddingBottom: '42px' }}>
          <div className="row">
            <div className="col-3 sticky-top tab text-center">
              <div
                className="d-block tablink py-3"
                name="details"
                onClick={() => this.setTab('details')}
              >
                Details
              </div>
              <div className="d-block tablink py-3"
                name="myBusinesses"
                onClick={() => this.setTab('myBusinesses')}
              >
                Businesses
              </div>
            </div>
            <div className="col-9 pt-5">
              <div className="container">
                {this.tabChange()}
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

Dashboard.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} BusinessesPage props
 */
function mapStateToProps(state) {
  return {
    businesses: state.businessReducer.businesses,
    User: state.userReducer
  };
}

export default connect(mapStateToProps, {
  userBusinesses,
  deleteBusiness,
  editUser
})(Dashboard);
