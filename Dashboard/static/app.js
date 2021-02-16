// Use the D3 libary to read in "RDUCurrentFlights.json" file.  
// Add list of Destinations to drop down menu.

d3.json("RDUCurrentDestinations.json").then(function (data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var option = d3.select("#Destination").append("option").text(data[i].DEST_CITY_NAME);
        console.log(option);
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


d3.selectAll("#Price").on("change", optionChanged); on("submit", optionChanged);
d3.selectAll("#Destination").on("change", optionChanged);
d3.selectAll("#Date").on("change", optionChanged).on("submit", optionChanged);

function optionChanged() {
    //d3.event.preventDefault();
    var dropdownoptions = d3.select("#Destination");
    var destination = dropdownoptions.property("value");
    var priceElement = d3.select("#Price");
    var price = priceElement.property("value");
    var dateElement = d3.select("#Date");
    var date = dateElement.property("value"); //having issues with storing selected date as a variable.
    console.log(destination);
    console.log(price);
    console.log(date);//having issues with this.

    search_dest = [];

    d3.json("RDUCurrentDestinations.json").then(function (data) {
        //console.log(data);
        var destData = data
        //console.log(destData)
        var search = destData.filter(dest => dest.DEST_CITY_NAME == destination);
        console.log(search);
        var airport = search[0].DEST;
        console.log(airport);
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
    // Add airlines and flight numbers to FLIGHT INFO BOX - format should be as a table
    d3.json("RDUCurrentFlights.json").then(function (data2) {


    });
    // Extract, calculate and graph delay causes (%) as bar graph to FLIGHT DELAY INFO BOX. 
    d3.json("ALB_2015_2019_Delay_Causes_TEST.json").then(function (data3) {

    });

};




