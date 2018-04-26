import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';

const propTypes = {
  submit: PropTypes.func.isRequired
}

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      review: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { review } = this.state;
    const error = validate({ review });
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      this.props.submit({ review });
      this.setState({ review: '' })
    }
  }

  onChange(e) {
    return this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="media-body" onSubmit={this.submit}>
        <div>
          <label htmlFor="review">Write a review: </label>
          <textarea
            className="form-control"
            id="review"
            name="review"
            onChange={this.onChange}
            value={this.state.review}
          />
          {error.review && <InLineError text={error.review} />}
        </div>

        <div className="pt-3">
          <div className="d-inline">
            <span className="fa fa-star-o"></span>
            <span className="fa fa-star-o"></span>
            <span className="fa fa-star-o"></span>
            <span className="fa fa-star-o"></span>
            <span className="fa fa-star-o"></span>
          </div>
          <button type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = propTypes;

export default ReviewForm;
