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
			$("section#renders .thumbs_list li").first().click();
		}
    });
    var interiores_list = new ThumbsCollection();
    var exteriores_list = new ThumbsCollection();
    var sideViews_list = new ThumbsCollection();
    var actual_list = null;

	//VIEWS
	var ThumbView = Backbone.View.extend({
		tagName   : 'li',
        template  : null,
        thumbsList: "section#renders .thumbs_list",
          
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
      el: 'section#renders',
      lastTab: "",
      tabType: "",
      currentSlide: 0,
      interioresInit: false,
      exterioresInit: false,
      sideViewsInit: false,
      
      //INITIALIZE
      initialize: function(){
      	_.bindAll(this, 'nextSlide', 'prevSlide', 'manageTabs', 'interioresRenders', 'loadRender', 'displayList');
      	this.currentSlide = 0;
      	this.interioresInit = false;
	    //this.config_accordeon();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	var tab = 'exteriores';
      	
      	//open default tab
      	if( window.location.hash ){
      		//tab = window.location.hash;
      		switch(tab){
	      		case "#interiores":
	      			tab = "interiores";
	      			break;
	      		case "#exteriores":
	      			tab = "exteriores";
	      			break;
      		}
      	}
      	
      	//config
      	this.manageTabs(tab);
	 },
	 
	 //CONFIG RENDERS LIST
	 interioresRenders: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");
	 	
	 	//update flag
	 	scope.interioresInit = true;
	 	
	 	//load renders list and create a collection from them
	    //interiores_list.url = 'renders.json';
	    interiores_list.on("add", interiores_list.thumbAdd);
	    interiores_list.bind('thumbs:selected', function(){scope.loadRender('render')});
	    interiores_list.add([
			{
				"uri":		"img/renders/popo_8.jpg",
				"thumb": 	"img/renders/thumbs/denn_8.jpg",
				"title":    "Interiores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_9.jpg",
				"thumb": 	"img/renders/thumbs/denn_9.jpg",
				"title":    "Interiores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_10.jpg",
				"thumb": 	"img/renders/thumbs/denn_10.jpg",
				"title":    "Interiores",
				"showInfo": true
			}	
		]);
		interiores_list.loadCompleteHandler();
		/*
	    interiores_list.fetch({
	      add: true,
	      success: interiores_list.loadCompleteHandler
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
		    	actualIndex = (actualIndex > $("section#renders .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#renders .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#renders .thumbs_list li:eq("+actualIndex+")").click();
		});	
	 },
	 
	 //CONFIG FLOORS LIST
	 exterioresRenders: function(){
	 	var scope = this;
	 	var gallery = $(scope.el).find(".gallery");
	 	
	 	//update flag
	 	scope.exterioresInit = true;
	 	
	 	//load renders list and create a collection from them
	    //exteriores_list.url = 'floors.json';
	    exteriores_list.on("add", exteriores_list.thumbAdd);
	    exteriores_list.bind('thumbs:selected', function(){scope.loadRender('floor')});
	    exteriores_list.add([
			{
				"uri":		"img/renders/popo_1.jpg",
				"thumb": 	"img/renders/thumbs/denn_1.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_1b.png",
				"thumb": 	"img/renders/thumbs/denn_1b.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_2.jpg",
				"thumb": 	"img/renders/thumbs/denn_2.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_2b.jpg",
				"thumb": 	"img/renders/thumbs/denn_2b.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_4.jpg",
				"thumb": 	"img/renders/thumbs/denn_4.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_5.jpg",
				"thumb": 	"img/renders/thumbs/denn_5.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_6.jpg",
				"thumb": 	"img/renders/thumbs/denn_6.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_7.jpg",
				"thumb": 	"img/renders/thumbs/denn_7.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_7b.jpg",
				"thumb": 	"img/renders/thumbs/denn_7b.jpg",
				"title":    "Exteriores",
				"showInfo": true
			},

			{
				"uri":		"img/renders/popo_3.jpg",
				"thumb": 	"img/renders/thumbs/denn_3.jpg",
				"title":    "Plaza Central",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_13.jpg",
				"thumb": 	"img/renders/thumbs/denn_13.jpg",
				"title":    "Plaza Central",
				"showInfo": true
			},
			{
				"uri":		"img/renders/popo_14.jpg",
				"thumb": 	"img/renders/thumbs/denn_14.jpg",
				"title":    "Plaza Central",
				"showInfo": true
			},
		]);

		exteriores_list.loadCompleteHandler();
		/*
	    exteriores_list.fetch({
	      add: true,
	      success: exteriores_list.loadCompleteHandler
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
		    	actualIndex = (actualIndex > $("section#renders .thumbs_list li").length) ? 0 : actualIndex;
		    } else if( ev.direction == 4 ){
			    actualIndex--;
			    actualIndex = (actualIndex < 0) ? $("section#renders .thumbs_list li").length : actualIndex;
		    }
	    
		    //select thumb
		    $("section#renders .thumbs_list li:eq("+actualIndex+")").click();

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
	 },
	 
	 displayList: function(){
	 	//display thumbs from collection
		 actual_list.each(function( item ) {
            actual_list.thumbAdd(item);
        });
        
        //load first thumb
        $("section#renders .thumbs_list li").first().click();
    },

    nextSlide: function(){
    	this.currentSlide++;
    	if(this.currentSlide > actual_list.length-1){
    		this.currentSlide = 0;
    	}
    	$("section#renders .thumbs_list li").eq(this.currentSlide).click();
    	return false;
    },
    prevSlide: function(){
    	this.currentSlide--;
    	if(this.currentSlide < 0){
    		this.currentSlide = actual_list.length-1;
    	}
    	$("section#renders .thumbs_list li").eq(this.currentSlide).click();
    	return false;
    },
	 
	 /////////////////////////////////////////////////////////////////
	 manageTabs: function( _target ){
		var scope = this;
		var content = "renders.html"; 
		 
		//return if the user clicked the same tab
		if(scope.lastTab == _target){
			return false;
		}
		 
		//style menu items
		$(scope.el).find("a.tab").removeClass("active");
		$(scope.el).find("a[href='#"+_target+"']").addClass("active");
		
		// load tab content
		$(scope.el).find(".content_loader").load( content, function() {
		 	$(scope.el).find("a.next").click(scope.nextSlide);
			$(scope.el).find("a.prev").click(scope.prevSlide);

			// $(scope.el).find(".interiores").click(scope.nextSlide);
			// $(scope.el).find(".exteriores").click(scope.prevSlide);

		 	if(_target == "interiores"){
			 	actual_list = interiores_list;
		 		if(!scope.interioresInit)
			 		scope.interioresRenders();
			 	else
			 		scope.displayList();
		 	}
		 	
		 	if(_target == "exteriores"){
			 	actual_list = exteriores_list;
		 		if(!scope.exterioresInit)
			 		scope.exterioresRenders();
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