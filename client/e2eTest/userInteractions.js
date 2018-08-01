const signUpUser = {
  firstname: 'Chima',
  lastname: 'Dauda',
  email: 'chima.dauda@gmail.com',
  password: 'chimauda',
  confirmPassword: 'chimauda'
};

const credentials = {
  businessName: 'a new business',
  businessImage: '',
  category: 'IT',
  address: 'some address',
  city: 'yaba',
  state: 'Lagos',
  phoneNumber: '00876578987',
  postalAddress: 'dkjhdh',
  startTime: '9am',
  closeTime: '5pm',
  about: 'd,hjdfjds\r\njhdkhjd\r\ndjdkh'
};

const baseUrl = 'http://localhost:8000';

module.exports = {
  'Unsuccessful signup because of empty required field': (browser) => {
    browser
      .url(`${baseUrl}`)
      .waitForElementVisible('body', 3000)
      .click('#signup')
      .assert.urlEquals(`${baseUrl}/signup`)
      .setValue('input[name=firstname]', signUpUser.firstname)
      .setValue('input[name=lastname]', signUpUser.lastname)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', '')
      .click('button.btn-primary')
      .assert.urlEquals(`${baseUrl}/signup`)
      .pause(2000);
  },
  'Successful signup': (browser) => {
    browser
      .url(`${baseUrl}`)
      .waitForElementVisible('body', 3000)
      .click('#signup')
      .assert.urlEquals(`${baseUrl}/signup`)
      .setValue('input[name=firstname]', signUpUser.firstname)
      .setValue('input[name=lastname]', signUpUser.lastname)
      .setValue('input[name=email]', signUpUser.email)
      .setValue('input[name=password]', signUpUser.password)
      .setValue('input[name=confirmPassword]', signUpUser.confirmPassword)
      .click('button.btn-primary')
      .pause(3000)
      .assert.urlEquals(`${baseUrl}/dashboard`)
      .pause(2000);
  },
  'User logout': (browser) => {
    browser
      .url(`${baseUrl}`)
      .waitForElementVisible('#logout', 3000)
      .click('#logout')
      .assert.urlEquals(`${baseUrl}/`)
      .pause(2000);
  },
  'Unsuccessful signup because of existing email': (browser) => {
    browser
      .url(`${baseUrl}`)
      .waitForElementVisible('body', 3000)
      .click('#signup')
      .assert.urlEquals(`${baseUrl}/signup`)
      .setValue('input[name=firstname]', signUpUser.firstname)
      .setValue('input[name=lastname]', signUpUser.lastname)
      .setValue('input[name=email]', signUpUser.email)
      .setValue('input[name=password]', signUpUser.password)
      .setValue('input[name=confirmPassword]', signUpUser.confirmPassword)
      .click('button.btn-primary')
      .waitForElementVisible('div.alert.alert-danger', 3000)
      .assert.containsText('div.alert.alert-danger', 'User exists')
      .assert.urlEquals(`${baseUrl}/signup`)
      .pause(2000);
  },
  'Unsuccessful login because of empty field': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('button.btn-primary')
      .assert.urlEquals(`${baseUrl}/signin`)
      .pause(2000);
  },
  'Unsuccessful login because of wrong details': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', 'longe@mail.com')
      .setValue('input[name=password]', 'secret')
      .click('button.btn-primary')
      .waitForElementVisible('div.alert.alert-danger', 3000)
      .assert.containsText('div.alert.alert-danger', 'Wrong email or password')
      .pause(2000);
  },
  'Successful login': (browser) => {
    browser
      .url(`${baseUrl}/signin`)
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', signUpUser.email)
      .setValue('input[name=password]', signUpUser.password)
      .click('button.btn-primary')
      .pause(3000)
      .assert.urlEquals(`${baseUrl}/businesses`)
      .pause(2000);
  },
  'view and edit user profile': (browser) => {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('div.form-group', 3000)
      .click('#editUserDetails')
      .clearValue('input[name=firstname]')
      .setValue('input[name=firstname]', 'Chibuzor')
      .clearValue('input[name=lastname]')
      .setValue('input[name=lastname]', 'Maduka')
      .click('#saveUserDetails')
      .pause(3000)
      .assert.containsText('#userName', 'Chibuzor Maduka')
      .pause(2000);
  },
  'Businesses page: when there are no businesses': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .pause(3000)
      .assert.visible('h1.text-center.mt-5')
      .assert.containsText('h1.text-center.mt-5', 'No Businesses Yet')
      .pause(2000);
  },
  'User Businesses page: when there are no businesses': (browser) => {
    browser
      .url(`${baseUrl}/dashboard/businesses`)
      .pause(3000)
      .assert.visible('h1.text-center')
      .assert.containsText('h1.text-center', 'You have no businesses at the moment')
      .pause(2000);
  },
  'Unsuccessful bsiness registration because of empty required fields': (browser) => {
    browser
      .url(`${baseUrl}/businesses/new`)
      .waitForElementVisible('main.pb-main', 3000)
      .setValue('input[name=businessName]', '')
      .setValue('select[name=category]', credentials.category)
      .setValue('input[name=address]', '')
      .setValue('input[name=city]', credentials.city)
      .setValue('select[name=businessState]', credentials.state)
      .setValue('input[name=phoneNumber]', credentials.phoneNumber)
      .setValue('input[name=postalAddress]', credentials.postalAddress)
      .setValue('select[name=startTime]', credentials.startTime)
      .setValue('select[name=closeTime]', credentials.closeTime)
      .click('button.btn-primary')
      .assert.urlEquals(`${baseUrl}/businesses/new`)
      .pause(2000);
  },
  'Successful business registration': (browser) => {
    browser
      .url(`${baseUrl}/businesses/new`)
      .waitForElementVisible('main.pb-main', 3000)
      .setValue('input[name=businessName]', credentials.businessName)
      .setValue('select[name=category]', credentials.category)
      .setValue('input[name=address]', credentials.address)
      .setValue('input[name=city]', credentials.city)
      .setValue('select[name=businessState]', credentials.state)
      .setValue('input[name=phoneNumber]', credentials.phoneNumber)
      .setValue('input[name=postalAddress]', credentials.postalAddress)
      .setValue('select[name=startTime]', credentials.startTime)
      .setValue('select[name=closeTime]', credentials.closeTime)
      .setValue('textarea[name=about]', credentials.closeTime)
      .click('button.btn-primary')
      .waitForElementVisible('img.business-pic', 3000)
      .pause(2000);
  },
  'business search by name': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('div.jumbotron', 3000)
      .setValue('input[name=search]', credentials.businessName)
      .click('#searchBusinesses')
      .pause(3000)
      .assert.containsText('h5.card-title', credentials.businessName.toUpperCase())
      .click('span.btn.btn-danger')
      .pause(2000);
  },
  'view business profile': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .assert.containsText('div.card-header', credentials.businessName.toUpperCase())
      .click('a.pull-right')
      .pause(2000);
  },
  'edit business profile': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .assert.containsText('div.card-header', credentials.businessName.toUpperCase())
      .click('#editBusiness')
      .pause(2000)
      .clearValue('input[name=address]')
      .setValue('input[name=address]', 'Ahmadu Bello way')
      .click('button.btn-primary')
      .waitForElementVisible('img.business-pic', 3000)
      .pause(2000);
  },
  'add a business review': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .setValue('textarea[name=review]', 'Bad experience')
      .click('div.star-container:nth-of-type(2)')
      .click('#postReview')
      .pause(2000);
  },
  'edit a business review': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .click('#editReview')
      .setValue('textarea[name=review]', 'Same old experience')
      .click('#saveReview')
      .pause(2000);
  },
  'delete a business review': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .click('#deleteReview')
      .pause(2000);
  },
  'delete a business': (browser) => {
    browser
      .url(`${baseUrl}/businesses`)
      .waitForElementVisible('a.overflow', 3000)
      .click('a.overflow')
      .waitForElementVisible('img.business-pic', 3000)
      .assert.containsText('div.card-header', credentials.businessName.toUpperCase())
      .click('button.btn.btn-danger')
      .pause(2000)
      .assert.urlEquals(`${baseUrl}/businesses`)
      .end();
  },
};
