import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  businesses: PropTypes.array.isRequired
};

class UserBusinesses extends Component {
  deleteBusiness(businessId) {
    this.props.deleteBusiness(businessId);
  }

  render() {
    return (
      this.props.businesses.map((eachBusiness) => {
        const { businessImage, businessName, category, phoneNumber, id: businessId } = eachBusiness;
        const businessLink = `/businesses/${businessId}`;
        const showImage =  businessImage !== null ? businessImage : null;
        return (
          <div key={businessId} className="col-xs-12 col-sm-6 col-lg-4 mt-4">
            <div className="card" >
              <Link to={businessLink} className="overflow">
                <img src={businessImage} alt={businessName} />
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
                  <button onClick={this.deleteBusiness.bind(this, businessId)} className="btn btn-sm btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )
      })
    );
  }
}

UserBusinesses.propTypes = propTypes;

export default UserBusinesses;