// import required modules
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserBusinesses from './UserBusinesses.jsx';
import UserDetails from './UserDetails.jsx';
import {
  userBusinesses,
  deleteBusiness
} from './../../../actions/businessAction';
import { editUser } from './../../../actions/AuthAction';
import { defaultUserProfilePic } from './../../../../public/images';

// define proptypes for Dashboard component
const propTypes = {
  userBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  User: PropTypes.object.isRequired,
  businesses: PropTypes.array
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
      tab: 'details'
    };
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.editUserDetails = this.editUserDetails.bind(this);
    this.tabChange = this.tabChange.bind(this);
  }

  /**
   * tabChange
   * @desc handles tabchanges in the component
   * @return {Object} react component
   */
  tabChange() {
    const { User } = this.props;
    const { tab } = this.state;
    if (tab === 'details') {
      return (
        <UserDetails
          User={User}
          editUserDetails={this.editUserDetails}
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
   * editUserDetails
   * @desc handles editting a users detail
   * @param {Object} data
   * @return {func} deleteBusiness
   */
  editUserDetails(data) {
    this.props.editUser(data);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {func} users businesses
   */
  componentDidMount() {
    return this.props.userBusinesses();
  }

  /**
   * setTab
   * @desc sets tab name in the component state
   * @param {String} str
   * @return {Object} new state object
   */
  setTab(str) {
    this.setState({
      tab: str
    });
  }

  /**
   * render
   * @desc renders the Dashboard component
   * @return {Object} the Dashboard component
   */
  render() {
    const { User } = this.props;
    const displayImage = User.userImage !== '' ? User.userImage : defaultUserProfilePic;

    return (
      <Fragment>
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
              <div className="d-block tablink py-3" name="details" onClick={this.setTab.bind(this, 'details')}>Details</div>
              <div className="d-block tablink py-3" name="myBusinesses" onClick={this.setTab.bind(this, 'myBusinesses')}>Businesses</div>
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
