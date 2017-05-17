var app = function(){
  var button = document.getElementById("list-button");
  button.addEventListener("click", buttonClick);
  var button = document.getElementById("hide-button");
  button.addEventListener("click", hideButtonClick);
}

var buttonClick = function(){
  var url = "https://restcountries.eu/rest/v2"
  var list = document.getElementById("country-list");
  makeRequest(url, requestComplete);
}

var hideButtonClick = function(){
  var list = document.getElementById("country-list");
  list.innerHTML = "";
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

var populateList = function(countries){
  var list = document.getElementById("country-list");
  for (country of countries){
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
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener('load', app);
