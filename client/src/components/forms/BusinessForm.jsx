import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from './../../apiCalls/Api';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';
import {
  stateArray,
  businessHours,
  populateOptions
} from './../../utils/businessUtils';

const propTypes = {
  submit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  FormAction: PropTypes.string.isRequired,
  businessDetails: PropTypes.object
};

class BusinessForm extends Component {
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
  }

  onChange(e) {
    let value;
    if (e.target.name !== 'businessImage') {
      value = e.target.value;
      this.setState({
        data: { ...this.state.data, [e.target.name]: value }
      });
    } else {
      value = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          data: { ...this.state.data, businessImage: value, imagePreview: reader.result }
        });
      }
      reader.readAsDataURL(value);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { postalAddress, businessImage, imagePreview, ...requiredFields } = this.state.data;
    const errors = validate(requiredFields);
    this.setState({ errors });
    
    if (Object.keys(errors).length === 0) {
      const { businessState: state, ...rest } = this.state.data;
      const businessObject = new FormData();

      Object.entries({ state, ...rest }).forEach(([key, value]) => {
        businessObject.append(key, value);
      });
      return this.props.submit(businessObject);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.businessDetails) {
      const { state: businessState, ...rest } = nextProps.businessDetails;
      this.setState({
        data: { ...this.state.data, businessState, ...rest, imagePreview: rest.businessImage }
      });
    }
  }

  displayPreview(businessDetails) {
    const { imagePreview } = this.state.data;
      return (imagePreview !== '') ? (
        <div className="border w-100" style={{height:'200px'}}>
          <img src={imagePreview}
            alt="business image"
            className="w-100 h-100"
          />
        </div>
      ) : null;
      
  }

  render() {
    const { errors, data } = this.state;
    const { categories, FormAction, businessDetails } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="row mt-5">
        <div className="col-sm-12 col-md-4">
          {this.displayPreview(businessDetails)}
          <input
            type="file"
            className="w-100"
            id="businessImage"
            name="businessImage"
            onChange={this.onChange}
            accept="image/*"
          />
        </div>

        <div className="col-sm-12 col-md-8">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="businessName">Business Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Business Name"
                id= "businessName"
                name= "businessName"
                value={data.businessName}
                onChange={this.onChange}
              />
              {errors.businessName && <InLineError text={errors.businessName} />}
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="category">Choose a category</label>
              <select
                name="category"
                className="form-control"
                value={data.category}
                id="category"
                onChange={this.onChange}
              >
                {populateOptions(categories)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="state">State</label>
              <select
                name="businessState"
                className="form-control"
                id="businessState"
                value={data.businessState}
                onChange={this.onChange}
              >
                {populateOptions(stateArray)}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                type="text"
                id="city"
                name="city"
                value={data.city}
                placeholder="City"
                onChange={this.onChange}
              />
              {errors.city && <InLineError text={errors.city} />}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                id="address"
                name="address"
                value={data.address}
                onChange={this.onChange}
              />
              {errors.address && <InLineError text={errors.address} />}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={data.phoneNumber}
                placeholder="Phone Number"
                onChange={this.onChange}
              />
              {errors.phoneNumber && <InLineError text={errors.phoneNumber} />}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="postalAddress">Postal Address</label>
              <input
                type="text"
                className="form-control"
                id="postalAddress"
                name="postalAddress"
                value={data.postalAddress}
                placeholder="Postal Address"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="businessHours">Business hours</label>
              <div className="form-row">
                <select
                  name="startTime"
                  className="form-control col-5"
                  value={data.startTime}
                  onChange={this.onChange}
                >
                  {businessHours("am")}
                </select>
                <span className="col-2 text-center">to</span>
                <select
                  name="closeTime"
                  className="form-control col-5"
                  value={data.closeTime}
                  onChange={this.onChange}
                >
                  {businessHours("pm")}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about">About your business</label>
            <textarea
              type="text"
              className="form-control"
              name="about"
              rows="5"
              value={data.about}
              onChange={this.onChange}
            />
            {errors.about && <InLineError text={errors.about} />}
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary pull-right">{FormAction}</button>
        </div>
      </form>
    );
  }
}

BusinessForm.propTypes = propTypes;

export default BusinessForm;