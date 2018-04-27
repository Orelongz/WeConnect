import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessProfile from './BusinessProfile';
import { getBusiness, deleteBusiness } from './../../actions/businessAction';
import {
  addReview,
  getBusinessReviews,
  // getReview,
  // editReview,
  deleteReview
} from './../../actions/reviewAction';
import ReviewsDiv from './ReviewsDiv';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  getBusinessReviews: PropTypes.func.isRequired,
  getReview: PropTypes.func,
  editReview: PropTypes.func,
  deleteReview: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      businessId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentUser: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
};

class BusinessProfilePage extends Component {
  constructor() {
    super();
    this.handleBusinessDelete = this.handleBusinessDelete.bind(this);
    this.postReview = this.postReview.bind(this);
    this.handleEditReview = this.handleEditReview.bind(this);
    this.handleDeleteReview = this.handleDeleteReview.bind(this);
  }

  componentDidMount() {
    const { businessId } = this.props.match.params;
    this.props
      .getBusiness(businessId)
      .catch(() => this.props.history.push('/businesses'));
    this.props.getBusinessReviews(businessId);
  }

  handleBusinessDelete() {
    const { businessId } = this.props.match.params;
    return this.props
      .deleteBusiness(businessId)
      .then(() => this.props.history.push('/businesses'))
  }

  postReview(data) {
    const { businessId } = this.props.match.params;
    const { firstname, lastname } = this.props;
    return this.props
      .addReview(data, businessId, firstname, lastname)
  }

  handleGetReview() {
    const { reviewId } = this.props.match.params;
    return this.props
      .getReview(reviewId)
  }

  handleEditReview(reviewId) {
    console.log('edited' + reviewId)
  }

  handleDeleteReview(reviewId) {
    return this.props
      .deleteReview(reviewId)
  }

  render() {
    const { currentUser, businessReviews, businessDetails } = this.props;
    const checkRender = () => {
      if (businessDetails) {
        return (
          <BusinessProfile
            businessDetails={businessDetails}
            currentUser={currentUser}
            handleBusinessDelete={this.handleBusinessDelete}
          />
        )
      }
      return null; 
    };
    
    return (
      <main className="pb-main">
        <div className="container">
          <div className="row">
            {checkRender()}
            <div className="col-md-12 col-lg-4"></div>
            <div className="col-md-12 col-lg-8">
              {
                businessReviews.length > 0 || !!currentUser ? (
                  <ReviewsDiv
                    postReview={this.postReview}
                    businessReviews={businessReviews}
                    currentUser={currentUser}
                    handleEditReview={this.handleEditReview}
                    handleDeleteReview={this.handleDeleteReview}
                  />
                ) : null
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    businessDetails: state.businessReducer.business,
    currentUser: state.userReducer.id,
    firstname: state.userReducer.firstname,
    lastname: state.userReducer.lastname,
    businessReviews: state.reviewReducer.reviews
  };
}

BusinessProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, {
  getBusiness,
  deleteBusiness,
  addReview,
  getBusinessReviews,
  // editReview,
  deleteReview
})(BusinessProfilePage);
