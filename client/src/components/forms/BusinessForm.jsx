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
        about: ''
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const value = (e.target.name !== 'businessImage') ? e.target.value : e.target.files[0];
    this.setState({
      data: { ...this.state.data, [e.target.name]: value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { postalAddress, businessImage, ...requiredFields } = this.state.data;
    const errors = validate(requiredFields);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const { businessState: state, ...rest } = this.state.data;
      return this.props.submit({ state, ...rest })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.businessDetails) {
      const { state: businessState, ...rest } = nextProps.businessDetails;
      this.setState({
        data: { ...this.state.data, businessState, ...rest }
      });
    }
}

  render() {
    const { errors, data } = this.state;
    const { categories, FormAction } = this.props;

    return (
      <form onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className="form-row">
          <div className="form-group col-md-5">
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
          <div className="col-md-4">
            <label>Upload a profile picture</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="businessImage"
                name="businessImage"
                value={data.businessImage}
                onChange={this.onChange}
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="businessImage">Choose file</label>
            </div>
          </div>
          <div className="form-group col-md-3">
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
          <div className="form-group col-md-3">
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
          <div className="form-group col-md-3">
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
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
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
          <div className="form-group col-md-4">
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
        <div className="clearfix"><button type="submit" className="btn btn-primary pull-right">{FormAction}</button></div>
      </form>
    );
  }
}

BusinessForm.propTypes = propTypes;

export default BusinessForm;