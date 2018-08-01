import React from 'react';
import PropTypes from 'prop-types';

// define proptypes for SearchBar component
const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

/**
 * SearchBar
 * @desc search bar component
 * @return {*} void
 */
function SearchBar({
  data, handleSearch, onChange, reset
}) {
  return (

    <section className="header d-flex justify-content-center">
      <div className="col-sm-12 col-md-8 col-lg-6 align-self-center text-white">
        <div
          className="jumbotron"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        >
          <div className="text-center" style={{ color: '#1d2252' }}>
            <h1>Welcome to WeConnect</h1>
            <p>The wonderful platform that connects businesses with individuals</p>
          </div>
          <form
            onSubmit={handleSearch}
            className="d-flex justify-content-between"
            style={{ backgroundColor: '#1d2252', padding: '15px' }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              style={{ width: '50%' }}
              name='search'
              onChange={onChange}
              value={data.search}
            />
            <select
              className="btn btn-outline-tetiary bg-light dropdown"
              id="search"
              style={{ width: '25%' }}
              value={data.value}
              onChange={onChange}
              name='value'
            >
              <option value="name">By Name</option>
              <option value="location">By location</option>
              <option value="category">By category</option>
            </select>
            <button className="btn btn-primary" id="searchBusinesses" type="submit">Search</button>
            <span onClick={reset} className="btn btn-danger">Reset</span>
          </form>
        </div>
      </div>
    </section>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
