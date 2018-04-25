import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BusinessForm from './../forms/BusinessForm';
import BusinessTransferForm from './../forms/BusinessTransferForm';
import allCategories from './../../actions/categoriesAction';
import {
  editBusiness,
  changeOwnership,
  getBusiness
} from './../../actions/businessAction';
import { handleErrorCatch } from './../../utils';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  editBusiness: PropTypes.func.isRequired,
  changeOwnership: PropTypes.func.isRequired,
  allCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  businessDetails: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired
}

class EditBusinessPage extends Component {
  constructor() {
    super();
    this.state = { error: null };
    this.handleEdit = this.handleEdit.bind(this);
    this.businessTransfer = this.businessTransfer.bind(this);
  }

  componentDidMount() {
    const { businessId } = this.props.match.params;
    this.props.getBusiness(businessId);
    this.props.allCategories();
  }

  handleEdit(data) {
    const { businessId } = this.props.match.params;
    return this.props
      .editBusiness(data, businessId)
      .then(() => {
        const { businessId } = this.props.match.params;
        this.props.history.push(`/businesses/${businessId}`);
      })
      .catch(err => this.setState({
        error: handleErrorCatch(err.response.data)
      }));
  }

  businessTransfer(email, businessId) {
    return this.props
      .changeOwnership(email, businessId)
      .then(() => this.props.history.push('/businesses'))
      .catch(err => this.setState({
        error: handleErrorCatch(err.response.data)
      }));
  }

  render() {
    const { error } = this.state;
    const checkRender = () => {
      if (this.props.categories && this.props.businessDetails) {
        return (
          <BusinessForm
            submit={this.handleEdit}
            businessDetails={this.props.businessDetails}
            categories={this.props.categories}
            FormAction="Save"
          />
        );
      }
      return null;
    }
    return (
      <main className="pb-main">
        {error && <InfoMessage text={error} type='danger' />}
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Edit Business Profile</h2>
                {checkRender()}
                <hr />
                <h4 className="text-center">Transfer Business</h4>
                <BusinessTransferForm submit={this.businessTransfer} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

EditBusinessPage.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    businessDetails: state.businessReducer.business,
    categories: state.categoryReducer
  }
}

export default connect(
  mapStateToProps, {
  editBusiness,
  changeOwnership,
  getBusiness,
  allCategories
})(EditBusinessPage);