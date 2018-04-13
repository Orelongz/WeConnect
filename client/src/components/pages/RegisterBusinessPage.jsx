import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from './../../helpers/validate';
import {
  businessHours,
  populateOptions
} from './../../helpers/businessFormHelper';
import api from './../../apiCalls/Api';

class RegisterBusiness extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        businessName: '',
        category: '',
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
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let { postalAddress, ...requiredFields } = this.state.data;
    const errors = validate(requiredFields);
    // const businessImage = this.fileInput.files[0];
    this.setState({ errors });
    if (Object.keys(errors) === 0) {
      console.log(this.state.data);
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
    const { stateArray, errors } = this.state;

    return (
      <main className="pb-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="card py-3 col-xs-12 col-sm-10">
              <div className="container">
                <h2 className="text-center">Register your new business</h2>
                <form onSubmit={this.onSubmit}>
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
                    </div>
                    <div className="col-md-4">
                      <label>Upload a profile picture</label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="businessImage"
                          ref={input => this.inputFile = input}
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
                  </div>
                  <button type="submit" className="btn btn-primary pull-right">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default RegisterBusiness;