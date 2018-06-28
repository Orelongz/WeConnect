// import required modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { defaultBusinessProfilePic } from './../../../../public/images';

// define proptypes for UserBusinesses component
const propTypes = {
  deleteBusiness: PropTypes.func.isRequired,
  businesses: PropTypes.array.isRequired
};

/**
 * UserBusinesses
 * @desc renders the UserBusinesses of the app
 * @param {Object} props
 * @return {void}
 */
function UserBusinesses({ businesses, deleteBusiness }) {
  return (
    businesses.map((eachBusiness) => {
      const {
        businessImage, businessName, category, phoneNumber, id: businessId
      } = eachBusiness;
      const businessLink = `/businesses/${businessId}`;
      const displayImage = (businessImage === '' || businessImage === null) ? defaultBusinessProfilePic : businessImage;
      return (
        <div key={businessId} className="col-xs-12 col-sm-6 col-lg-4 mt-4">
          <div className="card" >
            <Link to={businessLink} className="overflow">
              <img src={displayImage} alt={businessName} className="card-img-top catalog-profile-pic"/>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{businessName}</h5>
              <div className="card-text small">
                <p className="mb-0">Category: {category}</p>
                <p className="mb-0">Tel: {phoneNumber}</p>
              </div>
              <div className="d-flex justify-content-between">
                <Link to={businessLink} className="btn btn-sm btn-success">View</Link>
                <Link to={`/businesses/${businessId}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                <button onClick={() => deleteBusiness(businessId)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
}

UserBusinesses.propTypes = propTypes;

export default UserBusinesses;
