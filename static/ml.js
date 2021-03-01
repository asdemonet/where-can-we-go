// Name local JSON file to variable
var aa_file = "static/aa_data.json"
var dl_file = "static/dl_data.json"
var wn_file = "static/wn_data.json"

var aa_table_html = '<table border="1" class="dataframe">  <thead>    <tr style="text-align: center;">      <th>ID</th>      <th>COUPONS</th>      <th>PASSENGERS</th>      <th>ROUND TRIP</th>      <th>MILES FLOWN</th>      <th>AMERICAN AIRLINES</th>      <th>DELTA AIRLINES</th>      <th>SOUTHWEST AIRLINES</th> <th id="table-break"></th>     <th>ACTUAL TICKET PRICE ($)</th>    <th>PRICE BIN PREDICTED</th>    </tr>  </thead>  <tbody>    <tr>      <th>11414</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>2450.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>953.0</td>     <td>Average Fare</td>    </tr>    <tr>      <th>261183</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>1796.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>11.0</td>      <td>Average Fare</td>    </tr>    <tr>      <th>89294</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>1292.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>348.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>79787</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>3978.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>566.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>178815</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>842.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>175.0</td>      <td>Average Fare</td>    </tr>    <tr>      <th>168262</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4914.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>563.0</td>      <td>Average Fare</td>    </tr>    <tr>      <th>125407</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>674.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>345.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>256666</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4818.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>242.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>7870</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>2413.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>384.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>85654</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>9544.0</td>      <td>1</td>      <td>0</td>      <td>0</td> <td id="table-break"></td>      <td>1038.0</td>           <td>Average Fare</td>    </tr>  </tbody></table>'
var dl_table_html = '<table border="1" class="dataframe">  <thead>    <tr style="text-align: center;">      <th>ID</th>      <th>COUPONS</th>      <th>PASSENGERS</th>      <th>ROUND TRIP</th>      <th>MILES FLOWN</th>      <th>AMERICAN AIRLINES</th>      <th>DELTA AIRLINES</th>      <th>SOUTHWEST AIRLINES</th> <th id="table-break"></th>     <th>ACTUAL TICKET PRICE ($)</th>    <th>PRICE BIN PREDICTED</th>    </tr>  </thead>  <tbody>    <tr>      <th>38797</th>      <td>3</td>      <td>1.0</td>      <td>1.0</td>      <td>1996.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>527.0</td>     <td>Average Fare</td>    </tr>    <tr>      <th>112967</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4040.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>450.0</td>     <td>Average Fare</td>    </tr>    <tr>      <th>192702</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>3910.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>665.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>3951</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4310.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>11.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>296849</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>2248.0</td>      <td>0</td>      <td>1</td>      <td>0</td>  <td id="table-break"></td>     <td>352.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>189542</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4578.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>253.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>35430</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>862.0</td>      <td>0</td>      <td>1</td>      <td>0</td>  <td id="table-break"></td>     <td>28.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>71044</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>780.0</td>      <td>0</td>      <td>1</td>      <td>0</td>  <td id="table-break"></td>     <td>538.0</td>         <td>Average Fare</td>    </tr>    <tr>      <th>164523</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>854.0</td>      <td>0</td>      <td>1</td>      <td>0</td>  <td id="table-break"></td>     <td>351.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>291689</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>1068.0</td>      <td>0</td>      <td>1</td>      <td>0</td> <td id="table-break"></td>      <td>424.0</td>          <td>Average Fare</td>    </tr>  </tbody></table>'
var wn_table_html = '<table border="1" class="dataframe">  <thead>    <tr style="text-align: center;">      <th>ID</th>      <th>COUPONS</th>      <th>PASSENGERS</th>      <th>ROUND TRIP</th>      <th>MILES FLOWN</th>      <th>AMERICAN AIRLINES</th>      <th>DELTA AIRLINES</th>      <th>SOUTHWEST AIRLINES</th> <th id="table-break"></th>     <th>ACTUAL TICKET PRICE ($)</th>    <th>PRICE BIN PREDICTED</th>    </tr>  </thead>  <tbody>    <tr>      <th>232015</th>      <td>3</td>      <td>1.0</td>      <td>1.0</td>      <td>4791.0</td>      <td>0</td>      <td>0</td>      <td>1</td>  <td id="table-break"></td>     <td>702.0</td>    <td>Average Fare</td>    </tr>    <tr>      <th>58511</th>      <td>3</td>      <td>1.0</td>      <td>1.0</td>      <td>1236.0</td>      <td>0</td>      <td>0</td>      <td>1</td>  <td id="table-break"></td>     <td>299.0</td>      <td>Average Fare</td>    </tr>    <tr>      <th>139841</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>1582.0</td>      <td>0</td>      <td>0</td>      <td>1</td>  <td id="table-break"></td>     <td>269.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>234037</th>      <td>3</td>      <td>1.0</td>      <td>1.0</td>      <td>1606.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>173.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>315135</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>1921.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>292.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>326767</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>1334.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>339.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>221934</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>1088.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>347.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>236360</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>5206.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>11.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>64459</th>      <td>2</td>      <td>1.0</td>      <td>1.0</td>      <td>1174.0</td>      <td>0</td>      <td>0</td>      <td>1</td> <td id="table-break"></td>      <td>509.0</td>       <td>Average Fare</td>    </tr>    <tr>      <th>60355</th>      <td>4</td>      <td>1.0</td>      <td>1.0</td>      <td>4482.0</td>      <td>0</td>      <td>0</td>      <td>1</td>  <td id="table-break"></td>     <td>401.0</td>      <td>Average Fare</td>    </tr>  </tbody></table>'

