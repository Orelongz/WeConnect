import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessProfile from './BusinessProfile';
import { getBusiness, deleteBusiness } from './../../actions/businessAction';
import { addReview } from './../../actions/reviewAction';
import ReviewsDiv from './ReviewsDiv';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      businessId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  currentUser: PropTypes.string
};

class BusinessProfilePage extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  componentDidMount() {
    const { businessId } = this.props.match.params;
    return this.props
      .getBusiness(businessId)
      .catch(() => this.props.history.push('/businesses'))
  }

  handleDelete() {
    const { businessId } = this.props.match.params;
    return this.props
      .deleteBusiness(businessId)
      .then(() => this.props.history.push('/businesses'))
  }

  postReview(data) {
    const { businessId } = this.props.match.params;
    return this.props
      .addReview(data, businessId)
  }

  render() {
    const checkRender = () => {
      if (this.props.businessDetails) {
        return (
          <BusinessProfile
          businessDetails={this.props.businessDetails}
          currentUser={this.props.currentUser}
          handleDelete={this.handleDelete}
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
              <ReviewsDiv
                postReview={this.postReview}
              />
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
    currentUser: state.userReducer.currentUser
  };
}

BusinessProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, {
  getBusiness,
  deleteBusiness,
  addReview
})(BusinessProfilePage);
