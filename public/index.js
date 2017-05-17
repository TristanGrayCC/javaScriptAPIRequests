var app = function(){
  var url = "https://restcountries.eu/rest/v2"
  makeRequest(url, requestComplete);
  var list = document.getElementById("country-list");
  var dropDown = document.getElementById("drop-down");
  dropDown.addEventListener('change', display);
  setPersistedCountry();
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

var borderRequestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var country = JSON.parse(jsonString);

  populateBordersList(country);
  console.log(country);
}

var setPersistedCountry = function(){
  var jsonString = localStorage.getItem('country');
  var savedCountry = JSON.parse(jsonString);

  if(!savedCountry) return;
  createCountryDisplay(savedCountry);
}

var newRequestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var country = JSON.parse(jsonString);

  var jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);

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

var populateBordersList = function(country){
  var list = document.getElementById("neighbours");
    var listItem = document.createElement("li");
    var dataList = document.createElement("ul");
    var population = document.createElement("li");
    var flag = document.createElement("img");
    listItem.innerText = country.name;
    flag.setAttribute("src", country.flag);
    flag.style.width = "200px";
    population.innerText = "Population: " + country.population;
    dataList.appendChild(population);
    dataList.appendChild(flag);
    listItem.appendChild(dataList);
    list.appendChild(listItem);
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

  createNeighbours(country[0].borders);
 }

 var createNeighbours = function(borders){
   for (border of borders){
    var url = "https://restcountries.eu/rest/v2/alpha/" + border;
    makeRequest(url, borderRequestComplete);
  };
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
  var list = document.getElementById("neighbours");
  list.innerHTML = "";
}

window.addEventListener('load', app);
