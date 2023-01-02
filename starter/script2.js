$(document).ready(function () {
  // building the url for the Api
  var userInput = "";
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?";
  var key = "&appid=e59cd40bbcdff38f1a572b109e5022e6";
  var unit = "&units=metric";
  var historyArr = [];

  // Build function that display current weather

  function weather(event) {
    event.preventDefault();
    userInput = $("#search-input").val();
    historyList(userInput);
    displayWeather();
  }

  function displayWeather() {
    queryUrl = apiUrl + "q=" + userInput + key + unit;

    console.log(queryUrl);

    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response.list[0].weather[0].icon);

      let city = $("<h3>");
      let date = new Date(response.list[0].dt * 1000).toLocaleDateString();
      city.text(response.city.name + " " + "( " + date + " )");

      let temp = $("<p>");
      temp.text("Temp: " + response.list[0].main.temp + " °C");
      let wind = $("<p>");
      wind.text("Wind: " + response.list[0].wind.speed + " Km/h");
      let humidity = $("<p>");
      humidity.text("Humidity: " + response.list[0].main.humidity + "%");
      // building the Icon url
      let icon = $("<img>");
      let weathericon = response.list[0].weather[0].icon;
      let iconurl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";

      icon.attr("src", iconurl);

      console.log(icon);

      let data = $("<div>");
      data.append(city, icon, temp, wind, humidity);
      data.attr("class", "col-12");
      let heading = $("<h2>" + "Today" + "<h2>");
      heading.attr("class", "col-12");
      $("#today").append(heading, data);
    });
    forecast();
    saveHistory();
    $("#forecast").empty();
    $("#today").empty();
  }
  // save users input to local storage and add to history list

  function saveHistory() {
    historyArr.push(userInput);
    localStorage.setItem("searchedCity", JSON.stringify(historyArr));
  }

  // Function to sisplay search history list
  function historyList(c) {
    let searchCityUl = $("<ul>");

    let searchCity = $("<li>" + c + "</li>");
    searchCity.attr("class", "history-item");
    searchCity.attr("city", userInput);

    searchCityUl.append(searchCity);
    $("#history").prepend(searchCityUl);
  }

  // function to display forcast

  function forecast() {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      let title = $("<h3>" + "5 Days Forecast" + "</h3>");
      title.attr("class", "col-12");
      $("#forecast").append(title);

      //console.log(response)

      for (let i = 0; i < 5; i++) {
        let city = $("<p>");

        let date = new Date(
          response.list[(i + 1) * 8 - 1].dt * 1000
        ).toLocaleDateString();
        city.text(date);

        let temp = $("<p>");

        temp.text("Temp: " + response.list[(i + 1) * 8 - 1].main.temp + " °C");
        let wind = $("<p>");

        wind.text(
          "Wind: " + response.list[(i + 1) * 8 - 1].wind.speed + " Km/h"
        );
        let humidity = $("<p>");

        humidity.text(
          "Humidity: " + response.list[(i + 1) * 8 - 1].main.humidity + "%"
        );
        // building the Icon url
        let icon = $("<img>");
        let weathericon = response.list[(i + 1) * 8 - 1].weather[0].icon;
        let iconurl =
          "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";

        icon.attr("src", iconurl);

        let forcast = $("<div>");
        forcast.attr("class", "col-md-2");

        forcast.append(city, icon, temp, humidity);

        $("#forecast").append(forcast);
      }
    });
  }

  function lastLoaded() {
    $("ul").empty();
    let city = JSON.parse(localStorage.getItem("searchedCity"));
    if (city !== null) {
      city = JSON.parse(localStorage.getItem("searchedCity"));
      for (i = 0; i < city.length; i++) {
        historyList(city[i]);
      }
      userInput = city[i-1];
      displayWeather();
    }
  }
  console.log(JSON.parse(localStorage.getItem("searchedCity")));

  function loadSearch(event) {
    let list = event.target;
    if (event.target.matches("li")) {
      userInput = list.textContent.trim();
      displayWeather();
    }

    console.log(userInput);
  }

  // clicking segment
  $("#search-button").on("click", weather);
  $(document).on("click", loadSearch);
  $(window).on("load", lastLoaded);
});
