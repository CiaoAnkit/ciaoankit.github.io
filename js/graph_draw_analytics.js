google.charts.load('current', {
'packages':['geochart'],
// Note: you will need to get a mapsApiKey for your project.
// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

google.charts.setOnLoadCallback(drawRegionsMap);

function get_json() {
//return $.getJSON('./files/analytics_report.json');
return $.getJSON('https://api.allorigins.win/raw?&url=https://www.math.unipd.it/~gangwal/analytics_report.json');

}

function drawRegionsMap() {
$.when(get_json()).then(function (data) {
  var temp_array = [["Country", "Sessions"]];

  var html = '<table id="analytics_table"><tr><th>Country</th><th>Sessions</th></tr>';

  $.each(data , function (key, value){
    if (key !== '(not set)'){
      var temp_item = [key, eval(value)];
      temp_array.push(temp_item);
      html += '<tr><td>' + key + '</td><td>' + eval(value) + '</td></tr>';
    }
  });
  
  var CountryData = google.visualization.arrayToDataTable(temp_array);
  
  html += '</table>';
  $("#global_analytics_area_text").empty();
  $("#global_analytics_area_text").append(html);

  var options = {
    colorAxis: {colors: ['#C1D6B7', '#009628']}, //['#FF5F6D','ED4264', '#BB0048']},
    backgroundColor: '#81D4FA',
    datalessRegionColor: '#FFFFFF',
    defaultColor: '#F0F0F0',
    keepAspectRatio: true,
    legend: {textStyle: {fontName: 'Lato', color: '#000000', fontSize: 14}},
    tooltip: {textStyle: {fontName: 'Lato', color: '#000000', fontSize: 14, showColorCode: true}},
    };

  var chart = new google.visualization.GeoChart(document.getElementById('global_analytics_area_graph'));

  chart.draw(CountryData, options);
}); 
}

/*
// Redraw graphs upon window resizing
var curDimension = $(window).width() * $(window).height();
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      var newDimension = $(window).width() * $(window).height();
      var compDiff = Math.abs((newDimension-curDimension)/curDimension);
      //console.log(curDimension, newDimension, compDiff);
      if (compDiff>0.05){//when the change is > 5%
        drawRegionsMap();
        curDimension = newDimension;
      }
    }, 500); //time before calling the resize function is called.
});
*/

//Redraw graphs upon window resizing
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      drawRegionsMap();
    }, 500);
});