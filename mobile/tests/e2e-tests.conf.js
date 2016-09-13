exports.config = {  
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {                
      args: ['--disable-web-security']
    } 
  },
  framework: 'jasmine2',
  baseUrl: 'http://localhost:8100',
  specs: [
    'e2e-tests/**/*.tests.js'
  ],
  jasmineNodeOpts: {
    isVerbose: true,
  },
  onPrepare: function() {
    browser.driver.manage().window().maximize();
    browser.get('http://localhost:8100');
  }
};
