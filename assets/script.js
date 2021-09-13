var countryName;
var storedCountry = [];
var searchHistory = document.getElementById("searchHistory");
//When user chooses country a modal should pop up with its information
document.getElementById("countryList").addEventListener('change', (event) => {
  console.log(event.target.value)
  countryName = event.target.value;
  storedCountry.push(countryName);
  localStorage.setItem("storedCountry", JSON.stringify(storedCountry));
  searchH();
  openCountryInfo(countryName);
  getCountryInfo(countryName);
});
//Displays countrys information in modal
function getCountryInfo(countryName) {
  var isoCode = "https://restcountries.eu/rest/v2/name/" + countryName;
  var countryC = "";
  var cityN;
  fetch(isoCode)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      countryC = data[0].alpha3Code;
      cityN = data[0].capital;
      var weatherUrl = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2021-08-24/2021-08-31";
      var confirmedC = new Array;
      var deaths = new Array;
      var stringencyN = new Array;
      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })

        .then(function (data) {
          var modalHeader = document.createElement("header");
          modalHeader.setAttribute("class", "modal-card-header");
          document.getElementById("countryContent").appendChild(modalHeader);
          var modalTitle = document.createElement("h2");
          modalTitle.setAttribute("class", "modal-card-title");
          modalTitle.setAttribute("id","modalT");
          modalTitle.setAttribute("style", "color:white");
          modalTitle.textContent = countryName;
          modalHeader.appendChild(modalTitle);

          //data for confirmed cases for users country
          for (let i = 24; i <= 31; i++) {
            var dateC = "2021-08-" + i;
            if (data.data[dateC][countryC] !== undefined) {
              var cases = data.data[dateC][countryC].confirmed;
              confirmedC.push(cases);
            }

          }
          var totalC = 0;
          for (var b = 0; b < confirmedC.length; b++) {
            totalC += confirmedC[b];
          }
          var avgConfirmed = totalC / confirmedC.length;
          var confirmedCases = document.createElement("p");
          confirmedCases.textContent = "Confirmed cases: " + Math.round(avgConfirmed);
          confirmedCases.setAttribute("style", "color:white");
          confirmedCases.setAttribute("id", "modalC");
          document.getElementById("countryContent").append(confirmedCases);

          //data for deaths of users country
          for (let i = 24; i <= 31; i++) {
            var dateD = "2021-08-" + i;
            if (data.data[dateD][countryC] !== undefined) {
              var deathCases = data.data[dateD][countryC].deaths;
              deaths.push(deathCases);
            }
          }
          var totalD = 0;
          for (var b = 0; b < deaths.length; b++) {
            totalD += deaths[b];
          }
          var avgDeaths = totalD / deaths.length;
          var confirmedDeaths = document.createElement("p");
          confirmedDeaths.textContent = "Confirmed deaths: " + Math.round(avgDeaths);
          confirmedDeaths.setAttribute("style", "color:white");
          confirmedDeaths.setAttribute("id", "modalD");
          document.getElementById("countryContent").append(confirmedDeaths);
          console.log("Deaths: " + Math.round(avgDeaths));

          //data for stringency of users country
          for (let i = 24; i <= 31; i++) {
            var dateS = "2021-08-" + i;
            if (data.data[dateS][countryC] !== undefined) {
              var stringency = data.data[dateS][countryC].stringency_legacy;
              stringencyN.push(stringency);
            }
          }
          var totalS = 0;
          for (var b = 0; b < stringencyN.length; b++) {
            totalS += stringencyN[b];
          }
          var avgStringency = totalS / stringencyN.length;
          var stringencyNumber = document.createElement("p");
          stringencyNumber.textContent = "Stringency Index: " + Math.round(avgStringency);
          stringencyNumber.setAttribute("style", "color:white");
          stringencyNumber.setAttribute("id", "modalS");
          document.getElementById("countryContent").append(stringencyNumber);
          console.log("Stringency Index: " + Math.round(avgStringency));

          //Current weather for countrys capital
          var apiKey = "6c2b8de8ee027fb6f7f5fbbc52cf3406";
          var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityN + "&appid=" + apiKey + "&units=imperial";

          fetch(weatherUrl)
            .then(function (response) {
              return response.json();
            })

            .then(function (data) {
              var capitalDiv = document.createElement("div");
              capitalDiv.setAttribute("id", "capitalW");
              capitalDiv.style.borderTop = "thick solid rgb(39, 52, 95)";
              var capitalWeather = document.createElement("p");
              capitalWeather.setAttribute("style", "color:white");
              capitalWeather.setAttribute("class", "modal-card-header")
              capitalWeather.textContent = "Weather for Country's Capital";
              capitalDiv.appendChild(capitalWeather);
              var capitalName = document.createElement("p");
              capitalName.setAttribute("style", "color:white");
              capitalName.textContent = data.name;
              capitalDiv.appendChild(capitalName);
              document.getElementById("countryContent").appendChild(capitalDiv);
              var weatherIcon = document.createElement("img");
              var iconcode = data.weather[0].icon;
              var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
              weatherIcon.src = iconurl;
              weatherIcon.alt = data.weather[0].description;
              capitalDiv.appendChild(weatherIcon);
              var weatherTemp = document.createElement("p");
              weatherTemp.setAttribute("style", "color:white");
              weatherTemp.textContent = "Temp: " + data.main.temp + " °F";
              capitalDiv.appendChild(weatherTemp);
              var weatherWind = document.createElement("p");
              weatherWind.setAttribute("style", "color:white");
              weatherWind.textContent = "Wind: " + data.wind.speed + " MPH";
              capitalDiv.appendChild(weatherWind);
              var weatherHumidity = document.createElement("p");
              weatherHumidity.setAttribute("style", "color:white");
              weatherHumidity.textContent = "Humidity: " + data.main.humidity + " %";
              capitalDiv.appendChild(weatherHumidity);

            })
        })
    })
}
//Retrieves user country from local storage and appears as button
function searchH() {
  searchHistory.innerHTML = "";
  storedCountry = JSON.parse(localStorage.getItem("storedCountry"));
  var countryList = document.createElement("ul");
  searchHistory.appendChild(countryList);
  if (!storedCountry) {
    storedCountry = [];
    return false;
  }
  for (let i = 0; i < storedCountry.length; i++) {
    var historyBtn = document.createElement("button");
    historyBtn.setAttribute("class", "button is-info");
    console.log(storedCountry[i]);
    historyBtn.value = storedCountry[i];
    historyBtn.textContent = historyBtn.value;
    console.log(storedCountry[i]);
    //When user clicks on previous country modal should pop along with its information
    historyBtn.addEventListener("click", function () {
      getCountryInfo(storedCountry[i]);
      openCountryInfo()
    })
    countryList.prepend(historyBtn);
  }

}
searchH();
//get modal element
var modal = document.getElementById("simpleModal");
var modalInfo = document.getElementById("countryInfo")
//get modal button
var modalBtn = document.getElementById("modalBtn");
//get close btn
var closeInfoBtn = document.getElementsByClassName("closeBtn")[0]
var closeBtn = document.getElementsByClassName("closeBtn")[1];

//listen for open click
modalBtn.addEventListener("click", openModal);
//listen for close click
closeInfoBtn.addEventListener("click", closeCountryInfo);
closeBtn.addEventListener("click", closeModal);

//function to open modal
function openCountryInfo() {
  modalInfo.style.display = "block";
}
function openModal() {
  modal.style.display = "block";
}
//function to close modal
function closeCountryInfo() {
  modalInfo.style.display = "none";
  //Deletes previous countrys information on modal
  var elm = document.getElementById("modalT");
  elm.remove();
  var elmC = document.getElementById("modalC");
  elmC.remove();
  var elmD = document.getElementById("modalD");
  elmD.remove();
  var elmS = document.getElementById("modalS");
  elmS.remove();
  var elmW = document.getElementById("capitalW");
  elmW.remove();
}
function closeModal() {
  modal.style.display = "none";
}
//Clears users search history and refreshes page
var clearHistoryBtn = document.getElementById("clearHistoryBtn");
clearHistoryBtn.addEventListener("click", clearHistory);
function clearHistory(){
  localStorage.clear();
  location.reload();
}