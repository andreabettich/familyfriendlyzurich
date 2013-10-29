$(function() {
	 var map;
	var ajaxRequest;
	var plotlist;
	var plotlayers=[];

	var geojsonFeature;
	function initmap() {
		// set up the map
		map = new L.Map('map');

		// create the tile layer with correct attribution
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});		

		// start the map in South-East England
		map.setView(new L.LatLng(47.3717,8.5359),12);
		map.addLayer(osm);		

		var clusters = new L.MarkerClusterGroup({showCoverageOnHover: false, zoomToBoundsOnClick:true});

	    $.getJSON("json/kindergarden.json", function(data) {
	        var points = L.geoJson(data.features, {
	            pointToLayer: function(feature, latlng) {
	                var marker = L.marker(latlng);
	                clusters.addLayer(marker);
	                return clusters;
	            }
	        });
	    });
	    clusters.addTo(map);

	   	var clusters2 = new L.MarkerClusterGroup({showCoverageOnHover: false, zoomToBoundsOnClick:true});

	    $.getJSON("json/kinderkrippe.json", function(data) {
	        var points = L.geoJson(data.features, {
	            pointToLayer: function(feature, latlng) {
	                var marker = L.marker(latlng);
	                clusters2.addLayer(marker);
	                return clusters2;
	            }
	        });
	    });
	    clusters2.addTo(map);	
	}

	function loadGeoJson(){
		$.get('json/kindergarden.json', function (data) {
			alert(data);
			geojsonFeature = data;	
		});

		alert(geojsonFeature);
	}
	//loadGeoJson();
	initmap();
});