import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { defaultBusinessProfilePic } from './../../../public/images';

const propTypes = {
  handleBusinessDelete: PropTypes.func.isRequired,
  businessDetails: PropTypes.object.isRequired,
  User: PropTypes.object
}

class BusinessProfile extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    return this.props.handleBusinessDelete();
  }

  displayRating(rating) {
    const stars = [];
    
    for(let i = 1; i <= 5; i += 1) {
      let starClass = 'fa fa-star-o';
      
      if (rating >= i) {
        starClass = 'fa fa-star checked';
      }

      stars.push(
        <span
          className={starClass}
          key={shortid.generate()}
          ></span>
      );
    }
    return stars;
  }

  render() {
    const { businessDetails, User } = this.props;
    const {
      businessName, businessImage, category, address, city, state: businessState,
      phoneNumber, postalAddress, startTime, closeTime, about, id: businessId,
      userId: ownerId, rating
    } = businessDetails;
    const displayImage = (businessImage === '' || businessImage === null) ? defaultBusinessProfilePic : businessImage;
    
    return (
      <Fragment>
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
              {
                (rating && rating !== 0) ?
                <li className="list-group-item">
                  Average Rating: {this.displayRating(rating)} {rating.toFixed(1)}stars
                </li> : null
              }
            </ul>
          </div>
  
          <div id="map"></div>
        </div>
        <div className="col-md-12 col-lg-8 mt-4">
          <div className="card">
            <img src={displayImage} alt={businessName} className="card-img-top business-pic" />
            <div className="card-body">
              <div>
                <h1>About {businessName}</h1>
                <article className="text-justify">
                  {about}
                </article>
              </div>
              {
                (ownerId === User.id) &&
                <div>
                  <Link to={`/businesses/${businessId}/edit`} className="btn btn-primary">Edit</Link>
                  <button onClick={this.handleDelete} className="btn btn-danger pull-right">Delete</button>
                </div>
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

BusinessProfile.propTypes = propTypes;

export default BusinessProfile;