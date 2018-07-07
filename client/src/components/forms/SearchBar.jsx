import React from 'react';
import PropTypes from 'prop-types';

// define proptypes for SearchBar component
const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

/**
 * SearchBar
 * @desc search bar component
 * @return {*} void
 */
function SearchBar({ data, handleSearch, onChange }) {
  return (
    <section className="header d-flex justify-content-center mb-4">
      <div className="col-xs-12 col-md-6 align-self-center text-white">
        <h1 className="text-center">Businesses Around Me</h1>
        <form className=" input-group" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            name='search'
            onChange={onChange}
            value={data.search}
          />
          <select
            className="input-group-append"
            value={data.value}
            onChange={onChange}
            name='value'
          >
            <option value="name">By Name</option>
            <option value="location">By location</option>
            <option value="category">By category</option>
          </select>
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    </section>
  );
}

SearchBar.propTypes = propTypes;

export default SearchBar;
