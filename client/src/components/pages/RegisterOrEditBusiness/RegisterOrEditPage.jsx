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
import InfoMessage from '../../messages/InfoMessage.jsx';

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
  history: PropTypes.object.isRequired,
  serverError: PropTypes.string
};

/**
 * @class RegisterOrEditPage
 * @desc this components is used to register and edit a business
 * @return {*} void
 */
export class RegisterOrEditPage extends Component {
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
      errors: {},
      transferData: {
        email: '',
        error: {}
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayPreview = this.displayPreview.bind(this);
    this.businessTransfer = this.businessTransfer.bind(this);
    this.handleTransferChange = this.handleTransferChange.bind(this);
  }

  /**
   * businessTransfer
   * @desc handles business transfer to another user
   * @param {Object} event DOM event
   * @return {func} changeOwnership
   */
  businessTransfer(event) {
    event.preventDefault();
    const { businessId } = this.props.match.params;
    const { email } = this.state.transferData;
    const error = validate({ email });

    this.setState({
      transferData: { ...this.state.transferData, error }
    });

    if (Object.keys(error).length === 0) {
      return this.props
        .changeOwnership(email, businessId, this.props);
    }
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
        data: {
          ...this.state.data,
          [event.target.name]: event.target.value
        }
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
   * handleTransferChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {func} new state object
   */
  handleTransferChange(event) {
    this.setState({
      transferData: {
        ...this.state.transferData,
        [event.target.name]: event.target.value
      }
    });
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
    const { categories, serverError } = this.props;
    const { businessId } = this.props.match.params;
    const { errors, data, transferData } = this.state;
    const header = businessId ? `Edit ${data.businessName}` : 'Business Registration Form';
    const subHeader = businessId ? `Edit ${data.businessName}` : 'Register your business on weconnect';
    const ImageHeader = businessId ? 'Change business image' : 'Add business image(optional)';
    const FormAction = businessId ? 'Save' : 'Register';

    return (
      <main className="pb-main mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="card py-3 col-md-8">
              <div className="text-center">
                <h2>{header}</h2>
                <p>{subHeader} by filling the form below.</p>
              </div>
                {serverError && <InfoMessage text={serverError} type="danger" />}
                {
                  categories && <BusinessForm
                    displayPreview={this.displayPreview}
                    history={this.props.history}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    categories={categories}
                    FormAction={FormAction}
                    ImageHeader={ImageHeader}
                    errors={errors}
                    data={data}
                  />
                }
                {
                  businessId &&
                  <Fragment>
                    <hr />
                    <h4 className="text-center">Transfer Business</h4>
                    <BusinessTransferForm
                      onSubmit={this.businessTransfer}
                      onChange={this.handleTransferChange}
                      transferData={transferData}
                    />
                  </Fragment>
                }
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
const mapStateToProps = state => ({
  categories: state.categoryReducer,
  businessDetails: state.businessReducer.business,
  serverError: state.businessReducer.error
});

export default connect(mapStateToProps, {
  allCategories,
  newBusiness,
  editBusiness,
  changeOwnership,
  getBusiness,
})(RegisterOrEditPage);
