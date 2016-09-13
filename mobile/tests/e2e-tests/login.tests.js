describe('Signing in', function(){
  it('should start on login view', function(){
      expect(browser.getTitle()).toEqual('Login');
  });
});
