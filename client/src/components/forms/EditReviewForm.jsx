import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';

const propTypes = {
  editReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired
}

class EditReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      reviewUpdate: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setState({
      reviewUpdate: this.props.review.review
    });
  }

  submit(e) {
    e.preventDefault();
    const { review } = this.props;
    const { reviewUpdate } = this.state;
    const error = validate({ reviewUpdate });
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      this.props.editReview({ review: reviewUpdate }, review.id);
    }
  }

  onChange(e) {
    return this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { error } = this.state;
    const { review } = this.props;
    return (
      <form className="media border-top pt-3 mt-3" onSubmit={this.submit}>
        <img
          src="https://i.stack.imgur.com/34AD2.jpg"
          className="img-thumbnail rounded-circle small-profile-pic mr-3"
        />
        <div className="media-body">
          <div className="d-flex justify-content-between pb-1">
            <h5>{review.User.firstname} {review.User.lastname}</h5>
            <div>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star-o"></span>
            </div>
            <button type="submit" className="btn btn-primary btn-sm pull-right">POST</button>
          </div>
          <textarea
            className="form-control"
            id="reviewUpdate"
            name="reviewUpdate"
            onChange={this.onChange}
            value={this.state.reviewUpdate}
          />
          {error.reviewUpdate && <InLineError text={error.reviewUpdate} />}
        </div>
      </form>
    );
  }
}

EditReviewForm.propTypes = propTypes;

export default EditReviewForm;