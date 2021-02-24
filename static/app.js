// Use the D3 libary to read in "RDUCurrentFlights.json" file.  
// Add list of Destinations to drop down menu.

d3.json("/api/RDUCurrentDestinations").then(function (data) {
    console.log(data);
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
    accessToken: "pk.eyJ1IjoiYXNkZW1vbmV0IiwiYSI6ImNraXM2NnpsYTA4NTgycHBqdDJjZDZ0ZXQifQ.4TP6rZGbHEk2NnsLqS8mtQ"
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

    d3.json("/api/RDUCurrentDestinations").then(function (data) {
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
        const distance_type = search[0].DISTANCE_GROUP; //distance_type is distance_group
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

    var carrier_list = [];

    // Add airlines to carrier_list.
    d3.json("/api/RDUCurrentFlights").then(function (data2) {
        //console.log(data2);
        var flightInfo = data2;
        //console.log(flightInfo);
        var flight_search = flightInfo.filter((item => item.DEST == search_dest));
        //console.log(flight_search);
        for (var i = 0; i < flight_search.length; i++) {
            carrier_list.push(flight_search[i].OP_UNIQUE_CARRIER);
        }
    });

    d3.json("/api/RDU_2015_19_Delays_Causes_ML").then(function (data3) {
        //console.log(data3);
        var delays_causes = data3;
        //console.log(delays_causes);
        //filter delay date by day, month and most recent year to get all recent flights.
        var time_search = delays_causes.filter(item => item.DEST == search_dest && item.DAY_OF_MONTH == day && item.MONTH == month && item.YEAR == 2015);//CHange to 2019 with API
        console.log(time_search);
        //create smaller dataset to include carrier, departure and arrival times.
        var tabledata = [];
        for (var i = 0; i < time_search.length; i++) {
            row = {}
            row["OP_UNIQUE_CARRIER"] = time_search[i]['OP_UNIQUE_CARRIER'];
            row["CRS_DEP_TIME"] = time_search[i]['CRS_DEP_TIME'];
            row["CRS_ARR_TIME"] = time_search[i]['CRS_ARR_TIME'];
            tabledata.push(row)
        }
        console.log(tabledata);
        //Post into table.
        var tbody = d3.select("tbody");
        tbody.html("");
        tabledata.forEach(function (tabledata) {
            var row1 = tbody.append("tr");
            Object.entries(tabledata).forEach(function ([key, value]) {
                console.log(key, value);
                var cell1 = row1.append("td");
                cell1.text(value);
            });
        });

        //console.log(search_dest);
        //console.log(month);
        var filter_dcs1 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month);
        //console.log(filter_dcs1);

        // Count of all normal flights in a given month
        var flight_count = filter_dcs1.filter(item => item.DEP_DEL15 == 0 && item.ARR_DEL15 == 0 && item.CANCELLED == 0 && item.DIVERTED == 0);
        var normal_flight_count = flight_count.length;
        //console.log("Flight count: ", normal_flight_count);
        // Delayed Departures
        var delayed_departures = filter_dcs1.filter(item => item.DEP_DEL15 == 1).length;
        //console.log("Delayed depatures: ", delayed_departures);
        //var delayed_dep = delayed_departures / flight_count;
        //console.log(delayed_dep);
        //var percent_delayed_dep = (Math.round(delayed_dep * 10000) / 100);
        // Delayed Arrivals
        var delayed_arrivals = filter_dcs1.filter(item => item.ARR_DEL15 == 1).length;
        //console.log("Delayed arrivals: ", delayed_arrivals);
        //var delayed_arr = delayed_arrivals / flight_count;
        //console.log(delayed_arr);
        //var percent_delayed_arr = (Math.round(delayed_arr * 10000) / 100);
        // Cancelled Flights
        var cancelled_flights = filter_dcs1.filter(item => item.CANCELLED == 1).length;
        //console.log("Cancelled flights: ", cancelled_flights);
        //var cancelled = cancelled_flights / flight_count;
        //console.log(cancelled);
        //var percent_cancelled = (Math.round(cancelled * 10000) / 100);
        // Diverted Flights
        var diverted_flights = filter_dcs1.filter(item => item.DIVERTED == 1).length;
        //console.log("Diverted flights: ", diverted_flights);
        //var diverted = diverted_flights / flight_count;
        //console.log(diverted);
        //var percent_diverted = (Math.round(diverted * 10000) / 100);

        var piechart = [{
            values: [normal_flight_count, delayed_departures, delayed_arrivals, cancelled_flights, diverted_flights],
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
            title: `% of Flights to ${search_dest} (2015-2019)`,
            showlegend: false,
            height: 500,
            width: 500,
        };
        Plotly.newPlot('pie', piechart, layout);

        // Delayed Departures: filter_dcs2
        // Delayed Arrivals: filter_dcs3
        // Cancelled Flights: filter_dcs4
        // Diverted Flights: filter_dcs5
        var filter_dcs2 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month && item.DEP_DEL15 == 1);
        var filter_dcs3 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month && item.ARR_DEL15 == 1);
        var filter_dcs4 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month && item.CANCELLED == 1);
        var filter_dcs5 = delays_causes.filter(item => item.DEST == search_dest && item.MONTH == month && item.DIVERTED == 1);

        var weather_dcs2 = [];
        var NASs_dcs2 = [];
        var security_dcs2 = [];
        var late_aircraft_dcs2 = [];
        var no_cause_dcs2 = [];

        for (var i = 0; i < filter_dcs2.length; i++) {
            if (filter_dcs2[i].WEATHER_DELAY > 0) { weather_dcs2.push(filter_dcs2[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs2[i].NAS_DELAY > 0) { NASs_dcs2.push(filter_dcs2[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs2[i].SECURITY_DELAY > 0) { security_dcs2.push(filter_dcs2[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs2[i].LATE_AIRCRAFT_DELAY > 0) { late_aircraft_dcs2.push(filter_dcs2[i].OP_CARRIER_FL_NUM); }
            else { no_cause_dcs2.push(filter_dcs2[i].OP_CARRIER_FL_NUM); }
        }

        var weather_dcs3 = [];
        var NASs_dcs3 = [];
        var security_dcs3 = [];
        var late_aircraft_dcs3 = [];
        var no_cause_dcs3 = [];

        for (var i = 0; i < filter_dcs3.length; i++) {
            if (filter_dcs3[i].WEATHER_DELAY > 0) { weather_dcs3.push(filter_dcs3[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs3[i].NAS_DELAY > 0) { NASs_dcs3.push(filter_dcs3[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs3[i].SECURITY_DELAY > 0) { security_dcs3.push(filter_dcs3[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs3[i].LATE_AIRCRAFT_DELAY > 0) { late_aircraft_dcs3.push(filter_dcs3[i].OP_CARRIER_FL_NUM); }
            else { no_cause_dcs3.push(filter_dcs3[i].OP_CARRIER_FL_NUM); }
        }
        var weather_dcs4 = [];
        var NASs_dcs4 = [];
        var security_dcs4 = [];
        var late_aircraft_dcs4 = [];
        var no_cause_dcs4 = [];

        for (var i = 0; i < filter_dcs4.length; i++) {
            if (filter_dcs4[i].CANCELLATION_CODE == 'A') { late_aircraft_dcs4.push(filter_dcs4[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs4[i].CANCELLATION_CODE == 'B') { weather_dcs4.push(filter_dcs4[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs4[i].CANCELLATION_CODE == 'C') { NASs_dcs4.push(filter_dcs4[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs4[i].CANCELLATION_CODE == 'D') { security_dcs4.push(filter_dcs4[i].OP_CARRIER_FL_NUM); }
            else { no_cause_dcs4.push(filter_dcs4[i].OP_CARRIER_FL_NUM); }
        }

        //console.log(weather_dcs4);
        //console.log(NASs_dcs4);
        //console.log(late_aircraft_dcs4);
        //console.log(security_dcs4);

        var weather_dcs5 = [];
        var NASs_dcs5 = [];
        var security_dcs5 = [];
        var late_aircraft_dcs5 = [];
        var no_cause_dcs5 = [];

        for (var i = 0; i < filter_dcs5.length; i++) {
            if (filter_dcs5[i].WEATHER_DELAY > 0) { weather_dcs5.push(filter_dcs5[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs5[i].NAS_DELAY > 0) { NASs_dcs5.push(filter_dcs5[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs5[i].SECURITY_DELAY > 0) { security_dcs5.push(filter_dcs5[i].OP_CARRIER_FL_NUM); }
            if (filter_dcs5[i].LATE_AIRCRAFT_DELAY > 0) { late_aircraft_dcs5.push(filter_dcs5[i].OP_CARRIER_FL_NUM); }
            else { no_cause_dcs5.push(filter_dcs5[i].OP_CARRIER_FL_NUM); }
        }

        var allLabels = ['Weather', 'NAS', 'Security', 'Late Aircraft'];

        var allValues = [
            [weather_dcs2.length, NASs_dcs2.length, security_dcs2.length, late_aircraft_dcs2.length],
            [weather_dcs3.length, NASs_dcs3.length, security_dcs3.length, late_aircraft_dcs3.length],
            [weather_dcs4.length, NASs_dcs4.length, security_dcs4.length, late_aircraft_dcs4.length],
            [weather_dcs5.length, NASs_dcs5.length, security_dcs5.length, late_aircraft_dcs5.length]
        ];

        var ultimateColors = [
            ['rgb(72, 139, 194)', 'rgb(64,67,153)', 'rgb(159, 190, 87)', 'rgb(192,192,192)'],
            ['rgb(72, 139, 194)', 'rgb(64,67,153)', 'rgb(159, 190, 87)', 'rgb(192,192,192)'],
            ['rgb(72, 139, 194)', 'rgb(64,67,153)', 'rgb(159, 190, 87)', 'rgb(192,192,192)'],
            ['rgb(72, 139, 194)', 'rgb(64,67,153)', 'rgb(159, 190, 87)', 'rgb(192,192,192)']
        ];

        var data2 = [{
            values: allValues[0],
            labels: allLabels,
            hole: .4,
            type: 'pie',
            name: 'Delayed Departures',
            marker: {
                colors: ultimateColors[0]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'label+percent+name',
            text: "Delayed Departures",
            textposition: "bottom",
            textfont: {
                family: 'sans serif',
                size: 10,
                color: 'rgb(255, 255, 0)'
            },
            automargin: true
        }, {
            values: allValues[1],
            labels: allLabels,
            hole: .4,
            type: 'pie',
            name: 'Delayed Arrivals',
            marker: {
                colors: ultimateColors[1]
            },
            domain: {
                row: 1,
                column: 0
            },
            hoverinfo: 'label+percent+name',
            text: "Delayed Arrivals",
            textposition: "bottom",
            textfont: {
                family: 'sans serif',
                size: 10,
                color: 'rgb(255, 127, 14)'
            },
            automargin: true
        }, {
            values: allValues[2],
            labels: allLabels,
            hole: .4,
            type: 'pie',
            name: 'Cancelled Flights',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 1
            },
            hoverinfo: 'label+percent+name',
            text: "Cancelled Flights",
            textposition: "bottom",
            textfont: {
                family: 'sans serif',
                size: 10,
                color: 'rgb(214, 39, 40)'
            },
            automargin: true
        }, {
            values: allValues[3],
            labels: allLabels,
            hole: .4,
            type: 'pie',
            name: 'Diverted Flights',
            marker: {
                colors: ultimateColors[3]
            },
            domain: {
                x: [0.52, 1],
                y: [0, 0.48]
            },
            hoverinfo: 'label+percent+name',
            text: "Diverted Flights",
            textposition: "bottom",
            textfont: {
                family: 'sans serif',
                size: 10,
                color: 'rgb(148, 103, 189)'
            },
            automargin: true
        }];

        var layout2 = {
            title: '% of Flights (2015-2019)',
            height: 550,
            width: 550,
            location: screenLeft,
            grid: { rows: 2, columns: 2 },
            showlegend: true,
            legend: { "orientation": "h" }
        };
        Plotly.newPlot('donuts', data2, layout2);
    });

}