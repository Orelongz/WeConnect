import db from './../models';

const { Category } = db;

/**
 * @class CategoryController
 * @desc queries the category table
 */
export default class CategoryController {
  /**
   * getAllCategories()
   * @desc retrieve list of all categories
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, category
   */
  static getAllCategories(req, res) {
    return Category
      .all({ attributes: ['category'] })
      .then((categories) => {
        const result = categories.map(eachCategory => eachCategory.category);
        return res.status(200).json({
          status: 'success',
          data: result
        });
      });
  }
}
