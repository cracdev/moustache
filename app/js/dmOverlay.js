// namespace:
this.DM = this.DM || {};

(function(){
	
	function Overlay(){
	}

	var o = Overlay;
	
	o.panel = (function(){
	
	var $overlay_wrapper;
	var $overlay_panel;
	var isFirstTime = false;
	
	function show(oPlayer) {
	if ( !isFirstTime ){
		$overlay_wrapper = $('<div id="overlay"></div>').appendTo( $('BODY') );
		$overlay_panel = $('<div id="overlay-panel"></div>').appendTo( $overlay_wrapper )	    
		$overlay_panel.html( '<p class="title">'+oPlayer.sGameTitle+'</p>'+'<p class="speed">'+oPlayer.nSpeed+'</p>'+'<a href="#" class="hide-overlay"> > Level Select</a>' );    
		attachEvents();
	}else{
	
		$overlay_panel.html( '<p class="title">'+oPlayer.sGameTitle+'</p>'+'<p class="speed">'+oPlayer.nSpeed+'</p>'+'<a href="#" class="hide-overlay"> > Level Select</a>' );    
		isFirstTime = false;
	} 
	$overlay_wrapper.fadeIn(700);
	}
	function hide() {
		$overlay_wrapper.fadeOut(500);
		DM.Canvas.game.clearGameOver();
	
		$("canvas").remove();
		$("div#scene3").hide();
		$("div#scene2").show();
	}
	function append(oPlayer) {
	
		$overlay_wrapper = $('<div id="overlay"></div>').appendTo( $('BODY') );
		$overlay_panel = $('<div id="overlay-panel"></div>').appendTo( $overlay_wrapper );
		$overlay_panel.html( '<p class="title">'+oPlayer.sGameTitle+'</p>'+'<p class="speed">'+oPlayer.nSpeed+'</p>'+'<a href="#" class="hide-overlay"> > Level Select</a>' );
	}
	function attachEvents() {
		$('A.hide-overlay', $overlay_wrapper).click( function(ev) {
		    ev.preventDefault();
		    hide();
		    
		});
	}
	return {
		show:show,
		hide:hide
	}		
	
	}()); 
	
	DM.Overlay = Overlay;

}()); 