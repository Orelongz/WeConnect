/**
* @class Business
* @desc creates a new business
*/
export default class Business {
  /**
  * constructor(businessDetails)
  * @desc recieves parameters to initialize Business class
  * @param {Object} businessDetails business details
  */
  constructor(businessDetails) {
    this.businessName = businessDetails.businessName;
    this.businessImage = businessDetails.businessImage || '';
    this.category = businessDetails.category;
    this.address = businessDetails.address;
    this.city = businessDetails.city;
    this.state = businessDetails.state;
    this.phoneNumber = businessDetails.phoneNumber;
    this.postalAddress = businessDetails.postalAdress || '';
    this.workHours = businessDetails.workHours || '';
    this.about = businessDetails.about;
    this.businessId = Business.getCounter();
    this.createdAt = new Date().toLocaleString();
    this.updatedAt = new Date().toLocaleString();
  }

  /**
  * getCounter()
  * @desc returns an integer for every new instance of business created
  * @param {void} empty
  * @return {int} this.counter businessId
  */
  static getCounter() {
    this.counter = (this.counter || 0) + 1;
    return this.counter;
  }
}
