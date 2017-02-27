var assert = require('assert');
var URL, htmlFrom, htmlTo, htmlDepDate, htmlArDate, htmlPassengers;
describe('Crawl', function() {

	it('Cebu Pacific', function() {
		browser.newWindow('http://localhost:8008/options.html', '', 'width=50,height=50,resizable,scrollbars=yes,status=1'); //Creates a new window which opens an HTML file that I wrote. HTML contains user from and to choice.
		fullFrom = $('div#from2').getText(); //Gets values from "From" ID in html file I wrote
		fullTo = $('div#to2').getText(); //Gets values from "To" ID in html file I wrote
		htmlFrom = $('div#from3').getText(); //Gets values from "From" ID in html file I wrote
		htmlTo = $('div#to3').getText(); //Gets values from "To" ID in html file I wrote
		htmlTripType = $('div#typeofTrip').getText();
		htmlDepDate = $('div#dateD').getText();
		htmlArDate = $('div#dateA').getText();
		htmlPassengers = $('div#numPass').getText();
		browser.close();
	
		var userDate = htmlDepDate[0] + htmlDepDate[1];
		userDate = parseInt(userDate);
		var userMonth = htmlDepDate[4] + htmlDepDate[5];
		userMonth = parseInt(userMonth);
		var today = new Date();
		var mm = today.getMonth()+1; 
		mm = parseInt(mm);
		var numberOfClicks = userMonth - mm;

		browser.url('https://www.cebupacificair.com/');
		browser.click('//*[@id="optOneWay"]');
		browser.setValue('//*[@id="FromStation"]',fullFrom); 
		//browser.pause(10000);
		browser.keys('\uE015');browser.keys('\uE007');
		browser.setValue('//*[@id="ToStation"]',fullTo);
		//browser.pause(10000);
		browser.keys('\uE015');browser.keys('\uE007');
		browser.pause(1000);
		for(var i = 0;i < numberOfClicks;i++)
			browser.click('//td[contains(., "→")]');
		//browser.pause(9000);
		browser.click('//td[contains(., "' + userDate +'")]');
		
		browser.click('//*[@id="btnFind"]');
		var flights = $('#depart-table > tbody');
		flights = flights.getText();

		for (x = 0; x < flights.length; x++) {
			flights = flights.replace("\n", " ");
		}

		var indexCut;
		for (x = 1; x < flights.length; x++) {
			if (flights[x] == 'J' && flights[x+7] == 'J') 
			{
				indexCut=x;
				break;
			} 
		}
		

		var z = [];
		var counter = 1;
		for (x = 1; x < flights.length; x++) {
			if (flights[x] == '5' && flights[x + 1] == 'J') {
				z[x] = "\n" + counter + " ";
				counter++;
			} else {
				z[x] = flights[x];
			}
		}

		var str = z.join("");
		str = str.substr(0,indexCut);
		for (x = 0; x < str.length; x++) {
			str = str.replace("+1", "");
		}
		for (x = 0; x < str.length; x++) {
			str = str.replace(/\(.*?\)/, "")
		}
		for (x = 0; x < str.length; x++) {
			str = str.replace(",", "")
		}



		var y = str.split('');
		for (x = 0; x < y.length; x++) {
			if (y[x] == "A" || y[x] == "B" || y[x] == "C" || y[x] == "D" || y[x] == "E" || y[x] == "F" || y[x] == "G" ||
				y[x] == "H" || y[x] == "I" || y[x] == "J" || y[x] == "K" || y[x] == "L" || y[x] == "M" || y[x] == "N" ||
				y[x] == "O" || y[x] == "P" || y[x] == "Q" || y[x] == "R" || y[x] == "S" || y[x] == "T" || y[x] == "U" ||
				y[x] == "V" || y[x] == "W" || y[x] == "X" || y[x] == "Y" || y[x] == "Z" || y[x] == "a" || y[x] == "b" ||
				y[x] == "c" || y[x] == "d" || y[x] == "e" || y[x] == "f" || y[x] == "g" || y[x] == "h" || y[x] == "i" ||
				y[x] == "j" || y[x] == "k" || y[x] == "l" || y[x] == "m" || y[x] == "n" || y[x] == "o" || y[x] == "p" ||
				y[x] == "q" || y[x] == "r" || y[x] == "s" || y[x] == "t" || y[x] == "u" || y[x] == "v" || y[x] == "w" ||
				y[x] == "x" || y[x] == "y" || y[x] == "z" || y[x] == "!" || y[x] == "*")
				y[x] = "";
		}

		var finalList = y.join('');

		finalList = "0 " + finalList;
		finalList = "id flightID timeDepart timeArrive price1 price2 price3 \n" + finalList;
		fs = require('fs');
		fs.writeFile('D:/Roshan/public/flights/ceb.txt', finalList, function(err) {
				if (err) return console.log(err);
				console.log('Write successful!');
			});
		//console.log("\n" + flights);
});





 });