/* eslint no-undef: "off" */
import allCategories from './../../src/actions/categoriesAction';
import * as types from './../../src/types/Types';
import * as categoriesData from '../mockData/categoriesData';

describe('category actions tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('retrieve categories action', () => {
    it('should retrieve a list of all available categories', (done) => {
      const { categoriesResponse, categories } = categoriesData;
      moxios.stubRequest('/api/v1/categories', {
        status: 200,
        response: categoriesResponse
      });

      const expectedActions = [{
        type: types.GET_ALL_CATEGORIES,
        credentials: categories
      }];
      const store = mockStore({});

      return store.dispatch(allCategories())
        .then(() => {
          // return of async actions
          expect(store.getActions()).to.deep.equal(expectedActions);
          done();
        });
    });
  });
});
