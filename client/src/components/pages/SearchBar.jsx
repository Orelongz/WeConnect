import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * SearchBar
 * @desc search bar component
 * @return {*} void
 */
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      value: 'name'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (e.target.name === 'search') {
      return this.setState({
        ...this.state, [e.target.name]: e.target.value
      });
    }
    return this.setState({
      ...this.state, value: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const { value, search } = this.state;
    alert(`search result for ${value}: ${search}`);
  }

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
    )
  }
}
export default SearchBar;