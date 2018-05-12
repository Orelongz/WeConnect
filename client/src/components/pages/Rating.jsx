import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const propTypes = {
  rating: PropTypes.number
}
class Rating extends Component {
  constructor() {
    super();
    this.state = {
      rating: null,
      tempRating: null
    };
  }

  rate(rating) {
    this.setState({ rating });
    this.props.setRating(rating);
  }

  starOver(rating) {
    this.setState({
      tempRating: rating
    });
  }

  starOut() {
    this.setState({
      tempRating: this.state.rating
    });
  }

  componentDidMount() {
    const { rating } = this.props;
    if (rating) {
      this.setState({ rating, tempRating: rating });
    }
  }

  renderStars() {
    const stars = [];
    const titles = ['bad', 'poor', 'fair', 'good', 'excellent'];
    
    for(let i = 1; i <= 5; i += 1) {
      let starClass = 'fa fa-star-o';
      
      if (this.state.tempRating >= i) {
        starClass = 'fa fa-star checked';
      }

      stars.push(
        <span
          className={starClass}
          title={titles[i-1]}
          onClick={this.rate.bind(this, i)}
          onMouseEnter={this.starOver.bind(this, i)}
          onMouseLeave={this.starOut.bind(this)}
          key={shortid.generate()}
          ></span>
      );
    }
    return stars;
  }

  render() {    
    return (
      <div className="d-inline-block" id="rating">
        {this.renderStars()}
      </div>
    );
  }
};

Rating.propTypes = propTypes;

export default Rating;
