$(document).ready(function(){
	//localStorage.clear();

	var cityOption=[];
	var forecasticon;
	var forecastdesc;
	var temparray=[];
	var daysc=0;
	var cityName = [];
	var cityOptionc = 0;
	var storeCity=[];

	var d = new Date();
	var n = d.getDay()
	console.log(n);
	var days=[];
	var daysc=0;
	if(n==1)
	{
		days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
	}
	else if (n==2)
	{
		days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday'];
	}
	else if (n==3)
	{
		days = ['Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday','Tuesday'];
	}
	else if (n==4)
	{
		days = ['Thursday', 'Friday', 'Saturday','Sunday','Monday','Tuesday','Wednesday'];
	}
	else if (n==5)
	{
		days = ['Friday', 'Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
	}
	else if (n==6)
	{
		days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
	}
	else
	{
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	}


	/////// Loading City Name From JSON File ///////// 
	$.getJSON('city.json',function(result)
	{
		$.each(result,function(i,city)
		{
			cityOption+="<option value=>"
			+city.name+
			"</option>";
		});
		$('#mycity').html(cityOption);
	});
	////////////// Loading City Name Ends ///////////////

	///////////////////////////////////////////////////////////////////
	// It fetches Geo Location Latitude And Longitude ....!!!! ///////
	var pos={};

	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition
		(showPosition,showErr);
		
	}
	else
	{
		console.log("Geolocation is not working...!!!");

	}
	function showErr()
	{
		switch(error.code) {
			case error.PERMISSION_DENIED:
			error.innerHTML = "User denied the request for Geolocation."
			break;

		}

	}
	function showPosition(data)
	{

		var latitude = data.coords.latitude;
		var longitude = data.coords.longitude;
		console.log(data.coords.latitude+ "," +data.coords.longitude);
		
			/* Providing data to weather forecast in Second Page
			According to Latitude and Longitude... 
			*/
			$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latitude+"&lon="+longitude+"&appid=d92242a2a0f022fbdfc75b0c9499bbec&units=metric")

			.done(function(data){

				var city = data.city.name;
				//console.log(data);

				$('#header').text(city).css("color","white");
				$('<h4></h4>').text("Day").appendTo('#forecast').css("color","#225615").css("margin-left","10%").css("display","inline-block");
				$('<h4></h4>').text("Description").appendTo('#forecast').css("color","#225615").css("margin-left","4%").css("display","inline-block");
				$('<h4></h4>').text("Temperature").appendTo('#forecast').css("color","#225615").css("margin-left","2%").css("display","inline-block");
				$('<h4></h4>').text("Humidity").appendTo('#forecast').css("color","#225615").css("margin-left","2%").css("display","inline-block");
		 					
		 					$.each(data.list,function(index,list){

		 						var day = list.temp.day;
		 						var humidity =list.humidity;
		 						//console.log(list.temp.day);
		 						var date = new Date(list.dt*1000);
		 						//console.log(date);


		 						$.each(list.weather,function(index,weather){
		 							forecasticon = weather.icon;
		 							forecastdesc = weather.description;

		 						});

		 						$('<tr><td>'+days[daysc]+'</td><td>'+forecastdesc+'</td><td><img src='+"http://openweathermap.org/img/w/"+forecasticon+".png"+'></td><td>'+day+'</td><td style="padding-left:12%">'+humidity+'</td><td>')
		 						.appendTo("#wd");
		 						daysc++;

		 					}); 

		 					var arrayc = 0;

		 					$.each(data.list,function(index,list){
		 						arrayc++;
		 						/* Array to store forecast temperature for Chart*/
		 						temparray[arrayc] = list.temp.day; 

		 					});

		 					// Chart Starts...
		 					var ctx = document.getElementById("myChart").getContext('2d');
		 					var myChart = new Chart(ctx, {
		 						type: 'line',
		 						data: {
		 							labels: [days[0], days[1], days[2], days[3], days[4], days[5]],
		 							datasets: [{
		 								label: 'Temperature',
		 								data: [temparray[1], temparray[2], temparray[3], temparray[4], temparray[5], temparray[6]],

		 								backgroundColor: [
		 								'rgba(255, 99, 132, 0.2)',
		 								'rgba(54, 162, 235, 0.2)',
		 								'rgba(255, 206, 86, 0.2)',
		 								'rgba(75, 192, 192, 0.2)',
		 								'rgba(153, 102, 255, 0.2)',
		 								'rgba(255, 159, 64, 0.2)'
		 								],
		 								borderColor: [
		 								'rgba(255,99,132,1)',
		 								'rgba(54, 162, 235, 1)',
		 								'rgba(255, 206, 86, 1)',
		 								'rgba(75, 192, 192, 1)',
		 								'rgba(153, 102, 255, 1)',
		 								'rgba(255, 159, 64, 1)'
		 								],
		 								borderWidth: 1
		 							}]
		 						},
		 						options: {
		 							scales: {
		 								yAxes: [{
		 									ticks: {
		 										beginAtZero:true
		 									}
		 								}]
		 							}
		 						}
		 					}); // Chart Ends here.

				}); 


			////////////////////////////////////////////////////////////////////
			/* This part is for First Page..................
			Getting Data from API and Append To First Page.
			*/
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=d92242a2a0f022fbdfc75b0c9499bbec&units=metric")

			.done(function(data){

				var cityname  = data.name;
				var icon;
				var temp;

				$.each(data,function(index,main){

					temp = main.temp;

					$('<h2></h2>').text(temp).appendTo('#weatherinfo');

				});

				$('<li></li>').text(cityname).appendTo('#weatherinfo').addClass('li');

				$.each(data.weather,function(index,weather){

					var description = weather.description;
					icon = "http://openweathermap.org/img/w/"+weather.icon+".png";
					$('#weathericon').html('<img src='+"http://openweathermap.org/img/w/"+weather.icon+".png"+'>');
					$('<li></li>').text(description).appendTo('#weatherinfo').addClass('li');

				});	
			});
		}
		/* First Page End */
		////////////////////////////////////////////////////////////////////
	

	// Making Responsive Page Using Stylesheet Properties.	
	var click=0;

	$('.menu-bar').on('click',function(){
		if((click%2)==0) // Open Menu And Move Content... 
		{
			$("#cw").css("margin-left","170px");
			$('#weatherinfo').css("margin-left","170px");
			$('#weathericon').css("margin-left","170px");
			$("#fcontainer").css("margin-left","170px");
			$("#ccontainer").css("margin-left","170px");

			$("#container").css("margin-left","170px");
			$("#cityweathericon").css("margin-left","130px");
			$("#show").css("margin-left","130px");


			$('.menuicon').toggleClass('slider');
			$('.sidebar').css("visibility", 'visible');
		}
		else // Close Menu And Move Content At Default Position ...
		{
			$("#cw").css("margin-left","0px");
			$('#weatherinfo').css("margin-left","0px");
			$('#weathericon').css("margin-left","0px");
			$("#fcontainer").css("margin-left","100px");
			$("#ccontainer").css("margin-left","100px");

			$("#container").css("margin-left","100px");
			$("#cityweathericon").css("margin-left","50px");
			$("#show").css("margin-left","50px");


			$('.menuicon').toggleClass('slider');
			$('.sidebar').css("visibility", 'hidden');
		}
		click++;

	});
	/////////////// Responsive Contents End   ////////////////////

	///////////////////////////////////////////////////////////////
	/* This is for Fourth Page (Search City) */
	$('#submitWeather').click(function(){
		$('#show').empty();
		$('#cityweathericon').empty();
		cityOption = $('#city').val();
		storeCity.push(cityOption); // Inserting City Name In Array.
		
		/* Storing searched city name in local storage*/
		localStorage.setItem('localStore', JSON.stringify(storeCity));

		
		var city = $("#mycity option:selected").text();
		console.log(city); 

		if(city!="Select Your City") //When user selects City Name from List. 
		{
			$('#error').hide();
			$.ajax({
				url:'http://api.openweathermap.org/data/2.5/weather?q='+city+",CA&units=metric&appid=a8ad1fee4b12cd663105482d3b8d0386",
				type:"GET",
				dataType:"jsonp",
				success:function(data)
				{
					var cityname  = data.name;
					var icon;

					$.each(data,function(index,main){

						var temp = main.temp;
						$('<h2></h2>').text(temp).appendTo('#show');

					});

					$('<li></li>').text(cityname).appendTo('#show').addClass('li');

					$.each(data.weather,function(index,weather){

						var description = weather.description;
						icon = "http://openweathermap.org/img/w/"+weather.icon+".png";

						$('#cityweathericon').html('<img src='+"http://openweathermap.org/img/w/"+weather.icon+".png"+'>');

						$('<li></li>').text(description).appendTo('#show').addClass('li');

					});

				}
			});
		}

		else if(cityOption!='') // When User Search City Name From Textbox.
		{
			$('#error').hide();
			$.ajax({
				url:'http://api.openweathermap.org/data/2.5/weather?q='+cityOption+",CA&units=metric&appid=a8ad1fee4b12cd663105482d3b8d0386",
				type:"GET",
				dataType:"jsonp",
				success:function(data)
				{
					var cityname  = data.name;
					var icon;

					$.each(data,function(index,main){

						var temp = main.temp;
						$('<h2></h2>').text(temp).appendTo('#show');

					});

					$('<li></li>').text(cityname).appendTo('#show').addClass('li');

					$.each(data.weather,function(index,weather){

						var description = weather.description;
						icon = "http://openweathermap.org/img/w/"+weather.icon+".png";

						$('#cityweathericon').html('<img src='+"http://openweathermap.org/img/w/"+weather.icon+".png"+'>');

						$('<li></li>').text(description).appendTo('#show').addClass('li');

					});

				}
			});
		}
		else // If User clicks Search Button Without Selecting OR Inserting City Name.
		{
			$('#error').html('Field cannot be empty');
		}
	});	

	/*It fetches recently searched city entered by user 
	 and append into dropdown list....*/
	$('#mycity').click(function () { 

		$('select opotion').remove();
		storeCity=JSON.parse(localStorage.getItem('localStore'));

		$.each(storeCity, function(index,city) {   
			$('#mycity')
			.append($("<option></option>")
				.text(cityOption)); 
		});
	});


		////////////////////////////////////////////////////////////////////
		/* This is for submit forecast weather button in Second Page...*/
		$('#submitfWeather').click(function(){

			var d = new Date();
			var n = d.getDay() // Getting Day According To System
			console.log(n);
			var daysm=[];
			var dayscm=0;
			if(n==1)
			{
				daysm = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
			}
			else if (n==2)
			{
				daysm = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday'];
			}
			else if (n==3)
			{
				daysm = ['Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday','Monday','Tuesday'];
			}
			else if (n==4)
			{
				daysm = ['Thursday', 'Friday', 'Saturday','Sunday','Monday','Tuesday','Wednesday'];
			}
			else if (n==5)
			{
				daysm = ['Friday', 'Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
			}
			else if (n==6)
			{
				daysm = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
			}
			else
			{
				daysm = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			}

			$('#wd').empty(); // Clear the previous data when user search new City.
			
			fcity = $('#fcity').val(); // Getting value from user.

			 if(fcity!='') // If user enter city name
			 {
			 	$('#error2').hide();
			 	$.ajax({
			 		url:"http://api.openweathermap.org/data/2.5/forecast/daily?q="+fcity+"&units=metric&appid=a8ad1fee4b12cd663105482d3b8d0386",
			 		type:"GET",
			 		dataType:"jsonp",
			 		success:function(data)
			 		{

			 			var fcity = $('#fcity').val();;
			 			console.log(fcity);

			 			$('#header').text(fcity).css("color","white");

			 			$.each(data.list,function(index,list){

			 				var day = list.temp.day;
			 				var humidity =list.humidity;

			 				$.each(list.weather,function(index,weather){
			 					forecasticon = weather.icon;
			 					forecastdesc = weather.description;

			 				});
			 				$('<tr><td>'+daysm[dayscm]+'</td><td>'+forecastdesc+'</td><td><img src='+"http://openweathermap.org/img/w/"+forecasticon+".png"+'></td><td>'+day+'</td><td style="padding-left:12%">'+humidity+'</td><td>')
			 				.appendTo("#wd");
			 				dayscm++

			 			});
			 		}
			 	});
			 }
					else // if user click on submitbutton without entering city name.

					{
						$('#error2').html('Field cannot be empty');
						$('#forecast').hide();
					}				
				}); 
		/* End Of Second Page (Weather Forecast Page)....*/
		/////////////////////////////////////////////////////////////////

	}); 