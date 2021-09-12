/*create a btn with two choices (do you want a low risk vacation?)
    if user clicks yes then modal is displayed
        no - then modals is displayed with if you're sure
            yes- choices wil be low risk 
            no - (choices will be of medium/high risk)
        yes - choices will be (dropdown?) :
            LOW RISK
                tropical/beach? suggested country: tanzania(TZA), nicaragua (NIC)
                mountains/outdoor? suggested country: tajikistan(TJK)
                snow/cold? suggested country: estonia (EST), tajikistan
            MEDIUM RISK
                tropical/beach? suggested country: croatia(HRV) , dominican republic (DOM)
                mountains/outdoor? suggested country: finland
                snow/cold? suggested country: iceland(ISL), finland (FIN)

then based off those answers display facial coverings,vaccination policy, international travel controls with weather forecast.
*/
//Get modal ids for it to display then close when button is clicked
//change from d-none to d-block
//span x d-none
// variable for choices
/* from data get all the CC and D and put it in a array
    confirmed cases (CC): data.data["2021-08-24"].{country code}.confirmed
    deaths (D): data.data["2021-08-24"].{country code}.deaths
   Array CC and D get the average
   Then for each date average put into a new array and get the average for the whole date selected.
*/
var countryName;
document.getElementById("countryList").addEventListener('change', (event) => {
  console.log(event.target.value)
  countryName = event.target.value;
  openCountryInfo();
  getCountryInfo();
});
function getCountryInfo() {
  var isoCode = "https://restcountries.eu/rest/v2/name/" + countryName;
  var countryC = "";
  var cityN;
  fetch(isoCode)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
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
          //Using console.log to examine the data
          console.log(data);
          var modalHeader = document.createElement("header");
          modalHeader.setAttribute("class", "modal-card-header");
          document.getElementById("countryContent").appendChild(modalHeader);
          var modalTitle = document.createElement("h2");
          modalTitle.setAttribute("class", "modal-card-title");
          modalTitle.setAttribute("id", "modalT");
          modalTitle.setAttribute("style", "color:white");
          modalTitle.textContent = countryName;
          console.log(modalTitle);
          modalHeader.appendChild(modalTitle);
          //data for confirmed cases for users country
          for (let i = 24; i <= 31; i++) {
            var dateC = "2021-08-" + i;
            if (data.data[dateC][countryC] !== undefined) {
              var cases = data.data[dateC][countryC].confirmed;
              console.log(dateC + " " + cases);
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
          console.log("Confirmed cases: " + Math.round(avgConfirmed));

          //data for deaths of users country
          for (let i = 24; i <= 31; i++) {
            var dateD = "2021-08-" + i;
            if (data.data[dateD][countryC] !== undefined) {
              var deathCases = data.data[dateD][countryC].deaths;
              console.log(dateD + " " + deathCases);
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
              console.log(dateS + " " + stringency);
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
              console.log(data);
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
  var elm = document.getElementById("modalT");
  elm.innerHTML = "";
  var elmC = document.getElementById("modalC");
  elmC.innerHTML = "";
  var elmD = document.getElementById("modalD");
  elmD.innerHTML = "";
  var elmS = document.getElementById("modalS");
  elmS.innerHTML = "";
  var elmW = document.getElementById("capitalW");
  elmW.style.borderTop = "none";
  elmW.innerHTML = "";
}
function closeModal() {
  modal.style.display = "none";
}

