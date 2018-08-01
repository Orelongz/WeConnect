module.exports = {
  'Display the homepage': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('h1')
      .pause(5000)
      .assert.containsText('h1', 'Welcome to WeConnect')
      .assert.visible('p')
      .assert.containsText('p', 'The wonderful platform that connects businesses with individuals')
      .assert.visible('h2.header-title')
      .assert.containsText('h2.header-title', 'About WeConnect')
      .assert.visible('article.header-title-text')
      .assert.containsText('article.header-title-text', 'At WeConnect, we are all about giving people easy access to businesses and services just in one click')
      .end();
  }
};
