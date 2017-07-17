const container = document.getElementById("container");
var glocation =
  {
    london: { lat: 51.5074, lon: 0.1278},
    seattle: { lat: 47.6762, lon: -122.3182 }
  }

  /*let ul = document.createElement("ul");
  ul.id = "listContainer";*/

function onloadFunc(){
   
    //const resp = JSON.parse(this.response);
    const resp = JSON.parse(this.response).body;
      console.log("Response ", resp);
    //  printListItem(resp.weather[0].description);

      if (resp.wind) {
        printListItem(resp.wind);

        var knots = resp.wind.speed * 1.9438445;
        $("#wind-text").html(knots.toFixed(1) + " Knots");
      }

      if (resp.weather) {
        var imgURL = "https://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log(imgURL)
        $("#weatherImg").attr("src", imgURL);
        $("#weather-text").html(resp.weather[0].description);
      }

      if (resp.main.temp) {
        var fahr = (resp.main.temp * 9 / 5) - 459.67;
        var cels = (resp.main.temp - 273.15);
        if (cels > 24){
          $("#temp-text").css("color", "red");
        } else if (cels < 18){
          $("#temp-text").css("color", "blue");
        }
        $("#temp-text").html((tempMode === 1 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
      }




      else {
          // if no results, print an error message to page
          printListItem("Sorry, no results were found");
        }



      }
function onerrorFunc(){
     printListItem("Sorry, an error occurred");
  }

//function getWeather(lat, lon) {
function getWeather(locObj) {
      console.log("Passed to GetWeather",locObj)
  //var apiURI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=06170c100199dbae1e223cc3dfad960b";

      //  let apiURI = `http://api.openweathermap.org/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lon}&APPID=178c8ef1013d5657ddfcc24ccf0e544c`;
      let apiURI = `https://uwpce-weather-proxy.herokuapp.com/data/2.5/weather?lat=${locObj.lat}&lon=${locObj.lon}&APPID=178c8ef1013d5657ddfcc24ccf0e544c`;

        let request = new XMLHttpRequest();
        request.open("GET", apiURI, true);
        request.onload = onloadFunc;
        request.onerror = onerrorFunc;
        request.send();
      }

  function getLocation(setLocationTo) {
        const newPos = setLocationTo;
        getWeather(newPos);
  }
var onClickLondon = function(){
  getLocation(glocation.london);
};
var onClickSeattle = function(){
  getLocation(glocation.seattle);
}

// helper function to print message to page
function printListItem(message){
  let li = document.createElement("li");
  li.innerHTML = message;
  //document.getElementById("listContainer").appendChild(li);
  //document.getElementById("container").appendChild(ul);
}
