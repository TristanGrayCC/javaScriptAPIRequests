var app = function(){
  var url = "https://restcountries.eu/rest/v2"
  makeRequest(url, requestComplete);
  var list = document.getElementById("country-list");
  var dropDown = document.getElementById("drop-down");
  dropDown.addEventListener('change', display);
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

var newRequestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var country = JSON.parse(jsonString);

  createCountryDisplay(country);
}

var populateList = function(countries){
  var dropDown = document.getElementById("drop-down");
  for (country of countries){
    var listItem = document.createElement("option");
    listItem.innerText = country.name;
    dropDown.appendChild(listItem);
  }
}

var createCountryDisplay = function(country){
  var list = document.getElementById("country-list");
  var listItem = document.getElementById("country-name");
  var dataList = document.getElementById("data-list");
  var population = document.getElementById("population");
  var capital = document.getElementById("capital");
  var flag = document.getElementById("flag");
  listItem.innerText = country[0].name;
  population.innerText = "Population: " + country[0].population;
  capital.innerText = "Capital: " + country[0].capital;
  flag.setAttribute("src", country[0].flag);
  flag.style.width = "200px";
 }

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var display = function(){
  var selected = document.getElementById("drop-down").value;
  var url = "https://restcountries.eu/rest/v2/name/" + selected;
  makeRequest(url, newRequestComplete);
}

window.addEventListener('load', app);
