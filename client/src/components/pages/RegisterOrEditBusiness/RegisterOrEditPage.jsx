// import required modules
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BusinessForm from './../../forms/BusinessForm.jsx';
import allCategories from './../../../actions/categoriesAction';
import { validate } from './../../../utils';
import {
  newBusiness,
  getBusiness,
  editBusiness,
  changeOwnership
} from './../../../actions/businessAction';
import BusinessTransferForm from './../../forms/BusinessTransferForm.jsx';

// define proptypes for RegisterOrEditPage component
const propTypes = {
  newBusiness: PropTypes.func.isRequired,
  getBusiness: PropTypes.func.isRequired,
  editBusiness: PropTypes.func.isRequired,
  changeOwnership: PropTypes.func.isRequired,
  allCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      businessId: PropTypes.string
    }).isRequired
  }).isRequired,
  businessDetails: PropTypes.object,
  history: PropTypes.object.isRequired
};

/**
 * @class RegisterOrEditPage
 * @desc this components is used to register and edit a business
 * @return {*} void
 */
class RegisterOrEditPage extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessesPage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        businessName: '',
        businessImage: '',
        category: 'IT',
        address: '',
        city: '',
        businessState: 'Lagos',
        phoneNumber: '',
        postalAddress: '',
        startTime: '9am',
        closeTime: '5pm',
        about: '',
        imagePreview: ''
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayPreview = this.displayPreview.bind(this);
    this.businessTransfer = this.businessTransfer.bind(this);
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
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {func} allCategories
   */
  componentDidMount() {
    // api call to categories table
    this.props.allCategories();

    if (this.props.match.path === '/businesses/new') {
      // set documet title
      document.title = 'Register business';
    } else {
      const { businessId } = this.props.match.params;
      this.props.getBusiness(businessId)
        .then(() => {
          const { state: businessState, ...rest } = this.props.businessDetails;
          this.setState({
            data: {
              ...this.state.data, businessState, ...rest, imagePreview: rest.businessImage
            }
          });
        });
    }
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {*} void
   */
  onChange(event) {
    if (event.target.name !== 'businessImage') {
      this.setState({
        data: { ...this.state.data, [event.target.name]: event.target.value }
      });
    } else {
      const value = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          data: { ...this.state.data, businessImage: value, imagePreview: reader.result }
        });
      };
      reader.readAsDataURL(value);
    }
  }

  /**
   * onSubmit
   * @desc handles submit of the business form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const {
      postalAddress, businessImage, imagePreview, ...requiredFields
    } = this.state.data;

    // validate the required fields
    const errors = validate(requiredFields);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      const { businessState: state, ...rest } = this.state.data;
      const businessObject = new FormData();

      Object.entries({ state, ...rest }).forEach(([key, value]) => {
        businessObject.append(key, value);
      });

      const { businessId } = this.props.match.params;

      if (businessId) {
        return this.props.editBusiness(businessObject, businessId, this.props);
      }
      return this.props.newBusiness(businessObject, this.props);
    }
  }

  /**
   * displayPreview
   * @desc preview business image
   * @return {Object} rendered preview
   */
  displayPreview() {
    const { imagePreview } = this.state.data;

    return (imagePreview) ? (
      <div className="border w-100" style={{ height: '200px' }}>
        <img src={imagePreview}
          alt="business image"
          className="w-100 h-100"
        />
      </div>
    ) : null;
  }

  /**
   * render
   * @desc renders the RegisterBusinessesPage component
   * @return {Object} the RegisterBusinessesPage component
   */
  render() {
    const { categories } = this.props;
    const { businessId } = this.props.match.params;
    const { errors, data } = this.state;
    const Header = businessId ? `Edit ${data.businessName}` : 'Register your new business';
    const FormAction = businessId ? 'Save' : 'Register';

    return (
      <main className="pb-main">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">{Header}</h2>
                {
                  categories && <BusinessForm
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    categories={categories}
                    FormAction={FormAction}
                    displayPreview={this.displayPreview}
                    errors={errors}
                    data={data}
                    history={this.props.history}
                  />
                }
                {
                  businessId &&
                  <Fragment>
                    <hr />
                    <h4 className="text-center">Transfer Business</h4>
                    <BusinessTransferForm submit={this.businessTransfer} />
                  </Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

RegisterOrEditPage.propTypes = propTypes;

/**
 * mapStateToProps
 * @desc map redux state to components props
 * @param {state} state redux state
 * @return {Object} props
 */
function mapStateToProps(state) {
  return {
    categories: state.categoryReducer,
    businessDetails: state.businessReducer.business,
  };
}

export default connect(mapStateToProps, {
  allCategories,
  newBusiness,
  editBusiness,
  changeOwnership,
  getBusiness,
})(RegisterOrEditPage);
