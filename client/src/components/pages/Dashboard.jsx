import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserBusinesses from './UserBusinesses';
import UserDetails from './UserDetails';
import {
  userBusinesses,
  deleteBusiness
} from './../../actions/businessAction';
import { editUser } from './../../actions/AuthAction';
import {  defaultUserProfilePic } from './../../../public/images';

const propTypes = {
  userBusinesses: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'details'
    }
    this.deleteBusiness = this.deleteBusiness.bind(this);
    this.editUserDetails = this.editUserDetails.bind(this);
    this.tabChange = this.tabChange.bind(this);
  }

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

  deleteBusiness(businessId) {
    this.props.deleteBusiness(businessId);
  }

  editUserDetails(data) {
    this.props.editUser(data);
  }

  componentDidMount() {
    return this.props.userBusinesses();
  }

  setTab(str) {
    this.setState({
      tab: str
    });
  }

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
              style={{height: '150px', width: '150px'}}
            />
            <h1>{User.firstname} {User.lastname}</h1>
          </div>
        </section>
        <main style={{paddingBottom: '42px'}}>
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