define(["jquery","underscore","backbone","plugins"],function($,o,e){var n=!1,t=function(o){$("section").hide(),$(o).fadeOut(0).fadeIn(1220),$.scrollTo(0),$("#main_menu a").removeClass("active"),$("#main_menu a[href='"+o+"']").addClass("active")},a=function(o){n=o||!0},c=e.Router.extend({routes:{"":"proyecto",proyecto:"proyecto",galeria:"galeria",contacto:"contacto",buro:"buro"},proyecto:function(){},galeria:function(){},contacto:function(){},buro:function(){}});return e.history.start(),c});