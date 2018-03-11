# WeConnect
[![Build Status](https://travis-ci.org/Orelongz/WeConnect.svg?branch=chore/155835381/api-doc)](https://travis-ci.org/Orelongz/WeConnect?branch=chore/155835381/api-doc)
[![Coverage Status](https://coveralls.io/repos/github/Orelongz/WeConnect/badge.svg?branch=chore/155835381/api-doc)](https://coveralls.io/github/Orelongz/WeConnect?branch=chore/155835381/api-doc)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbf93139a748aaefefcb/maintainability)](https://codeclimate.com/github/Orelongz/WeConnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dbf93139a748aaefefcb/test_coverage)](https://codeclimate.com/github/Orelongz/WeConnect/test_coverage)

# About WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

# Live Template View
https://orelongz.github.io/WeConnect/

# Hosted Endpoint on Heroku
https://orelongz.herokuapp.com/

# API documentation on Heroku
https://orelongz.herokuapp.com/api-docs/

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Register a user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signin</td>
      <td>Login user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses</td>
      <td>Register a business</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Update a business profile</td>
  </tr>
  <tr>
      <td>DELETE</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Delete a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Get a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/</td>
      <td>Get all businesses</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Add a review to a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Get all reviews for a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?location=:location</td>
      <td>Get businesses with a location</td>
  </tr>
  </tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=:category</td>
      <td>Get businesses with a category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category&location=location</td>
      <td>Get businesses with a category and location</td>
  </tr>
</table>