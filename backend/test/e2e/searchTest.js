describe("Testing the search function",function(){
	it("Sample data test1",function(){
		browser.get("http://localhost:8080/");
		element(by.model("search")).sendKeys("MR. MARSUK");
		//Note - The test have been done based on dummy data To run for the real data it has to be modified.
		expect(element.all(by.css('.body-col')).count()).toEqual(4);
		element.all(by.css('.body-col')).count().then(function(count){
			console.log("Search - data1 test success.\nSearch count: ",count);
		})
		// var count = element.all(by.css('.body-col'));
		// count.then(function(result){
		// 	expect(result.length).toEqual(4);
		// });
		
	});
	it("Sample data test2",function(){
		browser.get("http://localhost:8080/");
		element(by.model("search")).sendKeys("MR.RANJAN");
		//Note - The test have been done based on dummy data To run for the real data it has to be modified.
		expect(element.all(by.css('.body-col')).count()).toEqual(1);
		element.all(by.css('.body-col')).count().then(function(count){
			console.log("Search - data2 test success.\nSearch count: ",count);
		})		
	});

})