window.localStorage.clear();

function loadChart(elm, chart_name, data) {
    Highcharts.chart(elm, {
        title: {
            text: chart_name
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
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
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, {
            name: 'Project Development',
            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],

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
        let currentData = localStorage.getItem("deviceData");
        //console.log(currentData);
        let jsonData = JSON.parse(currentData);
        //console.log(typeof jsonData);
        jsonData = jsonData.concat(thing_data);

        //jsonData = new Set(jsonData);
        //console.log(jsonData);
        localStorage.setItem("deviceData", JSON.stringify(jsonData));
    }

}

/*
    Fetches Data Via GET request from dweet
 */
function fetchData(name) {
    var url = "https://dweet.io/get/dweets/for/" + name;

    return fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let thing_data = data.with;
            console.log(thing_data);
            storeData(thing_data);
        })
        .then(function (data) {
            console.log(localStorage.getItem("deviceData"))
        })
        .catch(function (error) {
            console.log(error);
        });
}


var test_data = [
    {
        "thing": "PIBOMETER",
        "created": "2018-11-16T15:17:41.155Z",
        "content": {
            "ultrasonic_distance": 3,
            "weather_readings": {
                "humidity": 28,
                "temperature": 27
            },
            "reading_created": "2018-11-16 15:17:38.827067"
        }
    },
    {
        "thing": "PIBOMETER",
        "created": "2018-11-16T15:18:10.155Z",
        "content": {
            "ultrasonic_distance": 30,
            "weather_readings": {
                "humidity": 22,
                "temperature": 26
            },
            "reading_created": "2018-11-16 15:17:38.827067"
        }
    }
];


var r = fetchData("PIBOMETER");
console.log(r);
console.log(JSON.stringify(r));

storeData(test_data);

//var storedData = localStorage.getItem("deviceData");

//console.log(storedData);
var data = localStorage.getItem("deviceData");

console.log(data);

storeData([
    {
        "thing": "PIBOMETER",
        "created": "2018-11-16T15:01:41.155Z",
        "content": {
            "ultrasonic_distance": 1,
            "weather_readings": {
                "humidity": 22,
                "temperature": 27
            },
            "reading_created": "2018-11-16 15:17:38.827067"
        }
    }]);

var data = localStorage.getItem("deviceData");

console.log(data);


Highcharts.chart('container', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Temperature'
        }
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
            //pointStart: 2010
        }
    },

    series: [{
        name: 'Sensor Data',
        data: [

            [Date.now(), 0],
            [Date.now() + 1000, 0.25],
            [Date.now() + 2500, 1.41],
            [Date.now() + 5000, 1.64],
            [Date.now() + 10000, 1.6],
        ]
    }],

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

var date_time_test = "2018-11-16T15:17:41.155Z";

var unix_time = Date.parse(date_time_test);

console.log(unix_time);

console.log("Time NOW!! " + Date.now());