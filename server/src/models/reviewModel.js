/**
* @class Review
* @desc creates a new review
*/
export default class Review {
  /**
  * constructor()
  * @desc recieves parameters to initialize Review class
  * @param {Object} review the review given
  */
  constructor(review) {
    this.review = review;
    this.reviewId = Review.getCounter();
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = new Date().toLocaleString();
  }

  /**
  * getCounter()
  * @desc returns an integer for every new instance of review created
  * @param {*} empty
  * @return {this.counter} integer
  */
  static getCounter() {
    this.counter = (this.counter || 0) + 1;
    return this.counter;
  }
}
