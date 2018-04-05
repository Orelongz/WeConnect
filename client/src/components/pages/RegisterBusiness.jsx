import React from 'react';
import { Link } from 'react-router-dom';

const RegisterBusiness = () => (
  <main className="pb-main">
    <div className="container">
      <div className="row justify-content-center">
        <div className="card py-3 col-xs-12 col-sm-10">
          <div className="container">
            <h2 className="text-center">Register your new business</h2>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="companyName">Company Name</label>
                  <input type="text" className="form-control" id="companyName" placeholder="Company Name" />
                </div>
                <div className="col-md-6">
                  <label>Upload a profile picture</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="company-picture" />
                    <label className="custom-file-label" for="company-picture">Choose file</label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="company-address">Address</label>
                  <input type="text" className="form-control" id="company-address" placeholder="Street" />
                </div>
                <div className="form-group col-md-3">
                  <label for="company-city">City</label>
                  <input type="text" className="form-control" id="company-city" placeholder="City" />
                </div>
                <div className="form-group col-md-3">
                  <label for="company-state">State</label>
                  <select id="company-state" className="form-control">
                    <option value="0" selected>Choose...</option>
                    <option value="1">Lagos</option>
                    <option value="2">Abuja</option>
                    <option value="3">Calabar</option>
                    <option value="4">Enugu</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label for="company-phoneNo">Phone Number</label>
                  <input type="text" className="form-control" id="company-phoneNo" placeholder="Phone Number" />
                </div>
                <div className="form-group col-md-4">
                  <label for="company-postalAddress">Postal Address</label>
                  <input type="text" className="form-control" id="company-postalAddress" placeholder="Postal Address" />
                </div>
                <div className="form-group col-md-4">
                  <label for="company-workingHours">Working hours</label>
                  <input type="text" className="form-control" id="company-workingHours" placeholder="____  to  ____" />
                </div>
              </div>
              <div className="form-group">
                <label for="company-summary">About your business</label>
                <textarea type="text" className="form-control" id="company-summary" rows="5"></textarea>
              </div>
              <a href="#" type="submit" className="btn btn-primary pull-right">Register</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default RegisterBusiness;