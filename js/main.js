requirejs.config({
    baseUrl: 'js',
	
	paths: {
        "jquery":		'vendor/jquery-1.11.3.min',
        "plugins":		'min/plugins-min',
        "underscore":	'vendor/underscore-min',
        "backbone":		'vendor/backbone-min',
        'ssm':			'vendor/ssm-min',
        "hammer":		'vendor/hammer-min',
        'router':		'min/router-min'
    },
    
    shim: {
    	'plugins': {
    		deps: ['jquery']
        },

    }
});

//
define(['jquery', 'underscore', 'backbone', 'router', 'js/Proyecto.js', 'js/Galeria.js', 'js/Contacto.js', 'ssm', 'plugins'], function($, _, Backbone, Router, Proyecto, Galeria, Contacto, ssm) {
	//init sections
	var view_proyecto = new Proyecto();
	var view_galeria = new Galeria();
	var view_contacto = new Contacto();
	var contactoType;
	
	//MENU
	var menuMobileOpen = false;
	$("header nav").removeClass("cssControlled");
	$("#main_menu > li > a").click(function(){
		if(menuMobileOpen)
			showMobileMenu(false);
	});
	$("#main_menu > li.proyecto .submenu li").each(function(index){
		$(this).click(function(){
			console.log(view_proyecto)
			view_proyecto.gotToSlide(index+1);
			if(menuMobileOpen)
				showMobileMenu(false);
		});
	});
	$("#main_menu > li.galeria .submenu li > a").each(function(index){
		$(this).click(function(e){
			var tabType = e.target.dataset.type;
	      	view_galeria.manageTabs( tabType );
		});
	});
	$("#main_menu > li.contacto .submenu li > a").each(function(index){
		$(this).click(function(e){
			var tabType = e.target.dataset.type;
	      	view_contacto.setMarkers( tabType );
	      	contactoType = tabType;
		});
	});
	$("header a.mobile_icon").click(function(){
		//toggle flag
		if(!menuMobileOpen)
			showMobileMenu(true);
		else
			showMobileMenu(false);
		
		//
		return false;
	});
	$("header").hover(
		function(){},
	
		function(){
			//if menu is open... close it
			if(menuMobileOpen)
				showMobileMenu(false);
				
			//
			return false;
		}
	);
	var showMobileMenu = function( _target ){
		var target = _target;
		
		if(!menuMobileOpen)
			$("header nav").slideDown(560, "easeInOutQuint");
		else
			$("header nav").slideUp(220);
		
		//update flag
		menuMobileOpen = target;
	};
	
	//ROUTER
	var router = new Router();
	Backbone.history.on("all", loadSection);
	
	//load first section
	// manin page backgrouds
 	$("#bg_container .image").eq(0).addClass('visible').addClass('move');
	var backgroundContainer = document.querySelector('#main_wrap');
	var backgroundListener = function(){
		backgroundContainer.removeEventListener('click', backgroundListener);
		loadSection();
	}
	backgroundContainer.addEventListener('click', backgroundListener);
	var introInterval = setTimeout(backgroundListener, 2000);
	
	//STATE MANAGER
	ssm.addState({
		id: 'resize',
		onResize: function(){
			//$("#slideHolder").width( $("#slideHolder").outerWidth() );
			//setupSlider();
			//Router.repositionStep( globals.actualPage );
		}
	});
	ssm.addState({
		id: 'mobile',
	    maxWidth: 681,
	    onEnter: function(){
	        //mobileMode = true;
	        //Router.setMobileMode(true);
	        menuMobileOpen = false;
	        //$("header nav").hide();
	    },
	    onLeave: function(){
	        //mobileMode = false;
	       // Router.setMobileMode(false);
	       menuMobileOpen = false
	       //$("header nav").show();	
	    }
	});
	ssm.ready();
	
	// LOAD SECTION FUNCTION
	function loadSection() {
		var target = null;
		var params = {};
	    var hash = (window.location.hash) || "#proyecto";
	    $('header').toggleClass('white', false);

	    switch(hash){
		    case "#galeria":
		    	target = view_galeria;
		    	$('header').toggleClass('white')
		    	break;
		    	
		    case "#contacto":
		    	target = view_contacto;
		    	$('header').toggleClass('white');
		    	if(contactoType){
		    		params = {type: contactoType}
		    	}
		    	break;

		    case "#buro":
		    	// manin page backgrouds
			 	$("#bg_container .image").each( function(_index, _target){
			 		if( _index !== 5 ){
			 			$(_target).removeClass('visible');//stop().delay(400).fadeOut(200)
			 		} else {
						$(_target).addClass('visible');//stop().delay(400).fadeIn(800);
					}
				} );
		    	break;
		    
		    case "#proyecto":
		    default:
		    	target = view_proyecto;
	    }
	    
	    //render target section
	    if(target)
	    	target.render(params);
	    
	    //show/hide sections
	    $("section").hide();
  		$(hash).fadeIn(300);
  		
  		//link styles
  		$("#main_menu a").removeClass('active');
  		$("#main_menu a[href='"+hash+"']").addClass('active');
	}

	// LOAD GOOGLE MAPS SDK
	window.initMap = function(){
		view_contacto.initMap();
	}
	var gmapsSDK = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZKeqPDUOxBExapt7pR6uwvBWKot6TJSo&callback=initMap";
	$.ajax({
	   url: gmapsSDK,
	   dataType: "script",
	   async: false,
	   success: function(){
	       console.log('script loaded');
	   }
	});
});



