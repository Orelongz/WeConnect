import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  handleDelete: PropTypes.func.isRequired,
  businessDetails: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
}

class BusinessProfile extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    return this.props.handleDelete();
  }

  render() {
    const { businessDetails, currentUser } = this.props;
    const {
      businessName, businessImage, category, address, city, state: businessState,
      phoneNumber, postalAddress, startTime, closeTime, about, id: businessId, userId: ownerId
    } = businessDetails;
    return (
      <div className="row">
        <div className="col-md-12 col-lg-4 mt-4">
          <div className="card">
            <div className="card-header font-weight-bold bg-secondary text-white">
              {businessName}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                &nbsp;{address}, {city}, {businessState} state.
              </li>
              <li className="list-group-item">
                <i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>
                &nbsp;{startTime} to {closeTime}
              </li>
              <li className="list-group-item">
                <i className="fa fa-mobile fa-lg" aria-hidden="true"></i>
                &nbsp;{phoneNumber}
              </li>
            </ul>
          </div>
  
          <div id="map"></div>
        </div>
        <div className="col-md-12 col-lg-8 mt-4">
          <div className="card">
            <img src={businessImage} alt={businessName} className="card-img-top" />
            <div className="card-body">
              <div>
                <h1>About {businessName}</h1>
                <article className="text-justify">
                  {about}
                </article>
              </div>
              {
                (ownerId === currentUser) ? (
                  <div>
                    <Link to={`/businesses/${businessId}/edit`} className="btn btn-primary">Edit</Link>
                    <button onClick={this.handleDelete} className="btn btn-danger pull-right">Delete</button>
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BusinessProfile.propTypes = propTypes;

export default BusinessProfile;