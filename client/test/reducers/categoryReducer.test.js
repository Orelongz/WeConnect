/* eslint no-undef: "off" */
import reducer from './../../src/reducers/categoryReducer';
import * as types from './../../src/types/Types';
import * as categoriesData from './../mockData/categoriesData';

const { categories } = categoriesData;

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, undefined)).to.deep.equal([]);
  });

  it('should handle GET_ALL_CATEGORIES', () => {
    expect(reducer([], {
      type: types.GET_ALL_CATEGORIES,
      credentials: categories
    })).to.deep.equal(categories);
  });
});
