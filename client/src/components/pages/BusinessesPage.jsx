import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Businesses = () => (
  <div>
    <SearchBar />
    <main className="pb-main">
      <div className="container">
        <div className="row">

          <div className="col-sm-12 col-md-3">
            <h4>Filter By:</h4>
            <div className="form-group">
              <label for="business-category">Category</label>
              <select className="form-control" id="business-category">
                <option value="0" selected>--Select--</option>
                <option value="1">RESTURANTS</option>
                <option value="2">CINEMAS</option>
                <option value="3">CAFE</option>
                <option value="4">BARS</option>
                <option value="5">RECREATIONAL</option>
              </select>
            </div>
            <div className="form-group">
              <label for="business-location">Location</label>
              <select className="form-control" id="business-location">
                <option value="0" selected>--Select--</option>
                <option value="1">LAGOS</option>
                <option value="2">ABUJA</option>
                <option value="3">JOS</option>
                <option value="4">ENUGU</option>
                <option value="5">RIVERS</option>
              </select>
            </div>
          </div>

          <div className="col-sm-12 col-md-9">
            <h1 className="text-center">All Businesses</h1>
            <div className="row">

              <div className="col-xs-12 col-sm-6 col-lg-4 mt-4">
                <div className="card" >
                  <Link to='/' className="overflow">
                    <img src="https://images.unsplash.com/photo-1516342139563-831b7018ad7c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=302934101a5a783c9792ce6e69be5976&auto=format&fit=crop&w=668&q=80" alt="coffee shop" className="card-img-top catalog-profile-pic" />
                  </Link>
                  <div className="card-body">
                    <h5 card-title>Coffee Shop</h5>
                    <div className="card-text">
                      <p className="mb-0">Category: bar</p>
                      <p className="mb-0">Tel: 0907879879</p>
                      <div className="d-inline-block mb-0">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-lg-4 mt-4">
                <div className="card" >
                  <Link to='/' className="overflow">
                    <img src="https://images.unsplash.com/photo-1516342139563-831b7018ad7c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=302934101a5a783c9792ce6e69be5976&auto=format&fit=crop&w=668&q=80" alt="coffee shop" className="card-img-top catalog-profile-pic" />
                  </Link>
                  <div className="card-body">
                    <h5 card-title>Coffee Shop</h5>
                    <div className="card-text">
                      <p className="mb-0">Category: bar</p>
                      <p className="mb-0">Tel: 0907879879</p>
                      <div className="d-inline-block mb-0">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-lg-4 mt-4">
                <div className="card" >
                  <Link to='/' className="overflow">
                    <img src="https://images.unsplash.com/photo-1516342139563-831b7018ad7c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=302934101a5a783c9792ce6e69be5976&auto=format&fit=crop&w=668&q=80" alt="coffee shop" className="card-img-top catalog-profile-pic" />
                  </Link>
                  <div className="card-body">
                    <h5 card-title>Coffee Shop</h5>
                    <div className="card-text">
                      <p className="mb-0">Category: bar</p>
                      <p className="mb-0">Tel: 0907879879</p>
                      <div className="d-inline-block mb-0">
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star-o"></span>
                        <span className="fa fa-star-o"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Businesses;