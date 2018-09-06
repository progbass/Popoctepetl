define(['jquery', 'underscore', 'backbone', 'plugins'], function($, _, Backbone){
	//VIEWS
	var UbicacionView = Backbone.View.extend({
	
	  //PROPERTIES
      el: 'section#ubicacion',
      targetLocation: {lat: 19.365496, lng: -99.165800},
      markers: [],
      map: null, 
      infowindow: null,
      servicios: [
        {name: 'Pabellón del Valle', location: {lat: 19.373492, lng: -99.162379}},
        {name: 'Universidad Latinoamericana', location: {lat: 19.372827, lng: -99.167235}},
        {name: 'Sanborns', location: {lat: 19.369793, lng: -99.171307}},
        {name: 'Sams Club Universidad', location: {lat: 19.369663, lng: -99.164200}},
        {name: 'Walmart Universidad', location: {lat: 19.368657, lng: -99.164119}},
        {name: 'Plaza Universidad', location: {lat: 19.367224, lng: -99.165981}},
        {name: 'Instituto México Secundaria', location: {lat: 19.365992, lng: -99.164898}},
        {name: 'Patio Universidad', location: {lat: 19.365841, lng: -99.166942}},
        {name: 'Centro Coyoacán', location: {lat: 19.359798, lng: -99.170062}}
      ],
      hospitales: [
        {name: 'bios medical center', location: {lat: 19.372071, lng: -99.166329}},
        {name: 'ISSTE', location: {lat: 19.372684, lng: -99.171231}},
        {name: 'IMSS', location: {lat: 19.368437, lng: -99.171671}},
        {name: 'Hospital San José', location: {lat: 19.363968, lng: -99.169536}},
        {name: 'Hospital General Xoco', location: {lat: 19.360123, lng: -99.162272}}
      ],
      sitiosInteres: [
        {name: 'Bowling Alley', location: {lat: 19.367227, lng: -99.170945}},
        {name: 'Centro deportivo Benito Juárez', location: {lat: 19.371742, lng: -99.159677}},
        {name: 'Parque público Pascual Ortíz Rubio', location: {lat: 19.370866, lng: -99.168794}},
        {name: 'Centro cultural Roberto Cantoral', location: {lat: 19.362027, lng: -99.166368}},
        {name: 'Cineteca Nacional', location: {lat: 19.360684, lng: -99.164730}},
        {name: 'Centro Deportivo Coyoacán', location: {lat: 19.361788, lng: -99.161682}},
      ],
      vialidades: [
        {name: 'Insurgentes', location: {lat: 19.373847, lng: -99.178892}},
        {name: 'Av. Emiliano Zapata', location: {lat: 19.367222, lng: -99.159076}},
        {name: 'Av. Popocatépetl', location: {lat: 19.362353, lng: -99.157219}},
        {name: 'Av. México-Coyoacán', location: {lat: 19.360328, lng: -99.163197}},
        {name: 'Av. División del Norte', location: {lat: 19.364939, lng: -99.155208}},
        {name: 'Av. Dr José María Vertiz', location: {lat: 19.373491, lng: -99.154389}},
        {name: 'Av. Universidad', location: {lat: 19.376384, lng: -99.161279}},
        {name: 'Av. Río Churubusco', location: {lat: 19.357964, lng: -99.157191}},
        {name: 'Calzada de Tlalpan', location: {lat: 19.362202, lng: -99.142705}},
      ],
      
      //INITIALIZE
      initialize: function(){
        _.bindAll(this, 'toggleLocationsList');
      },
      
      //RENDER
      render: function (params) {
      	var scope = this;
        this.toggleLocationsList(params.type !== undefined);
        // var listener = google.maps.event.addListener(this.map, "idle", function () {
        //   scope.map.setZoom(18);
        //   google.maps.event.removeListener(listener);
        // });
    	},

      toggleLocationsList: function(force){
        if(force != undefined){
          // Force display state
          if(force){
            $(this.el).find('.locations-index').show()
          } else {
            $(this.el).find('.locations-index').hide()
          }
        } else {
          // TODO: Add toggle behaviour
        }
      },

      initMap: function(){
        var scope = this;

        // Info Window
        this.infowindow = new google.maps.InfoWindow();

        // Create Gmaps instance
        var styledMapType = new google.maps.StyledMapType([
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ],
        {name: 'Styled Map'});
        this.map = new google.maps.Map(document.querySelector('section#ubicacion .map_holder'), {
          center: this.targetLocation,
          zoom: 17
        });
        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');

        // Create default marker icon
        var targetMarker = new google.maps.Marker({
          position: this.targetLocation,
          map: this.map,
          icon: 'img/map-location-icon.png'
        })

        // Create all markers on map
        var allMarkers = [this.vialidades, this.servicios, this.hospitales, this.sitiosInteres];
        for(var i = 0; i<allMarkers.length; i++){
          var currentMarkerList = allMarkers[i];
          for(var j = 0; j<currentMarkerList.length; j++){
            currentMarkerList[j].marker = new google.maps.Marker({
              position: currentMarkerList[j].location,
              map: this.map,
              icon: 'img/map-marker-a.png',
              label: {text: (j+1).toString(), color: "white"}
            })
            currentMarkerList[j].marker.setMap(null);
            currentMarkerList[j].marker.index = j;
            currentMarkerList[j].marker.addListener('mouseover', function() {
              $(scope.el).find('.locations-index .location').eq(this.index).addClass('active')
            });
            currentMarkerList[j].marker.addListener('mouseout', function() {
              $(scope.el).find('.locations-index .location').eq(this.index).removeClass('active')
            });
          }
        }
        //setMarkers('servicios');
      },

      setMarkers: function(type){
        var listTitle = '',
        locationsList = '';;

        // Remove all previous markers from the map
        this.deleteMarkers();

        // Show/hide locations list
        this.toggleLocationsList(true);

        // Select target list
        switch(type){
          case 'hospitales':
            listTitle = 'Hospitales';
            this.markers = this.hospitales;
            break;
          case 'sitiosInteres':
            listTitle = 'Sitios de Interés';
            this.markers = this.sitiosInteres;
            break;
          case 'servicios':
            listTitle = 'Servicios';
            this.markers = this.servicios;
            break;
          case 'vialidades':
            listTitle = 'Principales Vialidades';
            this.markers = this.vialidades;
            break;
          case 'home':
          default:
            listTitle = 'Popocatépetl 526';
            this.markers = [];
        }

        // Feed locations list and title
        var locationsIndex = $('#ubicacion .locations-index');
        locationsIndex.find('.title').html(listTitle);
        for(var i = 0; i < this.markers.length-1; i++){
          locationsList += '<li class=\'location\' >'+this.markers[i].name+'</li>';
        }
        locationsIndex.find('.list').html(locationsList);

        // Set marker icons on map
        this.setMarkersOnMap(this.map);
      },

      setMarkersOnMap: function(map){
        var scope = this;
        var bounds = new google.maps.LatLngBounds();
        
        if(this.markers.length){
          for (var i = 0; i < this.markers.length-1; i++) {
            var marker = this.markers[i].marker;
            marker.setMap(map);
            bounds.extend(marker.position);
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                scope.infowindow.setContent(scope.markers[i].name);
                scope.infowindow.open(scope.map, marker);
              }
            })(marker, i));
          }
          this.map.fitBounds(bounds, 0);
          this.map.panToBounds(bounds);
        } else {
          this.map.setCenter(this.targetLocation);
        }
      },

      deleteMarkers: function(){
        for (var i = 0; i < this.markers.length; i++) {
          var marker = this.markers[i].marker;
          marker.setMap(null);
        }
        this.markers = [];
      },
      
      //EVENTS
      events: {
	      "click a.tab": function(e){
		      this.manageTabs($(e.currentTarget).attr("href").replace('#', ''))
	      }
      }
    });
    
    return UbicacionView;
});