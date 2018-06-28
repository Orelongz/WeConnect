// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

// define proptypes for Rating component
const propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func.isRequired
};

/**
 * @class Rating
 * @desc renders the Rating component
 * @return {*} void
 */
class Rating extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessProfilePage component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      rating: null,
      tempRating: null
    };
  }

  /**
   * rate
   * @desc react componentDidMount lifecycle
   * @param {String} rating
   * @return {*} void
   */
  rate(rating) {
    this.setState({ rating });
    this.props.setRating(rating);
  }

  /**
   * rate
   * @desc react componentDidMount lifecycle
   * @param {String} rating
   * @return {*} void
   */
  starOver(rating) {
    this.setState({
      tempRating: rating
    });
  }

  /**
   * rate
   * @desc react componentDidMount lifecycle
   * @param {String} rating
   * @return {*} void
   */
  starOut() {
    this.setState({
      tempRating: this.state.rating
    });
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  componentDidMount() {
    const { rating } = this.props;
    if (rating) {
      this.setState({ rating, tempRating: rating });
    }
  }

  /**
   * componentDidMount
   * @desc react componentDidMount lifecycle
   * @return {Object} new state object
   */
  renderStars() {
    const stars = [];
    const titles = ['bad', 'poor', 'fair', 'good', 'excellent'];

    for (let i = 1; i <= 5; i += 1) {
      let starClass = 'fa fa-star-o';

      if (this.state.tempRating >= i) {
        starClass = 'fa fa-star checked';
      }

      stars.push(<span
        className={starClass}
        title={titles[i - 1]}
        onClick={this.rate.bind(this, i)}
        onMouseEnter={this.starOver.bind(this, i)}
        onMouseLeave={this.starOut.bind(this)}
        key={shortid.generate()}
        ></span>);
    }
    return stars;
  }

  /**
   * render
   * @desc renders the Rating component
   * @return {Object} the Rating component
   */
  render() {
    return (
      <div className="d-inline-block" id="rating">
        {this.renderStars()}
      </div>
    );
  }
}

Rating.propTypes = propTypes;

export default Rating;
