// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
moment().format('L');

// Search function to get the current City Weather

function searchCityWeather(searchCityEl) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + 
    searchCityEl + 
    "&units=imperial&appid=f8d11b4cf79d3c3e9c639576025ce0ca"
    )
    .then(function(response) {
        return response.json();
      })
    .then(function(response) {
        console.log(response.data);


        var currentDate = moment().format('L');

        var cityNameEl = $('<h3>').text(response.name);
        var displayDate = cityNameEl.append(" " + currentDate);
        var temperatureEl = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windEl = $("<p>").text("Wind: " + response.wind.speed);
        var currentWeather = response.weather[0].main;

        //Get the icon that matches the current weather for the current city
        if (currentWeather === "Rain"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
            displayDate.append(weatherIconEl);
        } else if (currentWeather === "Clouds"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");

        } else if (currentWeather === "Clear"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } else if (currentWeather === "Drizzle"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } else if (currentWeather === "Snow"){
            var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            weatherIconEl.attr("style", "height: 35px; width: 35px;");
        } 

        var currentWeatherDiv = $('<div>');

        currentWeatherDiv.append(displayDate, weatherIconEl, temperatureEl, humidityEl, windEl);

        $('#currentweather').html(currentWeatherDiv);
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

if (currentWeather === "Rain"){
    var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
    weatherIconEl.attr("style", "height: 35px; width: 35px;");
} else if (currentWeather === "Clouds"){
    var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
    weatherIconEl.attr("style", "height: 35px; width: 35px;");
} else if (currentWeather === "Clear"){
    var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
    weatherIconEl.attr("style", "height: 35px; width: 35px;");
} else if (currentWeather === "Drizzle"){
    var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
    weatherIconEl.attr("style", "height: 35px; width: 35px;");
} else if (currentWeather === "Snow"){
    var weatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
    weatherIconEl.attr("style", "height: 35px; width: 35px;");
} 

var currentWeatherDiv = $('<div>');

currentWeatherDiv.append(displayDate, weatherIconEl, temperatureEl, humidityEl, windEl);

$('#currentweather').html(currentWeatherDiv);




// WHEN I view the UV index

fetch("https://api.openweathermap.org/data/2.5/onecall?&appid=f8d11b4cf79d3c3e9c639576025ce0ca&lat=" + lat + "&lon=" + lon)

.then(function(response) {
    return response.json();
  })

.then(function(response){
    
    var uvindexEl = $("<p id='uvindex'>").text("UV Index: " + response.current.uvi);
    currentWeatherDiv.append(uvindexEl);
    $('#currentweather').html(currentWeatherDiv);

// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe/

var uvindex = response.current.uvi;
    
    if (uvindex < 3){
        $("#uvindex").css("color", "green");
    }else if (uvindex >=3 && uvindex < 6){
        $("#uvindex").css("color", "yellow");
    }else if (uvindex >=6 && uvindex < 8){
    $("#uvindex").css("color", "orange");
    } else if (uvindex >=8){
        $("#uvindex").css("color", "red"); 
    } 
})  

});
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + 
        searchCityEl + 
        "&units=imperial&appid=f8d11b4cf79d3c3e9c639576025ce0ca"
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            
            var results = response.list;
            $("#fiveday").empty();
            
            for (var i = 0; i < results.length; i +=8){

            var fivedaycard = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

            var fiveDayDate = results[i].dt_txt;
            var setdate = fiveDayDate.substr(0,10);
            var fiveDayTemp = results[i].main.temp;
            var fiveDayHum = results[i].main.humidity;

            var fiveDayDateEl = $("<h4 class='cardtitle'>").text(setdate);
            var fiveDayTempEl = $("<p class='cardtext'>").text("Temp: " + fiveDayTemp + "°F");
            var fiveDayHumEl = $("<p class='cardtext'>").text("Humidity: " + fiveDayHum + "%");

            var fivedayweather = results[i].weather[0].main;

            if (fivedayweather === "Rain"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Clouds"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Clear"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Drizzle"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            } else if (fivedayweather === "Snow"){
                var fiveDayWeatherIconEl = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                fiveDayWeatherIconEl.attr("style", "height: 35px; width: 35px;");
            }
            
            fivedaycard.append(fiveDayDateEl);
            fivedaycard.append(fiveDayWeatherIconEl);
            fivedaycard.append(fiveDayTempEl);
            fivedaycard.append(fiveDayHumEl);
            $("#fiveday").append(fivedaycard);
        }

    });    
}

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
previousSearch ();

$("#searchbtn").on("click", function(event){
    //prevent button from submitting form
    event.preventDefault();
    //store the name of the city to search
    var searchCityEl = document.querySelector("#cityname").value;
    
    console.log(searchCityEl);
    
    //save search result to localstorage

    
    var storearray = [];
    storearray.push(searchCityEl);
    localStorage.setItem('cityname', JSON.stringify(storearray));

    searchCityWeather(searchCityEl);
    previousSearch ();
});

function previousSearch () {
    var lastSearch = JSON.parse(localStorage.getItem('cityname'));
    var lastSearchBtns = $("<button class='btn btn-secondary'>").text(lastSearch);

    var lastSearchList = $("#recent");
    lastSearchList.append(lastSearchBtns)
    $("#recenthistory").prepend(lastSearchList);
}

//get weather for recently searched items

$("#recenthistory").on("click", '.btn', function(event){
    event.preventDefault();
    searchCityWeather($(this).text());
});
