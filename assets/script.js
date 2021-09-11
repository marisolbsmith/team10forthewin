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
var countryName = "Nicaragua";
var isoCode = "https://restcountries.eu/rest/v2/name/" + countryName;
var countryCode;
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
        console.log(data[0].alpha3Code);
        cityN = data[0].capital;
        console.log("Capital: "+data[0].capital);
        var queryUrl = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2021-08-24/2021-08-31";
        var confirmedNIC = new Array;
        var deathsNIC = new Array;
        fetch(queryUrl)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                //Using console.log to examine the data
                console.log(data);
                console.log(countryC);
                console.log(data.data["2021-08-24"][countryC]);
                console.log(data.data["2021-08-25"][countryC]);
                console.log(data.data["2021-08-26"][countryC]);
                console.log(data.data["2021-08-27"][countryC]);
                console.log(data.data["2021-08-28"][countryC]);
                console.log(data.data["2021-08-29"][countryC]);
                console.log(data.data["2021-08-30"][countryC]);
                console.log(data.data["2021-08-31"][countryC]);

                //data for confirmed cases for Nicaragua
                for (let i = 24; i <= 31; i++) {
                    var dateC = "2021-08-" + i;
                    var cases = data.data[dateC][countryC].confirmed;
                    confirmedNIC.push(cases);
                }
                console.log(confirmedNIC);
                var total = 0;
                for (var b = 0; b < confirmedNIC.length; b++) {
                    total += confirmedNIC[b];
                }
                var avgConfirmedNIC = total / confirmedNIC.length;
                console.log("Avg for confirmed cases: "+avgConfirmedNIC);

                //data for deaths for Nicaragua
                for (let i = 24; i <= 31; i++) {
                    var dateD = "2021-08-" + i;
                    var cases = data.data[dateD][countryC].deaths;
                    deathsNIC.push(cases);
                }
                console.log(deathsNIC);
                var total = 0;
                for (var b = 0; b < deathsNIC.length; b++) {
                    total += deathsNIC[b];
                }
                var avgDeathsNIC = total / deathsNIC.length;
                console.log("Avg for deaths: "+Math.round(avgDeathsNIC));
            })

        var apiKey = "6c2b8de8ee027fb6f7f5fbbc52cf3406";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityN + "&appid=" + apiKey + "&units=imperial";

        fetch(queryUrl)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log(data);
            })

    })
var queryUrl =
  "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2021-08-24/2021-08-31";
var confirmedNIC = new Array();
var deathsNIC = new Array();
fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    //Using console.log to examine the data
    console.log(data);
    console.log(data.data["2021-08-24"].NIC.deaths);
    console.log(data.data["2021-08-25"].NIC.deaths);
    console.log(data.data["2021-08-26"].NIC.deaths);
    console.log(data.data["2021-08-27"].NIC.deaths);
    console.log(data.data["2021-08-28"].NIC.deaths);
    console.log(data.data["2021-08-29"].NIC.deaths);
    console.log(data.data["2021-08-30"].NIC.deaths);
    console.log(data.data["2021-08-31"].NIC.deaths);

    //data for confirmed cases for Nicaragua
    for (let i = 24; i <= 31; i++) {
      var dateC = "2021-08-" + i;
      var cases = data.data[dateC].NIC.confirmed;
      confirmedNIC.push(cases);
    }
    console.log(confirmedNIC);
    var total = 0;
    for (var b = 0; b < confirmedNIC.length; b++) {
      total += confirmedNIC[b];
    }
    var avgConfirmedNIC = total / confirmedNIC.length;
    console.log(avgConfirmedNIC);

    //data for deaths for Nicaragua
    for (let i = 24; i <= 31; i++) {
      var dateD = "2021-08-" + i;
      var cases = data.data[dateD].NIC.deaths;
      deathsNIC.push(cases);
    }
    console.log(deathsNIC);
    var total = 0;
    for (var b = 0; b < deathsNIC.length; b++) {
      total += deathsNIC[b];
    }
    var avgDeathsNIC = total / deathsNIC.length;
    console.log(Math.round(avgDeathsNIC));
  });
//get modal element
var modal = document.getElementById("simpleModal");
//get modal button
var modalBtn = document.getElementById("modalBtn");
//get close btn
var closeBtn = document.getElementsByClassName("closeBtn")[0];

//listen for open click
modalBtn.addEventListener("click", openModal);
//listen for close click
closeBtn.addEventListener("click", closeModal);

//function to open modal
function openModal() {
  modal.style.display = "block";
}
//function to close modal
function closeModal() {
  modal.style.display = "none";
}
