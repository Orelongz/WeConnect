import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from './../../apiCalls/Api';
import { validate } from './../../helpers';
import InLineError from './../messages/InLineError';
import {
  businessHours,
  populateOptions
} from './../../helpers/businessFormHelper';

const propTypes = {
  submit: PropTypes.func.isRequired
};

class RegisterBusinessForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        businessName: '',
        businessImage: null,
        category: 'IT',
        address: '',
        city: '',
        state: 'Lagos',
        phoneNumber: '',
        postalAddress: '',
        startTime: '9am',
        closeTime: '5pm',
        about: ''
      },
      stateArray: [],
      categoriesArray: [],
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
      return this.props.submit(this.state.data)
    }
  }

  componentDidMount() {
    api.business
      .fillStates()
      .then((nigerianStates) => {
        this.setState({
          stateArray: [...this.state.stateArray, ...nigerianStates]
        });
      });
    
    api.business
      .categories()
      .then((categories) => {
        this.setState({
          categoriesArray: [...this.state.categoriesArray, ...categories]
        });
      });
  }

  render() {
    const { state, about, category, startTime, closeTime } = this.state.data;
    const { stateArray, categoriesArray, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit} encType="multipart/form-data">
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Business Name"
              name= "businessName"
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
                name="businessImage"
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
              value={category}
              onChange={this.onChange}
            >
              {populateOptions(categoriesArray)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="state">State</label>
            <select
              name="state"
              className="form-control"
              value={state}
              onChange={this.onChange}
              ref={choiceState => this.choiceState = choiceState}
            >
              {populateOptions(stateArray)}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="city">City</label>
            <input
              className="form-control"
              type="text"
              name="city"
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
              name='address'
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
              name="phoneNumber"
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
              name="postalAddress"
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
                value={startTime}
                onChange={this.onChange}
              >
                {businessHours("am")}
              </select>
              <span className="col-2 text-center">to</span>
              <select
                name="closeTime"
                className="form-control col-5"
                value={closeTime}
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
            value={about}
            onChange={this.onChange}
          />
          {errors.about && <InLineError text={errors.about} />}
        </div>
        <button type="submit" className="btn btn-primary pull-right">Register</button>
      </form>
    );
  }
}

RegisterBusinessForm.propTypes = propTypes;

export default RegisterBusinessForm;