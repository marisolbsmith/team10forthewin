
var queryUrl = "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2021-08-24/2021-08-31";
var countryList = new Array;
var countryListName = new Array;
var countryOption = document.getElementById("countryList");
//Country List for dropdown
fetch(queryUrl)
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        countryList = data.countries;
        fetch("https://restcountries.com/v3/all")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //changes country code into country name
                countryList.forEach(element => {
                    for (let c = 0; c < 250; c++) {
                        if (element === data[c].cca3) {
                            var countryN = data[c].name['common'];
                            countryListName.push(countryN);
                        }
                    }
                })
                //each country name is then added to dropdown
                for (let i = 0; i < countryListName.length; i++) {
                    var optionList = document.createElement("OPTION");
                    optionList.setAttribute("value", countryListName[i]);
                    var t = document.createTextNode(countryListName[i]);
                    optionList.appendChild(t);
                    countryOption.appendChild(optionList);
                }
            })
    })