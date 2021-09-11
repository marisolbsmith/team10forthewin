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
        //Using console.log to examine the data
        console.log(data);
        console.log(data.countries);
        countryList = data.countries;
        console.log(countryList);
        fetch("https://restcountries.eu/rest/v2/all")
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                //Using console.log to examine the data
                console.log(data);

                countryList.forEach(element => {
                    for (let c = 0; c < 250; c++) {

                        if (element === data[c].alpha3Code) {
                            var countryN = data[c].name;
                            console.log(element);
                            countryListName.push(countryN);
                        }
                    }
                })
                console.log(countryListName);
                for (let i = 0; i < countryListName.length; i++) {
                    var optionList = document.createElement("OPTION");
                    optionList.setAttribute("value", countryListName[i]);
                    var t = document.createTextNode(countryListName[i]);
                    optionList.appendChild(t);
                    countryOption.appendChild(optionList);

                }


            })

    })

