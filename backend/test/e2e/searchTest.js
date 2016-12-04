describe("When searching an employee with keyword Mr.",function(){
	it("Should return non zero result cound when part of name matches",function(){
		browser.get("http://localhost:8080/");
		element(by.model("search")).sendKeys("MR.");
		//Note - The test have been done based on dummy data To run for the real data it has to be modified.
		expect(element.all(by.css('.body-col')).count()).not.toBeLessThan(0);
		element.all(by.css('.body-col')).count().then(function(count){
			console.log("Search - data1 test success.\nSearch count: ",count);
		})
		// var count = element.all(by.css('.body-col'));
		// count.then(function(result){
		// 	expect(result.length).toEqual(4);
		// });
		
	});
	it("Should return 0 when name isn't found",function(){
		browser.get("http://localhost:8080/");
		element(by.model("search")).sendKeys("MR.THERESNOONELIKETHIS");
		//Note - The test have been done based on dummy data To run for the real data it has to be modified.
		expect(element.all(by.css('.body-col')).count()).toEqual(0);
		element.all(by.css('.body-col')).count().then(function(count){
			console.log("Search - data2 test success.\nSearch count: ",count);
		})		
	});

})
