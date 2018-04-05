import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => (
  <section className="header d-flex justify-content-center mb-4">
    <div className="col-xs-12 col-md-6 align-self-center text-white">
      <h1 className="text-center">Businesses Around Me</h1>
      <form className=" input-group">
        <input type="text" className="form-control" placeholder="Search..." />
        <select className="input-group-append" id="search">
          <option value="0" selected>By Name</option>
          <option value="1">By location</option>
          <option value="2">By category</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">Search</button>
        </div>
      </form>
    </div>     
  </section>
);

export default SearchBar;