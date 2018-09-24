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
        {name: 'Pabellón del Valle', time: '', location: {lat: 19.373492, lng: -99.162379}},
        {name: 'Universidad Latinoamericana', time: '', location: {lat: 19.372827, lng: -99.167235}},
        {name: 'Sanborns', time: '', location: {lat: 19.369793, lng: -99.171307}},
        {name: 'Sams Club Universidad', time: '', location: {lat: 19.369663, lng: -99.164200}},
        {name: 'Walmart Universidad', time: '', location: {lat: 19.368657, lng: -99.164119}},
        {name: 'Plaza Universidad', time: '', location: {lat: 19.367224, lng: -99.165981}},
        {name: 'Instituto México Secundaria', time: '', location: {lat: 19.365992, lng: -99.164898}},
        {name: 'Patio Universidad', time: '', location: {lat: 19.365841, lng: -99.166942}},
        {name: 'Centro Coyoacán', time: '', location: {lat: 19.359798, lng: -99.170062}}
      ],
      hospitales: [
        {name: 'bios medical center', time: '', location: {lat: 19.372071, lng: -99.166329}},
        {name: 'ISSTE', time: '', location: {lat: 19.372684, lng: -99.171231}},
        {name: 'IMSS', time: '', location: {lat: 19.368437, lng: -99.171671}},
        {name: 'Hospital San José', time: '', location: {lat: 19.363968, lng: -99.169536}},
        {name: 'Hospital General Xoco', time: '', location: {lat: 19.360123, lng: -99.162272}}
      ],
      sitiosInteres: [
        {name: 'Bowling Alley', time: '', location: {lat: 19.367227, lng: -99.170945}},
        {name: 'Centro deportivo Benito Juárez', time: '', location: {lat: 19.371742, lng: -99.159677}},
        {name: 'Parque público Pascual Ortíz Rubio', time: '', location: {lat: 19.370866, lng: -99.168794}},
        {name: 'Centro cultural Roberto Cantoral', time: '', location: {lat: 19.362027, lng: -99.166368}},
        {name: 'Cineteca Nacional', time: '', location: {lat: 19.360684, lng: -99.164730}},
        {name: 'Centro Deportivo Coyoacán', time: '', location: {lat: 19.361788, lng: -99.161682}},
      ],
      vialidades: [
        {name: 'Insurgentes', time: '22min.', location: {lat: 19.369198, lng: -99.180551}},
        {name: 'Av. Emiliano Zapata', time: '11min.', location: {lat: 19.367222, lng: -99.159076}},
        {name: 'Av. Popocatépetl', time: '1min.', location: {lat: 19.364011, lng: -99.161071}},
        {name: 'Av. México-Coyoacán', time: '5min.', location: {lat: 19.369376, lng: -99.163453}},
        {name: 'Av. División del Norte', time: '17min.', location: {lat: 19.364939, lng: -99.155208}},
        {name: 'Av. Dr José María Vertiz', time: '', location: {lat: 19.369273, lng: -99.155363}},
        {name: 'Av. Universidad', time: '3min.', location: {lat: 19.364971, lng: -99.168366}},
        {name: 'Av. Río Churubusco', time: '13min.', location: {lat: 19.358716, lng: -99.169117}}
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
        var tempList = allMarkers;
        for(var i = 0; i<allMarkers.length; i++){
          tempList[i] = allMarkers[i];
          var currentMarkerList = tempList[i];
          for(var j = 0; j<currentMarkerList.length; j++){
            currentMarkerList[j].window = new google.maps.InfoWindow({
              content: currentMarkerList[j].time
            });

            currentMarkerList[j].marker = new google.maps.Marker({
              position: currentMarkerList[j].location,
              map: this.map,
              icon: 'img/map-marker-a.png',
              label: {text: (j+1).toString(), color: "white"}
            })
            currentMarkerList[j].marker.setMap(null);
            currentMarkerList[j].marker.section = i;
            currentMarkerList[j].marker.index = j;
            currentMarkerList[j].marker.addListener('mouseover', function() {
              var obj =  tempList[this.section][this.index];
              if(obj.time !== '') obj.window.open(scope.map, this);
              $(scope.el).find('.locations-index .location').eq(this.index).addClass('active')
            });
            currentMarkerList[j].marker.addListener('mouseout', function() {
              tempList[this.section][this.index].window.close();
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