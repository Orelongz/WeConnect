
/**
 * @class BusinessServices
 * @desc handles some operations in business controller
 */
export default class BusinessServices {
  /**
   * updateObject()
   * @desc handles update of business
   * @param {Object} req request object
   * @return {Object} theBusiness
   */
  static businessObject(req) {
    const {
      businessName, businessImage, category, address, city,
      state, phoneNumber, postalAddress, workHours, about
    } = req.body;

    const business = {
      businessName,
      businessImage,
      category,
      address,
      city,
      state,
      phoneNumber,
      postalAddress,
      workHours,
      about
    };
    return business;
  }

  /**
   * handleLocationSearch()
   * @desc checks businesses by location
   * @param {Object} req request object
   * @param {Array} businesses allBusinesses array
   * @return {Array} business
   */
  static handleLocationSearch(req, businesses) {
    const { location } = req.query;
    if (location) {
      return businesses.filter(business => (
        (business.city.toLowerCase() === location.toLowerCase()) ||
        (business.state.toLowerCase() === location.toLowerCase())
      ));
    }
  }

  /**
   * handleCategorySearch()
   * @desc checks businesses by category
   * @param {Object} req request object
   * @param {Array} businesses allBusinesses array
   * @return {Array} business
   */
  static handleCategorySearch(req, businesses) {
    const { category } = req.query;
    if (category) {
      return businesses.filter(business => (
        business.category.toLowerCase() === category.toLowerCase()
      ));
    }
  }
}
