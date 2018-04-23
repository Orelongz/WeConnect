import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditBusinessForm from './../forms/EditBusinessForm';
import BusinessTransferForm from './../forms/BusinessTransferForm';
import {
  editBusiness,
  changeOwnership,
  getBusiness
} from './../../actions/businessAction';

const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  editBusiness: PropTypes.func.isRequired,
  changeOwnership: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

class EditBusinessPage extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBusinessTransfer = this.handleBusinessTransfer.bind(this);
  }

  handleEdit(data) {
    return this.props
      .editBusiness(data)
      .then(() => {
        const { businessId } = this.props.match.params;
        this.props.history.push(`/businesses/${businessId}`);
      })
  }

  handleBusinessTransfer(email, businessId) {
    return this.props
      .changeOwnership(email, businessId)
      .then(() => this.props.history.push('/businesses'))
  }

  render() {
    return (
      <main className="pb-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Edit Business Profile</h2>
                <EditBusinessForm submit={this.handleEdit} />
                <hr />
                <h4 className="text-center">Transfer Business</h4>
                <BusinessTransferForm submit={this.handleBusinessTransfer} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

EditBusinessPage.propTypes = propTypes;

export default connect(null, {
  editBusiness,
  changeOwnership,
  getBusiness
})(EditBusinessPage);