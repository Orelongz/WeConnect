// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import BusinessForm from './../../forms/BusinessForm.jsx';
import { newBusiness } from './../../../actions/businessAction';
import allCategories from './../../../actions/categoriesAction';
import { handleErrorCatch } from './../../../utils';

// define proptypes for RegisterBusinessPage component
const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  newBusiness: PropTypes.func.isRequired,
  allCategories: PropTypes.func.isRequired,
  businessId: PropTypes.string,
  categories: PropTypes.array.isRequired
};

/**
 * @class RegisterBusinessPage
 * @desc renders the RegisterBusinessPage component
 * @return {*} void
 */
class RegisterBusinessPage extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessesPage component
   * @return {*} void
   */
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {func} allCategories
   */
  componentDidMount() {
    // api call to categories table
    this.props.allCategories();
  }

  /**
   * submit
   * @desc handles submission of BusinessForm component
   * @param {Object} data details submitted through BusinessForm
   * @return {func} newBusiness
   */
  submit(data) {
    return this.props
      .newBusiness(data)
      .then(() => {
        const { businessId } = this.props;
        // if registration is successful, redirect to business profile
        this.props.history.push(`/businesses/${businessId}`);
      })
      .catch((err) => {
        // alert the user the error that occurred
        alertify.error(handleErrorCatch(err.response.data));
      });
  }

  /**
   * render
   * @desc renders the RegisterBusinessesPage component
   * @return {Object} the RegisterBusinessesPage component
   */
  render() {
    const { categories } = this.props;

    return (
      <main className="pb-main">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Register your new business</h2>
                {
                  categories && <BusinessForm
                    submit={this.submit}
                    categories={categories}
                    FormAction="Register"
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

RegisterBusinessPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @desc map redux state to components props
 * @param {state} state redux state
 * @return {Object} props
 */
function mapStateToProps(state) {
  return {
    businessId: state.businessReducer.business.id,
    categories: state.categoryReducer
  };
}

export default connect(mapStateToProps, {
  newBusiness,
  allCategories
})(RegisterBusinessPage);
