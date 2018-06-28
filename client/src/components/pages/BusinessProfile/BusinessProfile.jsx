// import required modules
import React, { Fragment } from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defaultBusinessProfilePic } from './../../../../public/images';

// define proptypes for BusinessProfile component
const propTypes = {
  handleBusinessDelete: PropTypes.func.isRequired,
  businessDetails: PropTypes.object.isRequired,
  User: PropTypes.object
};

/**
 * BusinessProfile
 * @desc display average rating as stars
 * @param {Object} props
 * @return {Object} rendered businesses
 */
function BusinessProfile({ businessDetails, User, handleBusinessDelete }) {
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
              category &&
              <li className="list-group-item">Category: {category}</li>
            }
            {
              postalAddress &&
              <li className="list-group-item">Postal Address: {postalAddress}</li>
            }
            {
              (rating && rating !== 0) ?
              <li className="list-group-item">
                <StarRatings
                  rating={rating}
                  starDimension="20px"
                  starSpacing=""
                  starRatedColor="gold"
                /> {rating.toFixed(1)}stars
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
                <button onClick={handleBusinessDelete} className="btn btn-danger pull-right">Delete</button>
              </div>
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

BusinessProfile.propTypes = propTypes;

export default BusinessProfile;
