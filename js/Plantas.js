define(['jquery', 'underscore', 'backbone', 'hammer'], function($, _, Backbone, Hammer){
	
	//MODELS
	var ThumbModel = Backbone.Model.extend({
	    defaults: {
	        title:  "",
	        uri:	"",
	        thumb:	"",
	        state:	""
	    },
	    
	    select: function(state){
			this.set({'state': state ? 'selected' : ''});
		}
	});

	//COLLECTIONS
	var ThumbsCollection = Backbone.Collection.extend({
        model: ThumbModel,
        initialize : function(){},
        
        select: function(model){
		    if( this.selectedThumb() ){
		      this.selectedThumb().select(false);
		    }
		    this.selected = model;
		    this.selected.select(true);
		    this.trigger('thumbs:selected');
		},
		selectedThumb: function(){
		    return this.selected;
		},
		
		thumbAdd: function(item){
			//create and render thumbnail view
			var myItemView = new ThumbView({model:item});
		    myItemView.render();
		},
		
		loadCompleteHandler: function(){
			$("section#plantas .thumbs_list li").first().click();
		}
    });
    var panoramics_list = new ThumbsCollection();
    var floors_list = new ThumbsCollection();
    var sideViews_list = new ThumbsCollection();
    var actual_list = null;

	//VIEWS
	var ThumbView = Backbone.View.extend({
		tagName   : 'li',
        template  : null,
        thumbsList: "section#plantas .thumbs_list",
          
        initialize : function(){
            //slide template
            this.template = _.template("<img src='<%= thumb %>' alt='<%= title %>' />");
        },
        render : function(){
        	//generate html template
            $(this.el).html( this.template( this.model.toJSON() ) );
            
            //display view
            $(this.thumbsList).append( this.el );
            
            return this;
        },
        events: {
		    "click" : "selectThumb"
		},
		
		selectThumb: function(){
			$(this.thumbsList+" li").removeClass('selected');
			$(this.el).addClass('selected');
			
			$(this.thumbsList+" li").each(function( index, target){
				if( $(target).hasClass('selected') ){
					actualIndex = index;
					return;
				}
			});
			
			//
	    	actual_list.select(this.model);
	    	return false;
	    }
	});
			
	var GaleriaView = Backbone.View.extend({
	
	  //PROPERTIES
      el: 'section#plantas',
      lastTab: "",
      tabType: "",
      currentSlide: 0,
      rendersInit: false,
      floorsInit: false,
      sideViewsInit: false,
      officeFloors_list: [
      	{
      		file: 'img/floors/pisos/floor-18.jpg',
      		floor_name: '18',
      		disabled: false,
      	},
      	{
      		file: 'src',
      		floor_name: '17',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '16',
      		disabled: true,
      	},
      	{
      		file: 'img/floors/pisos/floor-15.jpg',
      		floor_name: '15',
      		disabled: false,
      	},
      	{
      		file: 'src',
      		floor_name: '14',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '13',
      		disabled: true,
      	},
      	{
      		file: 'img/floors/pisos/floor-12.jpg',
      		floor_name: '12',
      		disabled: false,
      	},
      	{
      		file: 'src',
      		floor_name: '11',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '10',
      		disabled: true,
      	},
      	{
      		file: 'img/floors/pisos/floor-9.jpg',
      		floor_name: '9',
      		disabled: false,
      	},
      	{
      		file: 'src',
      		floor_name: '8',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '7',
      		disabled: true,
      	},
      	{
      		file: 'img/floors/pisos/floor-6.jpg',
      		floor_name: '6',
      		disabled: false,
      	},
      	{
      		file: 'src',
      		floor_name: '5',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '4',
      		disabled: true,
      	},
      	{
      		file: 'src',
      		floor_name: '3',
      		disabled: true,
      	}
      ],
      
      //INITIALIZE
      initialize: function(){
      	_.bindAll(this, 'nextSlide', 'prevSlide', 'manageTabs', 'openModal', 'configPanoramics', 'loadRender', 'displayList');
      	this.currentSlide = 0;
      	this.rendersInit = false;
	    //this.config_accordeon();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	var tab = 'plantas';

      	//open default tab
      	if( window.location.hash ){
      		switch(tab){
	      		case "#corte":
	      			tab = "corte";
	      			break;
	      		case "#plantas":
	      			tab = "plantas";
	      			break;
	      		case "#360":
	      			tab = "360";
	      			break;
      		}
      	}
      	
      	//config
      	this.manageTabs(tab);
	 },
	 
	 //CONFIG RENDERS LIST
	 openModal: function(floor){
	 	var modalbox = $(this.el).find(".modalbox");
	 	var toggleBox = function(){
	 		modalbox.off();
	 		modalbox.hide();
	 	}
	 	modalbox.find('.overlay').click(toggleBox);
	 	var imageContainer = modalbox.find('img');
	 	imageContainer.attr('src', floor.file);
	 	var container = modalbox.find('.container');
	 	modalbox.find('.image_holder').find('.prev').click(function(){
		 	var x = container.scrollLeft()-250//((coso.width() / 2)) - coso.scrollLeft();
		    container.animate({
		      scrollLeft: x
		    });
		});
		modalbox.find('.image_holder').find('.next').click(function(){
		 	var x = container.scrollLeft()+250//((coso.width() / 2)) + coso.scrollLeft();
		    container.animate({
		      scrollLeft: x
		    });
		});
	 	imageContainer[0].onload =  function(){
	 		// Load Drag library
	 	// 	(function (d, s, id){
			// 	let js, fjs = d.getElementsByTagName(s)[0];
			// 	if (d.getElementById(id)) {return;}
			// 	js = d.createElement(s); js.id = id;
			// 	js.src = "bower_components/dragscroll/dragscroll.js";
			// 	fjs.parentNode.insertBefore(js, fjs);
	 	// 		js.onload = function(){
	 	// 			//alert('asdasd')
	 	// 		}
			// }(document, 'script', 'dragscroll'));
		}
	 	modalbox.show();
	 },
	 configPanoramics: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");
	 	var modalbox = $(scope.el).find(".modalbox");
	 	modalbox.hide();

	 	//update flag
	 	scope.panoramicsInit = true;
	 	
	 	//load renders list and create a collection from them
	    //panoramics_list.url = 'renders.json';
	    panoramics_list.on("add", panoramics_list.thumbAdd);
	    panoramics_list.bind('thumbs:selected', function(){scope.loadRender('render')});
	    panoramics_list.add([
			{
				"uri":		"img/floors/360.png",
				"thumb": 	"img/renders/thumbs/denn_10.jpg",
				"title":    "Exteriores",
				"showInfo": true,
				"colorCode": {
					gray: 'Área de Oficinas',
					orange: 'Vistas Disponibles',
				}
			}	
		]);
		panoramics_list.loadCompleteHandler();	
	 },
	 
	 //CONFIG FLOORS LIST
	 configFloors: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");

	 	//update flag
	 	scope.floorsInit = true;
	 	
	 	//load renders list and create a collection from them
	    //floors_list.url = 'floors.json';
	    floors_list.on("add", floors_list.thumbAdd);
	    floors_list.bind('thumbs:selected', function(){scope.loadRender('floor')});
	    floors_list.add([
			{
				"title":	"Planta Baja",
				"uri":		"img/floors/planta_baja.jpg",
				"thumb": 	"img/floors/thumbs/planta_baja.jpg",
				"info":     "<p>Cuenta con un acceso peatonal directo sobre Av. Popocatépetl así como por la plaza interior del desarrollo. De igual manera para la entrada y salida vehicular.</p><p>En planta baja, se cuenta con una bahía de ascenso y descenso además de control de accesos, vestíbulo, espacio de oficinas, áreas de servicios y elevadores para sótanos de estacionamiento y pisos de oficina.</p>",
				"showInfo": true,
				"colorCode": {
					gray: 'Lobby de Oficinas',
					gray2: 'Comercio',
					green: 'Circulaciones',
					beige: 'Lobby de Vivienda'
				}
			},
			{
				"title":	"Planta 3",
				"uri":		"img/floors/planta3.jpg",
				"thumb": 	"img/floors/thumbs/planta1.jpg",
				"info":     "<p>La planta del nivel 3 fue diseñada para poder contar con un espacio de comercio de doble altura y un segundo piso cubriendo una mayor área de comercio para el edificio de uso de los inquilinos o bien puede eventualmente funcionar como un espacio de apoyo para alguna de las oficinas.</p>",
				"showInfo": true,
				"colorCode": {
					gray: 'Área de Oficinas',
					blue: 'Servicios',
					green: 'Circulaciones',
					beige: 'Área de Vivienda'
				}
			},
			{
				"title":	"Planta Tipo",
				"uri":		"img/floors/planta_tipo.jpg",
				"thumb": 	"img/floors/thumbs/planta_tipo.jpg",
				"info":     "<p>Las plantas son sumamente eficientes y libres de columnas para poder tener el mayor espacio abierto de oficinas y las fachadas principales con un diseño que genera de acuerdo a su ubicación una alta eficiencia energética y una muy buena iluminación natural de los espacios.</p>",
				"showInfo": true,
				"colorCode": {
					gray: 'Área de Oficinas',
					blue: 'Servicios',
					green: 'Circulaciones',
					beige: 'Área de Vivienda'
				}
			},
			{
				"title":	"Oficinas",
				"uri":		"img/floors/oficinas.jpg",
				"thumb": 	"img/floors/thumbs/roof_garden.jpg",
				"info":     "<p>Cuenta con un total de 14,723 m2 rentables de oficinas corporativas distribuidos en 19 niveles de aproximadamente 886.74 m2 rentables cada uno.</p>",
				"showInfo": true,
				"colorCode": {
					gray: 'Área de Oficinas',
					blue: 'Servicios',
					green: 'Circulaciones'
				}
			},
			{
				"title":	"Estacionamiento",
				"uri":		"img/floors/estacionamiento.jpg",
				"thumb": 	"img/floors/thumbs/estacionamiento.jpg",
				"info":     "<p>Cuenta con 9 sótanos altos y bajos de estacionamiento para cubrir la demanda de las oficinas corporativas y de la zona.</p><p>El diseño cumple con todos los requisitos de dimensiones y operatividad. Todos los sótanos cuentan con dos núcleos de servicios central independientes de la vivienda, tres escaleras internas presurizadas, dos elevadores que dan acceso al lobby del corporativo y dos elevadores que dan acceso al lobby de comercio de la vivienda.</p>",
				"showInfo": true,
				"colorCode": {
					blue: 'Bodegas',
					green: 'Circulaciones Verticales'
				}
			}
		]);

		floors_list.loadCompleteHandler();
		/*
	    floors_list.fetch({
	      add: true,
	      success: floors_list.loadCompleteHandler
	      //error: loadCompleteHandler
	    });
		*/
	    
	    //config swipe detection and actions
		Hammer.Swipe({
			velocity: 8,
			threshold: 18
		})
		var hammertime = new Hammer( this.el );
		hammertime.on('swipe', function(ev) {
			if( ev.direction == 2){
		    	actualIndex++;
		    	actualIndex = (actualIndex > $("section#plantas .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#plantas .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#plantas .thumbs_list li:eq("+actualIndex+")").click();
		});
	 },

	 //CONFIG FLOORS LIST
	 configSideViews: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");
	 	
	 	//update flag
	 	scope.sideViewsInit = true;
	 	
	 	//load renders list and create a collection from them
	    //floors_list.url = 'floors.json';
	    sideViews_list.on("add", sideViews_list.thumbAdd);
	    sideViews_list.bind('thumbs:selected', function(){scope.loadRender('floor')});
	    sideViews_list.add([
			{
				"title":	"Corte Longitudinal",
				"uri":		"img/floors/corte_longitudinal.jpg",
				"thumb": 	"img/floors/thumbs/corte_longitudinal.jpg",
				"info":     "",
				"showInfo": true,
				"colorCode": {
					gray: 'Área de Oficinas',
					green: 'Estacionamiento',
					beige: 'Área de Vivienda'
				}
			}
		]);
		sideViews_list.loadCompleteHandler();
		
	    //config swipe detection and actions
		Hammer.Swipe({
			velocity: 8,
			threshold: 18
		})
		var hammertime = new Hammer( this.el );
		hammertime.on('swipe', function(ev) {
			if( ev.direction == 2){
		    	actualIndex++;
		    	actualIndex = (actualIndex > $("section#plantas .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#plantas .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#plantas .thumbs_list li:eq("+actualIndex+")").click();
		});
	 },
	 
	 //DISPLAY IMAGE AND THUMBNAILS
	 loadRender: function(type){
	 	var selectedThumb = actual_list.selectedThumb();

		 //get container
	 	 var photoHolder = $(this.el).find(".photo_holder .images_display");
	 	 var infoHolder = $(this.el).find(".info");
	 	 var imageType = type || 'render';

	 	 //create image 
	 	 var image = new Image();
	 	 image.src = selectedThumb.attributes.uri;
	 	 image.alt = selectedThumb.attributes.title;
	 	 image.onload = function(){
	 	 	var isHorizontal = this.height < this.width;
	 	 	var className = isHorizontal ? 'horizontal' : 'vertical';
	 	 	this.className = className+' '+imageType;
	 	 	photoHolder.removeClass('loading');
	 	 };
	 	 
	 	 //display image
	 	 photoHolder.addClass('loading');
		 photoHolder.html( image );
	     photoHolder.find("img").hide().fadeIn(600);

	  	// // show additional information
	  	// if(selectedThumb.attributes.showInfo){
	  	// 		infoHolder.show();
		 //    if( selectedThumb.attributes.title ){
		 //     	infoHolder.find(".info__title")
		 //     	.show()
		 //     	.html( selectedThumb.attributes.title );
		 //    } else {
		 //     	infoHolder.find(".info__title").hide()
		 //    }
		 //    if( selectedThumb.attributes.info )
		 //     	infoHolder.find(".info__content").html( selectedThumb.attributes.info );
		 // } else {
		 // 	infoHolder.hide();
		 // }

		 //
		 var colorCodesContainer = $(this.el).find('.color-codes');
		 var colorCodes = selectedThumb.attributes.colorCode;
		 if(colorCodes){
		 	colorCodesContainer.show();
		 	var codesContent =  '';
		 	var codesList = colorCodesContainer.find('ol');
		 	for(var i = 0; i < Object.keys(colorCodes).length; i++){
		 		codesContent += "<li class='code "+Object.keys(colorCodes)[i]+"' >"+colorCodes[Object.keys(colorCodes)[i]]+"</li>";
		 	}
		 	codesList.html(codesContent);
		} else {
		 	colorCodesContainer.hide()
		}
	},
	 
	displayList: function(){
	 	//display thumbs from collection
		 actual_list.each(function( item ) {
            actual_list.thumbAdd(item);
        });
        
        //load first thumb
        $("section#plantas .thumbs_list li").first().click();
    },

    nextSlide: function(){
    	this.currentSlide++;
    	if(this.currentSlide > actual_list.length-1){
    		this.currentSlide = 0;
    	}
    	$("section#plantas .thumbs_list li").eq(this.currentSlide).click();
    	return false;
    },
    prevSlide: function(){
    	this.currentSlide--;
    	if(this.currentSlide < 0){
    		this.currentSlide = actual_list.length-1;
    	}
    	$("section#plantas .thumbs_list li").eq(this.currentSlide).click();
    	return false;
    },
	 
	 /////////////////////////////////////////////////////////////////
	 manageTabs: function( _target ){
		 var scope = this;
		 var content;
		 
		 //return if the user clicked the same tab
		 if(scope.lastTab == _target){
			 return false;
		 }

		 //
		 //var gallery = $(scope.el).find(".gallery");
	 	 //gallery.removeEventListener('click', scope.openModal);

		 //style menu items
		 $(scope.el).find("a.tab").removeClass("active");
		 $(scope.el).find("a[href='#"+_target+"']").addClass("active");
		 
		 // Find matching template according to tab
		 switch(_target){
		 	case "corte":
		 		content = "corte.html";
		 		break;
		 	
		 	case "plantas":
		 		content = "plantas.html";
		 		break;

		 	case "360":
		 		content = "360.html";
		 		break;
		 	
		 	default:
		 		content = "plantas.html"; 
		}
		
		// load tab content
		$(scope.el).find(".content_loader").load( content, function() {
		 	$(scope.el).find("a.next").click(scope.nextSlide);
			$(scope.el).find("a.prev").click(scope.prevSlide);

		 	if(_target == "360"){
			 	actual_list = panoramics_list;

		      	// disable modalbox
			 	var gallery = $(scope.el).find(".gallery");
			 	var modalbox = $(scope.el).find(".modalbox");
			 	modalbox.hide();
			 	gallery.off();

			 	// Clone 'floor' buttons
			 	var i = 0;
			 	$.each(scope.officeFloors_list, function (key, value) {
				    var $floor = $(scope.el).find(".floor-area .floor.template").clone();
				    $floor.removeClass("template");
				    $floor.find("span").html(value.floor_name);
				    $floor.index = i;

				    // Insert element into DOM
				    $(scope.el).find(".floor-area").append( $floor );

				    // Position element
				    setTimeout(function(){
					    this.css('top', (this.index * 6.25)+'%');
					    this.toggleClass('disabled', value.disabled);
					    if(!value.disabled){
					    	this.click(function(){
					    		scope.openModal(value);
					    	});
					    }
					}.bind($floor), 200);

					//
					i++;
				});

			 	// Show view
		 		if(!scope.panoramicsInit)
			 		scope.configPanoramics();
			 	else
			 		scope.displayList();
		 	}
		 	
		 	if(_target == "plantas"){
			 	actual_list = floors_list;
		 		if(!scope.floorsInit)
			 		scope.configFloors();
			 	else
			 		scope.displayList();
		 	}

		 	if(_target == "corte"){
			 	actual_list = sideViews_list;
		 		if(!scope.sideViewsInit)
			 		scope.configSideViews();
			 	else
			 		scope.displayList();
		 	}
		});
		 
		//update last tab
		scope.lastTab = _target;
	 },
      
      //EVENTS
      events: {
	      "click a.tab": function(e){
	      		this.tabType = $(e.currentTarget).attr("href").replace('#', '');
	      		this.manageTabs( this.tabType );
	      		return false;
	      }
      }
    });
    
    return GaleriaView;
});