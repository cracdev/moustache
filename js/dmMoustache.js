// namespace:
this.DM = this.DM || {};

(function(){

	function Moustache(){
		
	}
	var m = Moustache;
	m.core = (function(){
		
		var Scene1 = $('div#scene1'),
			Scene2 = $('div#scene2'),
			Scene3 = $('div#scene3'),
			Scene4 = $('div#scene4')
			createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
			createjs.Sound.registerSound("audio/tick.ogg", "tick");
			createjs.Sound.registerSound("audio/shoot.ogg", "shoot");
			createjs.Sound.registerSound("audio/bgSnd.ogg", "bgSnd");
			createjs.Sound.registerSound("audio/spin.ogg", "lspin");
					
		function init() {
			console.log("Call Scene1");
			scene1();
			
		}
		
		function sPlay(vSong){
			return createjs.Sound.play(vSong);
		}
		
		/**
		* @Scene1
		**/
		function scene1() {
		
			var startButton =$("div#playerSelect"),
				helpButton = $('a.help-btn');
			
			startButton.click(function(){
				Scene1.hide();
				Scene2.show();
				scene2();
				sPlay("tick");
				return false;
			});
			helpButton.click(function(){
				Scene1.hide();
				Scene4.show();
				scene4();
				sPlay("tick");
				return false;
			});
		}
		/**
		* @Scene2
		**/
		function scene2() {
		
			var Manager = DM.Level.manager;
			var Prepare = DM.Level.prepare;
			var lFactory = new Prepare.LevelFactory();
			
			var lEasy = lFactory.createLevel({
				//name : 'Carlos Alvarado',
				difficulty : 'easy',
				kills : 2,
			});
			var lNormal = lFactory.createLevel({
				difficulty : 'normal',
				kills : 5,
			});
			var lHard = lFactory.createLevel({
				difficulty : 'hard',
				kills : 8,
			});
			
			var lExptr = lFactory.createLevel({
				difficulty : 'expert',
				kills : 9,
			});
		
			Manager.addLevel(lEasy);
			Manager.addLevel(lNormal);
			Manager.addLevel(lHard);
			Manager.addLevel(lExptr);
			Manager.buildUI();
			scene3();		
		
		}
		function scene3(){
		
			var canvasLink = $('canvas');
			
			$(document).on('keydown', function(e) {
				if (e.keyCode == 32) { // 32 is the letter Ss on the keyboard
					console.log("I press the SPEBAR");
					DM.Canvas.game.shootPlayer();
				}
			});
		}
		function scene4(){
			var closeBtn = $('a.close-btn');
			closeBtn.click(function(){
				Scene4.hide();
				Scene1.show();
				sPlay("tick");
				return false;
			});
		}
		
		return {
			init:init
		}
	
	}());
	DM.Moustache = Moustache;	
}());