global_airline_list = []

function init() {
  var airline_list = [];
  d3.json(aa_file).then(function(aa_data){
    //console.log(aa_data)
    var airline_aa = aa_data[0].data[0][0];
    console.log(airline_aa)
    airline_list.push(airline_aa)
    global_airline_list.push(airline_aa)
  }).then(d3.json(dl_file).then(function(dl_data){
    //console.log(dl_data)
    var airline_dl = dl_data[0].data[0][0]
    console.log(airline_dl)
    airline_list.push(airline_dl)
    global_airline_list.push(airline_dl)
  })).then(d3.json(wn_file).then(function(wn_data){
    //console.log(wn_data)
    var airline_wn = wn_data[0].data[0][0]
    console.log(airline_wn)
    airline_list.push(airline_wn)
    global_airline_list.push(airline_wn)
  })).then(console.log(airline_list)
  );
  console.log(airline_list)
  makePlots('AA')
  makeTable('AA')
};

function makePlots(selected_airline) {
  plotted_airline = []
  json_file = []
  switch(selected_airline) {
    case 'AA':
      plotted_airline.push('AA')
      json_file.push(aa_file)
      break;
    case 'DL':
      plotted_airline.push('DL')
      json_file.push(dl_file)
      break;
    default:
      plotted_airline.push('WN')
      json_file.push(wn_file)
  }
  console.log(plotted_airline, json_file);
  d3.json(json_file).then(function(airline_data){
    var sampleData = airline_data[0].data
    //console.log(sampleData)
    miles_flown = []
    itin_fares = []
    coupons = []
    colors = []
    sampleData.forEach(datapoint => {
      miles_flown.push(datapoint[1]);
      itin_fares.push(datapoint[3]);
      coupons.push(datapoint[2]);
    });
    console.log(miles_flown);
    console.log(itin_fares);
    coupons.forEach(item =>{
      switch(item) {
        case item == 1 || 2:
          colors.push('#1f77b4')
          break;
        case item == 3 || 4 :
          colors.push('#ff7f0e')
          break;
        case item == 5 || 6 :
          colors.push('#9467bd')
          break;
        default:
          colors.push('#d62728')
      }
    });
    console.log(colors)

    var scatter_plot_data = [{
      x: miles_flown.slice(0,999),
      y: itin_fares.slice(0,999),
      mode: 'markers',
      marker: {
        size: 5,
        color: colors
      },
      type: 'scatter'
    }];
  
    var scatter_layout = {
      title: 'Itinerary Fare for Airline',
      xaxis: {
        title: 'Miles'
      },
      yaxis: {
        title: 'Price'
      },
      showlegend: false,
      height: 500,
      width: 1200,
    };
  
    Plotly.newPlot("scatter", scatter_plot_data, scatter_layout);
  });
};  

d3.selectAll("#airline-options").on("change", updateData);

function updateData() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#airline-options");
  // Assign the value of the dropdown menu option to a variable
  var new_dataset = dropdownMenu.property("value").slice(0,2);
  makePlots(new_dataset)
  makeTable(new_dataset)
};

function makeTable(selected_airline) {
  d3.select("#prediction-table").html("");
  switch(selected_airline) {
    case 'AA':
      d3.select("#prediction-table").html(aa_table_html);
      break;
    case 'DL':
      d3.select("#prediction-table").html(dl_table_html);
      break;
    default:
      d3.select("#prediction-table").html(wn_table_html);
  };
};

init();