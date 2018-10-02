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
define(['jquery', 'underscore', 'backbone', 'router', 'js/Proyecto.js', 'js/Galeria.js', 'js/Plantas.js', 'js/Ubicacion.js', 'ssm', 'plugins'],
function($, _, Backbone, Router, Proyecto, Galeria, Plantas, Ubicacion, ssm) {
	
	//init sections
	var view_proyecto = new Proyecto();
	var view_galeria = new Galeria();
	var view_plantas = new Plantas();
	var view_ubicacion = new Ubicacion();
	var ubicacionType;
	
	//MENU
	var menuMobileOpen = false;
	$("header nav").removeClass("cssControlled");
	$("#main_menu > li > a").click(function(){
		if(menuMobileOpen)
			showMobileMenu(false);
	});
	$("#main_menu > li.proyecto a.main-button").click(function(){
		view_proyecto.gotToSlide(0);
		if(menuMobileOpen)
			showMobileMenu(false);
	});
	$("#main_menu > li.proyecto .submenu li").each(function(index){
		$(this).click(function(e){
			var delay = 0;

			if(hash != lastSection)
				backgroundListener()
			if(hash != lastSection)
				delay = 310;

			//
			setTimeout(function(){
				view_proyecto.gotToSlide(index+1);
			}, delay);
			if(menuMobileOpen)
				showMobileMenu(false);
		});
	});
	$("#main_menu > li.galeria a.main-button").click(function(e){
		var tabType = e.target.dataset.type;
		setTimeout(loadSection, 300)
	});
	$("#main_menu > li.galeria .submenu li > a").each(function(index){
		$(this).click(function(e){
			setTimeout(function(){
				loadSection();
				var tabType = e.target.dataset.type;
				if(lastSection === '#renders')
		      		view_galeria.manageTabs( tabType );
		      	else
		      		view_plantas.manageTabs( tabType );
			}, 300);

			if(menuMobileOpen)
				showMobileMenu(false);
		});
	});
	$("#main_menu > li.ubicacion a").click(function(){
		setTimeout(loadSection, 300)
		//loadSection()
	});
	$("#main_menu > li.ubicacion a.main-button, #main_menu > li.ubicacion .submenu li > a").each(function(index){
		$(this).click(function(e){
			var tabType = e.target.dataset.type;
	      	view_ubicacion.setMarkers( tabType );
	      	ubicacionType = tabType;
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
	
	// main page backgrouds
 	$("#bg_container .image").each( function(_index, _target){
		 $(_target).data('index', _index);
	} );
 	$("#bg_container .image").eq(0).addClass('visible').addClass('move');

 	// Load first section
 	var backgroundContainer = window//document.querySelector('#main_wrap');
	var backgroundListener = function(){
		backgroundContainer.removeEventListener('click', backgroundListener);
		loadSection();
	}
 	if(window.location.hash === "#proyecto" || window.location.hash === ""){
		backgroundContainer.addEventListener('click', backgroundListener);
	} else if(window.location.hash === "#ubicacion"){
		window.location = window.location.href.replace(/#ubicacion/, '');
	} else {
		loadSection()
	}

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
	var lastSection = null;
	var hash = (window.location.hash) || "#proyecto";
	function loadSection() {
		var target = null;
		var params = {};
	    hash = (window.location.hash) || "#proyecto";

	    $('header').toggleClass('white', window.location);

	    switch(hash){
		    case "#renders":
		    case "#exteriores":
		    case "#interiores":
		    	hash = '#renders';
		    	target = view_galeria;
		    	$('header').toggleClass('white', true);
		    	break;

		    case "#plantas":
		    case "#360":
		    case "#corte":
		    	hash = '#plantas';
		    	target = view_plantas;
		    	$('header').toggleClass('white', true);
	    		console.log('pasando por aquí con el hash: ', hash)
		    	break;
		    	
		    case "#ubicacion":
		    	target = view_ubicacion;
		    	$('header').toggleClass('white', true);
		    	if(ubicacionType){
		    		params = {type: ubicacionType}
		    	}
		    	break;

		    case "#buro":
		    	// manin page backgrouds
			 	$("#bg_container .image").each( function(_index, _target){
			 		if( _index !== 7 ){
			 			$(_target).removeClass('visible');//stop().delay(400).fadeOut(200)
			 		} else {
						$(_target).addClass('visible');//stop().delay(400).fadeIn(800);
					}
				} );
		    	break;

		    case "#contacto":
		    	// manin page backgrouds
			 	$("#bg_container .image").each( function(_index, _target){
			 		if( _index !== 6 ){
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
	    if(hash != lastSection){
	    	$("section").hide();
  			$(hash).fadeIn(300);
	    }
  		lastSection = hash;
  		
  		//link styles
  		$("#main_menu a").removeClass('active');
  		$("#main_menu a[href='"+hash+"']").addClass('active');
	}

	// LOAD GOOGLE MAPS SDK
	window.initMap = function(){
		view_ubicacion.initMap();
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



