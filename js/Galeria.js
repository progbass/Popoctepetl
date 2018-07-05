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
			$("section#galeria .thumbs_list li").first().click();
		}
    });
    var renders_list = new ThumbsCollection();
    var floors_list = new ThumbsCollection();
    var sideViews_list = new ThumbsCollection();
    var actual_list = null;

	//VIEWS
	var ThumbView = Backbone.View.extend({
		tagName   : 'li',
        template  : null,
        thumbsList: "section#galeria .thumbs_list",
          
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
      el: 'section#galeria',
      lastTab: "",
      tabType: "",
      rendersInit: false,
      floorsInit: false,
      sideViewsInit: false,
      
      //INITIALIZE
      initialize: function(){
      	_.bindAll(this, 'manageTabs', 'configRenders', 'loadRender', 'displayList');
      	
      	this.rendersInit = false;
	    //this.config_accordeon();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	
      	//config accordeon
      	//this.config_accordeon();
      	this.manageTabs("renders");
      	
      	//open default tab
      	if( window.location.hash ){
      		var tab = window.location.hash;
      		switch(tab){
	      		case "#cortes":
	      			tab = "cortes";
	      			break;
	      		case "#renders":
	      			tab = "renders";
	      			break;
	      		case "#plantas":
	      			tab = "plantas";
	      			break;
	      		default:
	      			tab = null;
	      			//break;
      		}
      		
      		//open tab
      		//if(tab)
      			//this.manageTabs(tab);
      	}
	 },
	 
	 //CONFIG RENDERS LIST
	 configRenders: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");
	 	
	 	//update flag
	 	scope.rendersInit = true;
	 	
	 	//load renders list and create a collection from them
	    //renders_list.url = 'renders.json';
	    renders_list.on("add", renders_list.thumbAdd);
	    renders_list.bind('thumbs:selected', function(){scope.loadRender('render')});
	    renders_list.add([
			{
				"uri":		"img/renders/popo_1.jpg",
				"thumb": 	"img/renders/thumbs/denn_1.jpg",
				"showInfo": false
			},
			{
				"uri":		"img/renders/popo_2.jpg",
				"thumb": 	"img/renders/thumbs/denn_2.jpg",
				"showInfo": false
			},
			{
				"uri":		"img/renders/popo_3.jpg",
				"thumb": 	"img/renders/thumbs/denn_3.jpg",
				"showInfo": false
			},
			{
				"uri":		"img/renders/popo_4.jpg",
				"thumb": 	"img/renders/thumbs/denn_4.jpg",
				"showInfo": false
			},
			{
				"uri":		"img/renders/popo_5.jpg",
				"thumb": 	"img/renders/thumbs/denn_5.jpg",
				"showInfo": false
			},
			{
				"uri":		"img/renders/popo_6.jpg",
				"thumb": 	"img/renders/thumbs/denn_6.jpg",
				"showInfo": false
			}	
		]);
		renders_list.loadCompleteHandler();
		/*
	    renders_list.fetch({
	      add: true,
	      success: renders_list.loadCompleteHandler
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
		    	actualIndex = (actualIndex > $("section#galeria .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#galeria .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#galeria .thumbs_list li:eq("+actualIndex+")").click();
		});	
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
				"showInfo": true
			},
			{
				"title":	"Planta 3",
				"uri":		"img/floors/planta3.jpg",
				"thumb": 	"img/floors/thumbs/planta1.jpg",
				"info":     "<p>La planta del nivel 3 fue diseñada para poder contar con un espacio de comercio de doble altura y un segundo piso cubriendo una mayor área de comercio para el edificio de uso de los inquilinos o bien puede eventualmente funcionar como un espacio de apoyo para alguna de las oficinas.</p>",
				"showInfo": true
			},
			{
				"title":	"Planta Tipo",
				"uri":		"img/floors/planta_tipo.jpg",
				"thumb": 	"img/floors/thumbs/planta_tipo.jpg",
				"info":     "<p>Las plantas son sumamente eficientes y libres de columnas para poder tener el mayor espacio abierto de oficinas y las fachadas principales con un diseño que genera de acuerdo a su ubicación una alta eficiencia energética y una muy buena iluminación natural de los espacios.</p>",
				"showInfo": true
			},
			{
				"title":	"Oficinas",
				"uri":		"img/floors/oficinas.jpg",
				"thumb": 	"img/floors/thumbs/roof_garden.jpg",
				"info":     "<p>Cuenta con un total de 14,723 m2 rentables de oficinas corporativas distribuidos en 19 niveles de aproximadamente 886.74 m2 rentables cada uno.</p>",
				"showInfo": true
			},
			{
				"title":	"Estacionamiento",
				"uri":		"img/floors/estacionamiento.jpg",
				"thumb": 	"img/floors/thumbs/estacionamiento.jpg",
				"info":     "<p>Cuenta con 9 sótanos altos y bajos de estacionamiento para cubrir la demanda de las oficinas corporativas y de la zona.</p><p>El diseño cumple con todos los requisitos de dimensiones y operatividad. Todos los sótanos cuentan con dos núcleos de servicios central independientes de la vivienda, tres escaleras internas presurizadas, dos elevadores que dan acceso al lobby del corporativo y dos elevadores que dan acceso al lobby de comercio de la vivienda.</p>",
				"showInfo": true
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
		    	actualIndex = (actualIndex > $("section#galeria .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#galeria .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#galeria .thumbs_list li:eq("+actualIndex+")").click();

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
				"showInfo": true
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
		    	actualIndex = (actualIndex > $("section#galeria .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#galeria .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#galeria .thumbs_list li:eq("+actualIndex+")").click();
		});
	 },
	 
	 //DISPLAY IMAGE AND THUMBNAILS
	 loadRender: function(type){
		 //get container
	 	 var photoHolder = $(this.el).find(".photo_holder");
	 	 var infoHolder = $(this.el).find(".info");
	 	 var imageType = type || 'render';

	 	 //create image 
	 	 var image = new Image();
	 	 image.src = actual_list.selectedThumb().attributes.uri;
	 	 image.alt = actual_list.selectedThumb().attributes.title;
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

	     // show additional information
	     if(actual_list.selectedThumb().attributes.showInfo){
	     	infoHolder.show();
		    if( actual_list.selectedThumb().attributes.title ){
		     	infoHolder.find(".info__title")
		     	.show()
		     	.html( actual_list.selectedThumb().attributes.title );
		    } else {
		     	infoHolder.find(".info__title").hide()
		    }
		    if( actual_list.selectedThumb().attributes.info )
		     	infoHolder.find(".info__content").html( actual_list.selectedThumb().attributes.info );
		 } else {
		 	infoHolder.hide();
		 }
	 },
	 
	 displayList: function(){
	 	//display thumbs from collection
		 actual_list.each(function( item ) {
            actual_list.thumbAdd(item);
        });
        
        //load first thumb
        $("section#galeria .thumbs_list li").first().click();
    },
	 
	 /////////////////////////////////////////////////////////////////
	 manageTabs: function( _target ){
		 var scope = this;
		 var content = "";
		 
		 //return if the user clicked the same tab
		 if(scope.lastTab == _target){
			 return false;
		 }
		 
		 //style menu items
		 $(scope.el).find("a.tab").removeClass("active");
		 $(scope.el).find("a[href='#"+_target+"']").addClass("active");
		 
		 //load tab content
		 switch(_target){
		 	case "cortes":
		 		content = "renders.html";
		 		break;
		 	
		 	case "renders":
		 		content = "renders.html";
		 		break;
		 	
		 	case "plantas":
		 		content = "renders.html";
		 		break;
		 	
		 	default:
		 		content = "renders.html"; 
		 }
		 
		$(scope.el).find(".content_loader").load( content, function() {
		 	if(_target == "renders"){
			 	actual_list = renders_list;
		 		if(!scope.rendersInit)
			 		scope.configRenders();
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

		 	if(_target == "cortes"){
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