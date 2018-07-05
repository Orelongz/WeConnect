// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import BusinessForm from './../../forms/BusinessForm.jsx';
import BusinessTransferForm from './../../forms/BusinessTransferForm.jsx';
import allCategories from './../../../actions/categoriesAction';
import {
  editBusiness,
  changeOwnership,
  getBusiness
} from './../../../actions/businessAction';
import { handleErrorCatch } from './../../../utils';

// define proptypes for EditBusinessPage component
const propTypes = {
  getBusiness: PropTypes.func.isRequired,
  editBusiness: PropTypes.func.isRequired,
  changeOwnership: PropTypes.func.isRequired,
  allCategories: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  businessDetails: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      businessId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

/**
 * @class EditBusinessPage
 * @desc renders the EditBusinessPage component
 * @return {*} void
 */
class EditBusinessPage extends Component {
  /**
   * constructor
   * @desc constructor for the EditBusinessPage component
   * @return {*} void
   */
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
    this.businessTransfer = this.businessTransfer.bind(this);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {func} allCategories
   */
  componentDidMount() {
    const { businessId } = this.props.match.params;
    this.props.getBusiness(businessId)
      .then(() => {
        // set documet title
        document.title = `Edit ${this.props.businessDetails.businessName}`;
      });
    this.props.allCategories();
  }

  /**
   * handleEdit
   * @desc handles submission of BusinessForm component
   * @param {Object} data details submitted through BusinessForm
   * @return {func} editBusiness
   */
  handleEdit(data) {
    const { businessId } = this.props.match.params;
    return this.props
      .editBusiness(data, businessId, this.props);
  }

  /**
   * businessTransfer
   * @desc handles business transfer to another user
   * @param {Object} data details submitted through BusinessTransferForm
   * @return {func} changeOwnership
   */
  businessTransfer(data) {
    const { businessId } = this.props.match.params;
    return this.props
      .changeOwnership(data, businessId, this.props);
  }

  /**
   * render
   * @desc renders the EditBusinessesPage component
   * @return {Object} the EditBusinessesPage component
   */
  render() {
    const { categories, businessDetails } = this.props;

    return (
      <main className="pb-main">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Edit Business Profile</h2>
                {
                  categories && businessDetails &&
                  <BusinessForm
                    submit={this.handleEdit}
                    businessDetails={this.props.businessDetails}
                    categories={this.props.categories}
                    FormAction="Save"
                  />
                }
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

/**
 * mapStateToProps
 * @desc map redux state to components props
 * @param {state} state redux state
 * @return {Object} props
 */
function mapStateToProps(state) {
  return {
    businessDetails: state.businessReducer.business,
    categories: state.categoryReducer
  };
}

export default connect(mapStateToProps, {
  editBusiness,
  changeOwnership,
  getBusiness,
  allCategories
})(EditBusinessPage);
