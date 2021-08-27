require([
	"esri/Map",
	"esri/views/MapView",
	"esri/widgets/Expand",
	"esri/widgets/BasemapGallery",
	"esri/layers/FeatureLayer",
	"esri/widgets/LayerList",
	"esri/widgets/Search",
	"esri/widgets/ScaleBar",
	"esri/widgets/Track",
	
	"dojo/domReady!"
	
	],function (Map, MapView, Expand, BasemapGallery, FeatureLayer, LayerList, Search, ScaleBar, Track) {
	
	
	
	// Feature Layer URLS	
	var RouteLayerURL = "https://maps.slcgov.com/mapservice/rest/services/MapServices/bikeRoutes/MapServer/1";
	var RouteLayer2URL = "https://maps.slcgov.com/mapservice/rest/services/MapServices/bikeRoutes/MapServer/2"; 
	var RouteLayer3URL = "https://maps.slcgov.com/mapservice/rest/services/MapServices/cityBoundary/MapServer/0";
	
	var mainmap = new Map ({
		basemap: "topo-vector"
	});
	
	var mainview = new MapView ({
		container: "myMap",
		center: [-111.8783167,40.7685994],
		zoom: 10.5,
		map: mainmap
	});
	
	var RouteLayerURL = new FeatureLayer ({
		url: RouteLayerURL
	});
	mainmap.add(RouteLayerURL);
	
	var RouteLayer2URL = new FeatureLayer ({
		url: RouteLayer2URL
	});
	mainmap.add(RouteLayer2URL);
	
	var RouteLayer3URL = new FeatureLayer ({
		url: RouteLayer3URL
	});
	mainmap.add(RouteLayer3URL);
	
	
	const basemapGallery = new BasemapGallery ({
		view: mainview,
		container: "basemaps",
		
	});
	mainview.ui.add(basemapGallery, "bottom-right");

	
	//Add Legend
	const layerList = new LayerList ({
		view: mainview,
		listItemCreatedFunction: function (event){
			const item = event.item;
			item.panel ={
				content: "legend",
				open: false
			};
		}
	});
	mainview.ui.add(layerList, "top-right");
	
	
	var searchWidget = new Search({
        view: mainview
		
    });

      // Add the search widget to the top left corner of the view
      mainview.ui.add(searchWidget, {
        position: "top-left"
      });
	
	var scaleBar = new ScaleBar({
		view: mainview,
		style: "ruler"
	  });
	  // Add widget to the bottom left corner of the view
	  mainview.ui.add(scaleBar, {
		position: "bottom-left"
	  });
	  
	var track = new Track({
        view: mainview
      });
      mainview.ui.add(track, "top-left");

      // The sample will start tracking your location
      // once the view becomes ready
      mainview.when(function() {
        track.stop();
      });
	  
	  
	//Create popups templates
	var template = {
		title: "Trail",
		content: "<p>{Route_Name} <br><a href=http://www.bikeslc.com/ target=_blank> More Info </a></p>"
	};
	RouteLayerURL.popupTemplate = template;

	var template = {
		content: "<p>{Route_Type}</p>"
	};
	RouteLayer2URL.popupTemplate = template;

	var template = {
		content: "<p>{Subject}</p>"
	};
});



