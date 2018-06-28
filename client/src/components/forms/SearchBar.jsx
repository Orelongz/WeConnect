import React, { Component } from 'react';
import PropTypes from 'prop-types';

// define proptypes for SearchBar component
const propTypes = {
  handleSearch: PropTypes.func.isRequired
};

/**
 * SearchBar
 * @desc search bar component
 * @return {*} void
 */
class SearchBar extends Component {
  /**
   * constructor
   * @desc constructor for the SearchBar component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      search: '',
      value: 'name'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {Object} new state object
   */
  onChange(event) {
    return this.setState({
      ...this.state, [event.target.name]: event.target.value
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the search bar form
   * @param {Object} event DOM event
   * @return {func} handleSearch
   */
  onSubmit(event) {
    event.preventDefault();
    const { value, search } = this.state;
    if (search.trim() !== '') {
      return this.props.handleSearch(`${value}=${search}`);
    }
  }

  /**
   * render
   * @desc renders the SearchBar component
   * @return {Object} the SearchBar component
   */
  render() {
    const { value } = this.state;

    return (
      <section className="header d-flex justify-content-center mb-4">
        <div className="col-xs-12 col-md-6 align-self-center text-white">
          <h1 className="text-center">Businesses Around Me</h1>
          <form className=" input-group" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              name='search'
              onChange={this.onChange}
            />
            <select
              className="input-group-append"
              value={value}
              onChange={this.onChange}
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
}

SearchBar.propTypes = propTypes;

export default SearchBar;
