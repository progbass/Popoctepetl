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
        
        initialize : function(){
	        
        },
        
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
    var actual_list = null;
    
    
    




	//VIEWS
	var ThumbView = Backbone.View.extend({
		tagName   : 'li',
        template   : null,
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
			//console.log( this.el );
			
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
      
      //INITIALIZE
      initialize: function(){
      	_.bindAll(this, 'manageTabs', 'configRenders', 'loadRender', 'displayList');
      	
      	this.rendersInit = false;
	    //this.config_accordeon();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	
      	
      	//
      	
      	//config accordeon
      	//this.config_accordeon();
      	this.manageTabs("renders");
      	
      	//open default tab
      	if( window.location.hash ){
      		var tab = window.location.hash;
      		
      		switch(tab){
	      		case "#recorrido":
	      			tab = "recorrido";
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
	    renders_list.bind('thumbs:selected', scope.loadRender);
	    renders_list.add([
			{
				"title":	"Render 1",
				"uri":		"img/renders/denn_1.jpg",
				"thumb": 	"img/renders/thumbs/denn_1.jpg"
			},
			{
				"title":	"Render 2",
				"uri":		"img/renders/denn_2.jpg",
				"thumb": 	"img/renders/thumbs/denn_2.jpg"
			},
			{
				"title":	"Render 3",
				"uri":		"img/renders/denn_3.jpg",
				"thumb": 	"img/renders/thumbs/denn_3.jpg"
			},
			
			
			
			{
				"title":	"Render 4",
				"uri":		"img/renders/denn_4.jpg",
				"thumb": 	"img/renders/thumbs/denn_4.jpg"
			},
			{
				"title":	"Render 5",
				"uri":		"img/renders/denn_5.jpg",
				"thumb": 	"img/renders/thumbs/denn_5.jpg"
			},
		
		
		
			{
				"title":	"Render 6",
				"uri":		"img/renders/denn_6.jpg",
				"thumb": 	"img/renders/thumbs/denn_6.jpg"
			},
			{
				"title":	"Render 7",
				"uri":		"img/renders/denn_7.jpg",
				"thumb": 	"img/renders/thumbs/denn_7.jpg"
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
	    floors_list.bind('thumbs:selected', scope.loadRender);
	    floors_list.add([
			{
				"title":	"Planta-1",
				"uri":		"img/floors/planta1.jpg",
				"thumb": 	"img/floors/thumbs/planta1.jpg"
			},

			{
				"title":	"Estacionamiento",
				"uri":		"img/floors/estacionamiento.jpg",
				"thumb": 	"img/floors/thumbs/estacionamiento.jpg"
			},

			{
				"title":	"Planta Baja",
				"uri":		"img/floors/planta_baja.jpg",
				"thumb": 	"img/floors/thumbs/planta_baja.jpg"
			},
			
			{
				"title":	"Planta Tipo",
				"uri":		"img/floors/planta_tipo.jpg",
				"thumb": 	"img/floors/thumbs/planta_tipo.jpg"
			},
			
			
			{
				"title":	"Roof Garden",
				"uri":		"img/floors/roof_garden.jpg",
				"thumb": 	"img/floors/thumbs/roof_garden.jpg"
			},
			{
				"title":	"Corte Transversal",
				"uri":		"img/floors/corte_transversal.jpg",
				"thumb": 	"img/floors/thumbs/corte_transversal.jpg"
			},
			{
				"title":	"Corte Longitudinal",
				"uri":		"img/floors/corte_longitudinal.jpg",
				"thumb": 	"img/floors/thumbs/corte_longitudinal.jpg"
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
	 
	 
	 
	 
	 //DISPLAY IMAGE AND THUMBNAILS
	 loadRender: function(){
		 //get container
	 	 var photoHolder = $(this.el).find(".photo_holder");
	 	 
	 	 //create image 
	 	 var image = new Image();
	 	 image.src = actual_list.selectedThumb().attributes.uri;
	 	 image.alt = actual_list.selectedThumb().attributes.title;
	 	 image.onload = function(){
		 	
	 	 	photoHolder.removeClass('loading');
	 	 };
	 	 
	 	 //display image
	 	 photoHolder.addClass('loading');
		 photoHolder.html( image );
	     photoHolder.find("img").hide().fadeIn(600);

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
		 	case "recorrido":
		 		content = "recorrido.html";
		 		break;
		 	
		 	case "renders":
		 		content = "renders.html";
		 		break;
		 	
		 	case "plantas":
		 		content = "renders.html";
		 		break;
		 	
		 	default:
		 		content = "recorrido.html"; 
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