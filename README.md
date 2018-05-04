[![Build Status](https://travis-ci.org/Orelongz/WeConnect.svg?branch=develop)](https://travis-ci.org/Orelongz/WeConnect?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/Orelongz/WeConnect/badge.svg?branch=develop)](https://coveralls.io/github/Orelongz/WeConnect?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/dbf93139a748aaefefcb/maintainability)](https://codeclimate.com/github/Orelongz/WeConnect/maintainability)

# WeConnect
WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

## Contents
- [Features](#features)
- [Technology Used](#technology-used)
- [View live Template](#view-live-template)
- [View Hosted App](#view-hosted-app)
- [View Hosted Endpoints](#view-hosted-endpoints)
- [View API documentation](#view-api-documentation)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Features
* A user can register on the application
* A user can login to the application
* A user can register a business
* A user can update and delete businesses they registered
* A user can view a business
* A user can view all businesses
* A user can view businesses by their category or location
* A user can add reviews to a business
* A user can view all reviews for a business
* A user can transfer his/her business to another user

## Technology Used
* HTML
* CSS
* Bootstrap4
* Express
* NodeJS
* postgreSQL
* Sequelize
* React and Redux
* Heroku

## View live Template
View the templates [here](https://orelongz.github.io/WeConnect/)

## View Hosted App
View the hosted app on heroku [here](https://weconnect-orelongz.herokuapp.com/)

## View Hosted Endpoints
View hosted endpoints on Heroku [here](https://weconnect-orelongz.herokuapp.com/api/v1/)

## View API documentation
View swagger API documentation of endpoints on Heroku [here](https://weconnect-orelongz.herokuapp.com/api-docs/)

## Getting Started
You can get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/Orelongz/WeConnect.git

# Install dependencies
npm install

# Run tests
> Create the database needed
> npm run test-migrate
> npm run test

# Run the application
> Create the database needed
> npm run dev-migrate
> npm run start
```
The server and app would be live at `http://localhost:8000`,
Swagger API documentation at `http://localhost:8000/api-docs/`
Endpoints live at `http://localhost:8000/api/v1/`

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
    <td>PUT</td>
    <td>/api/v1/user</td>
    <td>Edits the details of an user</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/user</td>
    <td>Retrieves the details of an user</td>
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
    <td>GET</td>
    <td>/api/v1/businesses/user</td>
    <td>Get all user businesses</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/businesses/change-ownership/:businessId</td>
    <td>Transfers business ownership to another user</td>
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
    <td>/api/v1/categories</td>
    <td>Retrieves a list of available categories</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/v1/businesses/:businessId/reviews</td>
    <td>Add a review to a buisness</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/businesses/:businessId/reviews</td>
    <td>Retrieve all reviews for a business</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/v1/reviews/:reviewId</td>
    <td>Retrieve a review</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/v1/reviews/:reviewId</td>
    <td>Edit a review</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/v1/reviews/:reviewId</td>
    <td>Delete a review</td>
  </tr>
</table>
