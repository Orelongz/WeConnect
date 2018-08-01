// import required modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div className="card my-5 py-5">
      <div className="container">
        {
          businesses.length === 0 ? <h1 className="text-center">You have no businesses at the moment</h1> :
          businesses.map((eachBusiness) => {
            const {
              businessImage, businessName, category, phoneNumber, id: businessId, about
            } = eachBusiness;
            const businessLink = `/businesses/${businessId}`;
            const displayImage = businessImage || '/images/default_business_profile_pic.png';
            return (
              <div key={businessId} className="col-xs-12 col-md-6 col-lg-4 mt-4">
                <div className="card" >
                  <Link to={businessLink} className="overflow">
                    <img src={displayImage} alt={businessName} className="card-img-top catalog-profile-pic"/>
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title text-uppercase text-center font-weight-bold">
                      {businessName}
                    </h5>
                    <div className="card-text small d-flex justify-content-between">
                      <p className="mb-0"><strong>Phone No:</strong> {phoneNumber}</p>
                      <p className="mb-0"><strong>Category:</strong> {category}</p>
                    </div>
                    <div className="small text-capitalize my-2">
                      {about.substring(0, 250)}...
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <Link to={businessLink} className="btn btn-sm btn-success">View</Link>
                      <Link to={`/businesses/${businessId}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                      <button onClick={() => deleteBusiness(businessId)} className="btn btn-sm btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

UserBusinesses.propTypes = propTypes;

export default UserBusinesses;
