define(['jquery', 'underscore', 'backbone', 'plugins'], function($, _, Backbone){
	//VIEWS
	var ContactoView = Backbone.View.extend({
	
	  //PROPERTIES
      el: 'section#contacto',
      
      //INITIALIZE
      initialize: function(){
      	//_.bindAll(this, 'nextSlide', 'prevSlide', 'gotToSlide');
	    //this.config_accordeon();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	
      	
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