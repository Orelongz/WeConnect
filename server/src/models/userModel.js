/**
* @class User
* @desc creates a new user
*/
export default class User {
  /**
  * constructor(userDetails)
  * @desc recieves parameters to initialize User class
  * @param {Object} userDetails user details
  */
  constructor(userDetails) {
    this.firstname = userDetails.firstname;
    this.lastname = userDetails.lastname;
    this.email = userDetails.email;
    this.password = userDetails.hashedPassword;
    this.businesses = [];
    this.userId = User.getCounter();
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = new Date().toLocaleString();
  }

  /**
  * getCounter()
  * @desc returns an integer for every new instance of user created
  * @param {void} empty
  * @return {this.counter} integer
  */
  static getCounter() {
    this.counter = (this.counter || 0) + 1;
    return this.counter;
  }
}
