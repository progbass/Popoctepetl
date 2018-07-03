// Filename: router.js
define(['jquery', 'underscore', 'backbone', 'plugins'], function($, _, Backbone){

 
  var mobileMode = false;
  
  var gotoSection = function( _section ){
  		$("section").hide();
  		$(_section).fadeOut(0).fadeIn(1220);
  		
  		//scroll to top
  		$.scrollTo(0);
  		
  		//link styles
  		$("#main_menu a").removeClass('active');
  		$("#main_menu a[href='"+_section+"']").addClass('active');
  };
  
  
  
  var setMobileMode = function( _mode ){
	  mobileMode = _mode || true;
  }

  
  
  
  var AppRouter = Backbone.Router.extend({
        routes: {
          "": "proyecto", 
          "proyecto": "proyecto",
          "galeria": "galeria",
          "contacto": "contacto",
          "buro": "buro"
        },
        
        
        proyecto: function(){
	       // gotoSection('#proyecto');
        },
        galeria: function(){
	        //gotoSection('#galeria');
        },
        contacto: function(){
	        //gotoSection('#contacto');
        },
        buro: function(){
	        //gotoSection('#buro');
        }
  });
  
  //HISTORY OBJECT
  Backbone.history.start();
  
  
  return AppRouter;
  
  
});

		
		
		
		
		