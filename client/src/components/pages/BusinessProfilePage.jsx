import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BusinessProfile from './BusinessProfile';
import { getBusiness, deleteBusiness } from './../../actions/businessAction';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  deleteBusiness: PropTypes.func.isRequired,
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
          {checkRender()}
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
  deleteBusiness
})(BusinessProfilePage);
