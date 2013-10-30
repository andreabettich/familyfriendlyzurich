
$(function() {
	FamilyFriendly.initmap();
});

var FamilyFriendly = { 
	map : {},
	initmap : function () {	
		map = new L.Map('map');	
		// create the tile layer with correct attribution
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © OpenStreetMap contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 18, attribution: osmAttrib});		

		// start the map in South-East England
		map.setView(new L.LatLng(47.3717,8.5359),12);
		map.addLayer(osm);
		FamilyFriendly.initMapData();
	},
	initMapData: function(){
		FamilyFriendly.loadMigros();
		FamilyFriendly.loadKinderkrippe();
		FamilyFriendly.loadKindergarten();
	},
	loadMigros: function(){
		 var migrosIcon = L.icon({
		    iconUrl: 'assets/migros.png',
		});

	    $.getJSON("json/migros.json", function(data) {
	        var points = L.geoJson(data.features, {
	            pointToLayer: function(feature, latlng) {
	                return new L.marker(latlng, {icon: migrosIcon}).addTo(map);
	            }
	        });
	        points.addTo(map);
	    });
	},
	loadKinderkrippe: function(){
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
	},
	loadKindergarten: function(){
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
	}
}