[![Build Status](https://travis-ci.org/Orelongz/WeConnect.svg?branch=chore/155519524/jwt)](https://travis-ci.org/Orelongz/WeConnect?branch=chore/155519524/jwt)
[![Coverage Status](https://coveralls.io/repos/github/Orelongz/WeConnect/badge.svg?branch=chore/155519524/jwt)](https://coveralls.io/github/Orelongz/WeConnect?branch=chore/155519524/jwt)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbf93139a748aaefefcb/maintainability)](https://codeclimate.com/github/Orelongz/WeConnect/maintainability?branch=chore/155835381/api-doc)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dbf93139a748aaefefcb/test_coverage)](https://codeclimate.com/github/Orelongz/WeConnect/test_coverage)

# WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

## Contents
- [View live Template](#view-live-template)
- [Features](#features)
- [Technology Used](#technology-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Hosted Endpoints on Heroku](#hosted-endpoints-on-heroku)
- [API documentation on Heroku](#api-documentation-on-heroku)

## View live Template
View the templates through this [link](https://orelongz.github.io/WeConnect/)

## Features
* Users can register on the application
* Users can login to the application
* Users can register a business
* Users can update and delete businesses they registered
* Users can view a business
* Users can view all businesses
* Users can view businesses by their category or location
* Users can add reviews to a business
* Users can view all reviews for a business

## Technology Used
* HTML
* CSS
* Bootstrap4
* Express
* NodeJS

## Getting Started
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/Orelongz/WeConnect.git

# Install dependencies
npm install

# Run tests
npm run test

# Run the application
npm run start
```
The server would be live at `http://localhost:8000`,
Swagger API documentation at `http://localhost:8000/api-docs/`

## API Endpoints
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
      <td>/api/v1/businesses?location=location</td>
      <td>Get businesses with a location</td>
  </tr>
  </tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category</td>
      <td>Get businesses with a category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?category=category&location=location</td>
      <td>Get businesses with a category and location</td>
  </tr>
</table>

## Hosted Endpoints on Heroku
View hosted endpoints on Heroku through this [link](https://weconnect-orelongz.herokuapp.com/)

## API documentation on Heroku
View swagger API documentation of endpoints on Heroku through this [link](https://weconnect-orelongz.herokuapp.com/api-docs/)
