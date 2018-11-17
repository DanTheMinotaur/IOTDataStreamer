//window.localStorage.clear();

/*
    Method for Generation of Chart
 */

function loadChart(elm, chart_name, type_of_data, thing_name, data) {
    Highcharts.chart(elm, {
        title: {
            text: chart_name
        },

        subtitle: {
            text: thing_name
        },

        yAxis: {
            title: {
                text: type_of_data
            },
            min: 0
        },
        xAxis: {
            // Code from https://stackoverflow.com/questions/8268170/plotting-seconds-minutes-and-hours-on-the-yaxis-with-highcharts
            type: 'datetime',
            dateTimeLabelFormats: { //force all formats to be hour:minute:second
                second: '%H:%M:%S',
                minute: '%H:%M:%S',
                hour: '%H:%M:%S',
                day: '%H:%M:%S',
                week: '%H:%M:%S',
                month: '%H:%M:%S',
                year: '%H:%M:%S'
            },
            title: {
                text: 'Time'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },

        series: [
            {
                name: type_of_data,
                data: data
            }
        ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

/*
    Function for storing thing data and appending it to
 */
function storeData(thing_data) {
    let current_values = localStorage.getItem("deviceData");
    //console.log(thing_data);


    if (current_values == null) {
        console.log("No Data, Creating Initial Data");
        localStorage.setItem("deviceData", JSON.stringify(thing_data));
    } else {
        console.log("Data Currently Exists, appending new data");
        let jsonData = JSON.parse(localStorage.getItem("deviceData"));

        //console.log(currentData);
        //let jsonData = JSON.parse(currentData);

        let new_thing_data = [];
        // Checks if the data is a duplicate
        thing_data.forEach(function (obj) {
            let alreadyIn = false;
            // Search in current data for value
            jsonData.forEach(function (currObj) {
                if (obj.created === currObj.created){
                    alreadyIn = true;
                }
            });
            if (!alreadyIn) {
                new_thing_data.push(obj);
            }
        });

        console.log("NEW THING DATA" + new_thing_data);
        console.log("HERE");
        jsonData = jsonData.concat(new_thing_data);

        //jsonData = new Set(jsonData);
        //console.log(jsonData);
        localStorage.setItem("deviceData", JSON.stringify(jsonData));
    }
    return JSON.parse(localStorage.getItem("deviceData"));
}

/*
    Fetches Data Via GET request from dweet
 */
function fetchData(name, refresh=true) {
    var url = "https://dweet.io/get/dweets/for/" + name;

    return fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let thing_data = data.with;
            console.log(thing_data);
            return storeData(thing_data);
        })
        .then(function (dataArray) {
            if (refresh) {
                createGraphs(dataArray);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

fetchData("PIBOMETER");

function createTemperatureGraph(tempData) {
    dataArray = [];

    tempData.forEach(function (data) {
       dataArray.push([Date.parse(data.created), data.content.weather_readings.temperature]);
    });

    loadChart("temperature", "Temperature", "Degrees", "PIBOMETER", dataArray);
}

/*
    Method used to create Graphs
 */
function createGraphs(dataArray) {
    tempData = [];
    humData = [];
    distanceData = [];

    if (dataArray != null) {
        dataArray.forEach(function (data) {
           tempData.push([Date.parse(data.created), data.content.weather_readings.temperature]);
           humData.push([Date.parse(data.created), data.content.weather_readings.humidity]);
           distanceData.push([Date.parse(data.created), data.content.ultrasonic_distance]);
        });

        tempData.sort();
        humData.sort();
        distanceData.sort();
    }



    loadChart("temperature", "Temperature", "Degrees", "PIBOMETER", tempData);
    loadChart("humidity", "Humidity", "Water Content", "PIBOMETER", humData);
    loadChart("distance", "Distance Set off", "CM", "PIBOMETER", distanceData);
}

//var storedData = JSON.parse(localStorage.getItem("deviceData"));

//console.log("Stored Data " + storedData);

//createGraphs(storedData);

var pullNewData = document.getElementById("pullData");
var deleteData = document.getElementById("deleteData");
pullNewData.onclick = function () {
    fetchData("PIBOMETER");
    //let storedData = JSON.parse(localStorage.getItem("deviceData"));
    //createGraphs(storedData);
};
deleteData.onclick = function () {
    window.localStorage.clear();
    let storedData = JSON.parse(localStorage.getItem("deviceData"));
    createGraphs(storedData);
};