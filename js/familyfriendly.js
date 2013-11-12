
$(function() {
	FamilyFriendly.initmap();
});

var FamilyFriendly = { 
	map : {},
	jsonObj: [],
	initmap : function () {	
		map = new L.Map('map');	
		// create the tile layer with correct attribution
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © OpenStreetMap contributors';
		var baseLayer = new L.TileLayer(osmUrl, {minZoom: 12, maxZoom: 18, attribution: osmAttrib});		
		
		// start the map in South-East England
		map.setView(new L.LatLng(47.3717,8.5359),12);
		map.addLayer(baseLayer);

        //heatmapLayer.addData(testData.data);

        //console.log(heatmapLayer);
        //{lat: 33.5363, lon:-117.044, value: 1}
        FamilyFriendly.loadJsonIntoHeatmap("json/kinderkrippe.json",1, false, "Kinderkrippe");
        FamilyFriendly.loadJsonIntoHeatmap("json/kinderbetreuung.json",1, false, "Kinderbetreuung");
        FamilyFriendly.loadJsonIntoHeatmap("json/jugendtreff.json",1, false , "Jugendtreff");
        FamilyFriendly.loadJsonIntoHeatmap("json/kindergarden.json",1, false, "Kindergarten");
        FamilyFriendly.loadJsonIntoHeatmap("json/kinderhort.json",1, false, "Kinderhort");
        FamilyFriendly.loadJsonIntoHeatmap("json/spielplatz.json",1, false, "Spielplatz");
        FamilyFriendly.loadJsonIntoHeatmap("json/volksschule.json",1, true, "Volksschule");
        FamilyFriendly.loadJsonIntoHeatmap("json/kinderhaus_eltern_kind_zentrum.json",1, true, "Kinderhaus");



		console.log(FamilyFriendly.jsonObj);
	    
		FamilyFriendly.initMapData();
	},
	initMapData: function(){
		FamilyFriendly.loadMigros();
		FamilyFriendly.loadCoop();
		//FamilyFriendly.loadKinderkrippe();
		//FamilyFriendly.loadKindergarten();
	},
	loadJsonIntoHeatmap: function(json, pointvalue, lastCall, groupName){
		$.getJSON(json, function(data) {
			$.each(data.features, function(i, item) {
				//console.log(item.geometry.coordinates[0]);
				var latlng = new L.LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]);
				//console.log(latlng.lat + " - " + latlng.lng);
				FamilyFriendly.jsonObj.push({lat: latlng.lat, lon: latlng.lng, value:pointvalue});
			});
			
			FamilyFriendly.loadDataToMap(groupName);
			if(lastCall){}
		});
	},
	loadDataToMap: function(groupName){
		var heatmapLayer = L.TileLayer.heatMap({
			radius: { value: 10, absolute: false },
			opacity: 0.5,
			gradient: {
				0.45: "rgb(0,0,255)",
				0.55: "rgb(0,255,255)",
				0.65: "rgb(0,255,0)",
				0.95: "yellow",
				1.0: "rgb(255,0,0)"
			}
		});
		heatmapLayer.setData(FamilyFriendly.jsonObj);
        var overlayMaps = {};
        overlayMaps[groupName] = heatmapLayer;
        

        var controls = L.control.layers(null, overlayMaps, {collapsed: false});
		map.addLayer(heatmapLayer);

		controls.addTo(map);
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
	loadCoop: function(){
		 var migrosIcon = L.icon({
		    iconUrl: 'assets/coop.png',
		});

	    $.getJSON("json/coop.json", function(data) {
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