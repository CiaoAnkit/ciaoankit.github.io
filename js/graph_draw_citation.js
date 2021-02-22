// Define animation variables
var anim_time = 2000;
var anim_effect = 'out';
var anim_start = true;

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);

function get_json() {
//return $.getJSON('./files/citations_report.json');
return $.getJSON('https://api.allorigins.win/raw?&url=https://www.math.unipd.it/~gangwal/citations_report.json');

}

document.getElementById("nextbtn").addEventListener("click", () => {
	var readStatus = eval(localStorage.getItem("graph-storage"));
	localStorage.setItem("graph-storage", ++readStatus);
	var newStatus = eval(localStorage.getItem("graph-storage"));
	if (newStatus === 4){
		localStorage.setItem("graph-storage", 1);
	}
	drawMultSeries();
});

document.getElementById("prevbtn").addEventListener("click", () => {
	var readStatus = eval(localStorage.getItem("graph-storage"));
	localStorage.setItem("graph-storage", --readStatus);
	var newStatus = eval(localStorage.getItem("graph-storage"));
	if (newStatus === 0){
		localStorage.setItem("graph-storage", 3);
	}
	drawMultSeries();
});

function drawMultSeries() {
$.when(get_json()).then(function (data) {
	//console.log(data);
	var savedGraph = (localStorage.getItem("graph-storage") === null) ? 1 : localStorage.getItem("graph-storage");
	//localStorage.setItem("graph-storage", savedGraph);
	s_doc = eval(data.scopus_documents);
	s_cit = eval(data.scopus_citations);
	s_hin = eval(data.scopus_hindex);
	g_doc = eval(data.google_documents);
	g_cit = eval(data.google_citations);
	g_hin = eval(data.google_hindex);
    //console.log(savedGraph);
    if (eval(savedGraph) === 1) {
        var data = google.visualization.arrayToDataTable([
		['', 'Google', 'Scopus'],
		['Citations', g_cit, s_cit]
		]);
		localStorage.setItem("graph-storage", 1); //save to local storage
    } 

    if (eval(savedGraph) === 2) {
        var data = google.visualization.arrayToDataTable([
		['', 'Google', 'Scopus'],
		['Papers', g_doc, s_doc]
		]);
		localStorage.setItem("graph-storage", 2); //save to local storage
    }

    if (eval(savedGraph) === 3) {
        var data = google.visualization.arrayToDataTable([
		['', 'Google', 'Scopus'],
		['h-index', g_hin, s_hin]
		]);
		localStorage.setItem("graph-storage", 3); //save to local storage
    }

    var options = {
	    title: '',
	    fontName: 'Lato',
	    fontSize: 14,
	    bars: 'vertical',
	    backgroundColor: '#ffffff',
	    animation:{ duration: anim_time, easing: anim_effect, startup: anim_start },
	    chartArea:{width:"83%", left:"15%"},
	    bar: {groupWidth: "50%"},
	    colors: ['#E32B2B', '#238A0C'], //'#E32B2B', '#238A0C', '#2958E6'
	    legend: { position: 'top', maxLines: 1, alignment: 'center' },
	    hAxis: {
			textStyle: {color: '#000000'},
			titleTextStyle: {color: '#000000'},
			gridlines: {color: '#000000'}
	  		},
  		vAxis: {
			textStyle: {color: '#000000', format : 'decimal'},
			gridlines: {color: '#000000'}
	  		}
  	};
	options.vAxis.format = 'decimal';

	var chart = new google.visualization.ColumnChart(
	document.getElementById('citations_chart'));
  	chart.draw(data, options);
  	anim_time = 1000;
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
        drawMultSeries();
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
      drawMultSeries();
    }, 500);
});