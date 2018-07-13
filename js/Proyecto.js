define(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
	//VIEWS
	var ProyectoView = Backbone.View.extend({
	
	  //PROPERTIES
      el: 'section#proyecto',
      slide: 0,
      
      //INITIALIZE
      initialize: function(){
      	_.bindAll(this, 'nextSlide', 'prevSlide', 'gotToSlide');

		//confid indo slider
	    this.config_slider();  
      },
      
      //RENDER
      render: function () {
      	var scope = this;
      	this.config_slider();
      	this.gotToSlide(0);
	 },
	 
	 //SLIDER
	 config_slider: function(){
	 	var scope = this;
	 	
	 	//console.log( $(this.el).find(".slider .slide").length)
		$(scope.el).find(".slider .slide").each( function(_index, _target){
			 //update slider size
			 //$(scope.el).find(".slider").width( (100 * (_index+1)) + "%");
			 
			 //update slide width
			 //var target = $(_target);
			 //target.width( (100/$(scope.el).find(".slider .slide").length)+"%" );
		} );
	 },
	 
	 nextSlide: function(){
	 	 this.slide++;
		 this.gotToSlide( this.slide );
		 return false;

	 },
	 prevSlide: function(){
	 	 this.slide--;
		 this.gotToSlide( this.slide );
		 return false;

	 },
	 
	 gotToSlide: function( _target ){
		 var scope = this;
		 scope.slide =  _target;//Math.min(Math.max(parseInt(_target), 0), $(scope.el).find(".slider .slide").length - 1);

		 // eval navigation settings
		 $(scope.el).find("a.next").show();
		 $(scope.el).find("a.prev").show();
		 if(scope.slide >= $(scope.el).find(".slider .slide").length - 1){
			 $(scope.el).find("a.next").fadeOut();
		 }
		 if(scope.slide <= 0){
			 $(scope.el).find("a.prev").fadeOut();
		 }

		 //automatic height
		 $(scope.el).find(".slider").animate({
		 	'height': $(scope.el).find(".slider .slide:nth-child("+(scope.slide+1)+")").outerHeight(true)
		 }), 160, "easeInOutSine";
		 
		 // aimate slide
		 $(scope.el).find(".slider").animate({
		 	left: (-(scope.slide * 100)) + "%"
		 }, 620, "easeInOutQuart");

		// change main page backgroud
	 	$("#bg_container .image").each( function(_index, _target){
	 		if( scope.slide+1 != $(_target).data('index')){
	 			$(_target).removeClass('visible');//stop().delay(400).fadeOut(200)
	 		} else {
				$(_target).addClass('visible');//stop().delay(400).fadeIn(800);
			}
		} );
	 },
      
      //EVENTS
      events: {
	      "click a.prev": "prevSlide",
	      "click a.next": "nextSlide"
      }
    });
    
    return ProyectoView;
});