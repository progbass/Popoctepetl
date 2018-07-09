define(['jquery', 'underscore', 'backbone', 'plugins'], function($, _, Backbone){
	//VIEWS
	var ContactoView = Backbone.View.extend({
	
	  //PROPERTIES
      el: 'section#contacto',
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
        {name: 'Bowling Alley', location: {lat: 19.367227, lng: -99.170945}},
        {name: 'Plaza Universidad', location: {lat: 19.367224, lng: -99.165981}},
        {name: 'Instituto México Secundaria', location: {lat: 19.365992, lng: -99.165298}},
        {name: 'Patio Universidad', location: {lat: 19.365841, lng: -99.166642}},
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
        {name: 'Centro deportivo Benito Juárez', location: {lat: 19.371742, lng: -99.159677}},
        {name: 'Parque público Pascual Ortíz Rubio', location: {lat: 19.370866, lng: -99.168794}},
        {name: 'Centro cultural Roberto Cantoral', location: {lat: 19.362027, lng: -99.166368}},
        {name: 'Cineteca Nacional', location: {lat: 19.360684, lng: -99.164730}},
        {name: 'Centro Deportivo Coyoacán', location: {lat: 19.361788, lng: -99.161682}},
      ],
      
      //INITIALIZE
      initialize: function(){
        _.bindAll(this, 'toggleLocationsList');
      },
      
      //RENDER
      render: function (params) {
      	var scope = this;
        this.toggleLocationsList(params.type !== undefined);
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
        this.map = new google.maps.Map(document.querySelector('section#contacto .map_holder'), {
          center: this.targetLocation,
          zoom: 18
        });
        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');

        // Create default marker icon
        var targetMarker = new google.maps.Marker({
          position: this.targetLocation,
          map: this.map,
          icon: '../img/map-location-icon.png'
        })

        // Create all markers on map
        var allMarkers = [this.servicios, this.hospitales, this.sitiosInteres];
        for(var i = 0; i<allMarkers.length; i++){
          var currentMarkerList = allMarkers[i];
          for(var j = 0; j<currentMarkerList.length; j++){
            currentMarkerList[j].marker = new google.maps.Marker({
              position: currentMarkerList[j].location,
              map: this.map,
              icon: 'img/map-marker-a.png',
              label: (j+1).toString(),
            })
            currentMarkerList[j].marker.setMap(null);
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
          default:
            listTitle = 'Servicios';
            this.markers = this.servicios;
            break;
        }

        // Feed locations list and title
        var locationsIndex = $('#contacto .locations-index');
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
        this.map.fitBounds(bounds);
        
        //
        // var listener = google.maps.event.addListener(this.map, "idle", function () {
        //   scope.map.setZoom(18);
        //   google.maps.event.removeListener(listener);
        // });
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
    
    return ContactoView;
});