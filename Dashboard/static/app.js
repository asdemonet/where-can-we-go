// Use the D3 libary to read in "RDUCurrentFlights.json" file.  
// Add list of Destinations to drop down menu.

d3.json("RDUCurrentDestinations.json").then(function (data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var option = d3.select("#Destination").append("option").text(data[i].DEST_CITY_NAME);
        //console.log(option);
    }
});

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

// Set map to geographic center of USA
const centerLatLng = [39.8283, -98.5795]

// Create base map in Leaflet
var myMap = L.map("map", {
    center: centerLatLng,
    zoom: 4,
});
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
// Add marker for RDU.
const RDU_lnglat = { lon: -78.6390989, lat: 35.7803977 };
L.marker(RDU_lnglat)
    .bindPopup("<h3> From: <strong>Raleigh, NC</strong> </h3> <hr> <h6> Airport: RDU </h6>")
    .addTo(myMap);


d3.select("#Destination").on("change", optionChanged);
d3.select("#Price").on("change", optionChanged);
d3.select("#Date").on("click", optionChanged);//Need to click twice.

function optionChanged() {
    //d3.event.preventDefault();
    var dropdownoptions = d3.select("#Destination");
    var destination = dropdownoptions.property("value");
    var priceElement = d3.select("#Price");
    var price = priceElement.property("value");
    var dateElement = d3.select("#Date");
    var date = dateElement.property("value");
    var date_split = date.split('/');
    var year = date_split[2];
    var month1 = date_split[0];;
    var month = month1.substring(1);
    var day = date_split[1];
    console.log(destination);
    console.log(price);
    console.log(date);
    console.log(year);
    console.log(month);
    console.log(day);

    search_dest = [];

    d3.json("RDUCurrentDestinations.json").then(function (data) {
        //console.log(data);
        var destData = data;
        //console.log(destData)
        var search = destData.filter(dest => dest.DEST_CITY_NAME == destination);
        //console.log(search);
        var airport = search[0].DEST;
        //console.log(airport);
        search_dest.push(airport);
        const latitude = search[0].LATITUDE;
        const longitude = search[0].LONGITUDE;
        const lnglat = { lon: longitude, lat: latitude };
        const distance_type = search[0].DISTANCE_GROUP;
        const pointA = new L.LatLng(35.7803977, -78.6390989); //point A is RDU LatLng
        const pointB = new L.LatLng(latitude, longitude);//pointB is dest LatLng
        var pointList = [pointA, pointB];
        var flightpath = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        });
        flightpath.addTo(myMap);
        L.marker(lnglat)
            .bindPopup("<h3> To: <strong>" + search[0].DEST_CITY_NAME + "</strong> </h3> <hr> <h6> Airport: " + search[0].DEST + "</h6> <hr> <h6> Flight Distance (miles): " + search[0].DISTANCE + "</h6>")
            .addTo(myMap);
    });

    console.log(search_dest);

    // Add airlines and flight numbers to FLIGHT INFO BOX - format should be as a table
    d3.json("RDUCurrentFlights.json").then(function (data2) {
        //console.log(data2);
    });

    d3.json("MDW_2015_Q1_Delays_Causes_TEST.json").then(function (data3) {
        //console.log(data3);
        var delays_causes = data3;
        //console.log(delays_causes);
        console.log(search_dest);
        console.log(month);
        var filter_dcs1 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month);
        console.log(filter_dcs1);

        var weather = [];
        var NASs = [];
        var security = [];
        var late_aircraft = [];

        for (var i = 0; i < filter_dcs1.length; i++) {
            if (filter_dcs1[i].WEATHER_DELAY > 0) { weather.push(filter_dcs1[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs1[i].NAS_DELAY > 0) { NASs.push(filter_dcs1[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs1[i].SECURITY_DELAY > 0) { security.push(filter_dcs1[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs1[i].LATE_AIRCRAFT_DELAY > 0) { late_aircraft.push(filter_dcs1[i].OP_CARRIER_FL_NUM); }
        }

        var percent_weather = (weather.length / filter_dcs1.length) * 100
        var percent_NAS = (NASs.length / filter_dcs1.length) * 100
        var percent_security = (security.length / filter_dcs1.length) * 100
        var percent_late_aircraft = (late_aircraft.length / filter_dcs1.length) * 100
        console.log(percent_weather);
        console.log(percent_NAS);
        console.log(percent_security);
        console.log(percent_late_aircraft);


        var barchart = [{
            x: ["Weather", "NAS", "Security", "Late Aircraft"],
            y: [percent_weather, percent_NAS, percent_security, percent_late_aircraft],
            type: "bar",
            automargin: true,
            sort: false,
        }];
        var layout = {
            yaxis: { title: '% of Flights (2015-2019)' }
        };
        Plotly.newPlot('bar', barchart, layout);

        // Count of all flights in a given month
        var flight_count = filter_dcs1.length;
        console.log("Flight count: ", flight_count);
        // Delayed Departures
        var delayed_departures = filter_dcs1.filter(item => item.DEP_DEL15 == 1).length;
        console.log("Delayed depatures: ", delayed_departures);
        var delayed_dep = delayed_departures/flight_count;
        console.log(delayed_dep);
        var percent_delayed_dep = (Math.round(delayed_dep * 10000)/100);
        // Delayed Arrivals
        var delayed_arrivals = filter_dcs1.filter(item => item.ARR_DEL15 == 1).length;
        console.log("Delayed arrivals: ", delayed_arrivals);
        var delayed_arr = delayed_arrivals/flight_count;
        console.log(delayed_arr);
        var percent_delayed_arr = (Math.round(delayed_arr * 10000)/100);
        // Cancelled Flights
        var cancelled_flights = filter_dcs1.filter(item => item.CANCELLED == 1).length;
        console.log("Cancelled flights: ", cancelled_flights);
        var cancelled = cancelled_flights/flight_count;
        console.log(cancelled);
        var percent_cancelled = (Math.round(cancelled * 10000)/100);
        // Diverted Flights
        var diverted_flights = filter_dcs1.filter(item => item.DIVERTED == 1).length;
        console.log("Diverted flights: ", diverted_flights);
        var diverted = diverted_flights/flight_count;
        console.log(diverted);
        var percent_diverted = (Math.round(diverted * 10000)/100);

        var piechart = [{
            values: [flight_count, delayed_departures, delayed_arrivals, cancelled_flights, diverted_flights],
            labels: ["Normal Flights", "Delayed Departures", "Delayed Arrivals", "Cancelled Flights", "Diverted Flights"],
            marker: {
                colors: ['rgb(44, 160, 44)', 'rgb(255,255,0)', 'rgb(255, 127, 14)',
                'rgb(214, 39, 40)',
                'rgb(148, 103, 189)']
            },
            type: "pie",
            hoverinfo: "label+percent",
            automargin: true,
            sort: false,
        }];
        var layout = {
            title: `% of Flights by Search Month (2015-2019)`,
            showlegend: false,
            
        };
        Plotly.newPlot('pie', piechart, layout);
    });
}