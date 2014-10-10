// namespace:
this.DM = this.DM || {};

(function(){
	
	function Level(){
	
	}
	var l = Level;

	l.manager = (function(){
		
			var levelOrder=[],
			sActiveLevel;
			
					
		function addLevel(objVar){
			levelOrder.push(objVar);
			return levelOrder;
		}
		function removeLevels(objVar) { 
			levelOrder.slice(objVar);
			return levelOrder;
		}
		function resetLevels(){ 
			levelOrder=[];
		}
		function buildUI(){
			var levelHolder = $("div.level-select"),
				mlevels,
				nlevel =1,
				mName,
				mUrl,
				mPic,
				mSpectsSpeed,
				mSpectsKills,
				mSpectsVitality,
				mBtn,
				mSpects = '';
			
			for (var i=0;i<levelOrder.length;i=i+1){
				nlevel = "level"+(i+1);
				nUrl = '<a href="http://www.google.com/search?q='+levelOrder[i].sName+'&tbm=isch" target="blank">'+levelOrder[i].sName+'</a>'
				mName = '<div class="mName">'+nUrl+'</div>';   
				mPic = '<div class="mPicture"><img src="'+levelOrder[i].sPicture+'" alt="Moustache"></div>';
				mSpectsSpeed = '<li><div class="sName">Speed</div><div class="sValue">'+levelOrder[i].nSpeed+'</div></li>';
				mSpectsKills = '<li><div class="sName">Kills</div><div class="sValue">'+levelOrder[i].nKills+'</div></li>';
				mSpectsVitality ='<li><div class="sName">Vitality</div><div class="sValue">'+levelOrder[i].nVitality+'</div></li>';
				mSpects = '<ul class="mSpects">'+mSpectsSpeed + mSpectsKills + mSpectsVitality+'</ul>';   
				mdifficulty = '<div class="difficulty '+levelOrder[i].sDifficulty+'"></div>';	
				mBtn = '<div id="'+nlevel+'" class="btn play"><img src="images/btn-play-label.png" alt="Play" width="46" height="22"></div>';
				mlevels = $('<div/>', {
					class: nlevel,
					html: mName + mPic + mSpects + mdifficulty + mBtn 
				});
				if(nlevel!='level1'){
					mlevels.hide();
				}else{
					sActiveLevel = nlevel;
				}
				levelHolder.append(mlevels);
			}//end for
			
			bindUIActions();	    	  
		}
		
		function bindUIActions() {
			
			var playButton = $('div.play');
			var prevButton = $('a.lprev-btn');
			var nextButton = $('a.lnext-btn');
			var levelIndicator= $('div.levelNum');
			var currentLevel = $('div.'+sActiveLevel);
			var nCurrentLevel = sActiveLevel.slice(5,6);
			var nTotalLevels =  levelOrder.length;
			var scene2 = 	$('div#scene2');
			var scene3	=   $('div#scene3');
			var s = {	'nSpeed' : '',
						'nVitality' : '',
						'nKills':'',
						'nPic' : ''
			}
			levelIndicator.html(nCurrentLevel+'/'+nTotalLevels);
		
			playButton.on("click", function() {
				
				var sBtnName = $(this).parent().attr('class');
				var nIndex = sBtnName.slice(5,6);
				s.nSpeed = levelOrder[nIndex-1].nSpeed;
				s.nKills = levelOrder[nIndex-1].nKills;
				s.nVitality = levelOrder[nIndex-1].nVitality;
				s.nPic =nIndex;
				DM.Canvas.game.prepareCanvas($("div#canvasDiv"), 360, 400, s); 
				scene2.hide();
				scene3.show();
				sPlay("tick");
		
			});
			prevButton.on("click", function() {
				sPlay("lspin");
				$('div.level'+nCurrentLevel).hide();
				if(nCurrentLevel!=1){
					nCurrentLevel-- ;
				}
				$('div.level'+nCurrentLevel).show();
				levelIndicator.html(nCurrentLevel+'/'+nTotalLevels);
				return false;
			});
			nextButton.on("click", function() {
				sPlay("lspin");
				$('div.level'+nCurrentLevel).hide(); 
				
				if(nCurrentLevel!=nTotalLevels){
					levelIndicator.html(nCurrentLevel+'/'+nTotalLevels); 
					nCurrentLevel++ ;
				}
				
				$('div.level'+nCurrentLevel).show();
					levelIndicator.html(nCurrentLevel+'/'+nTotalLevels);
				return false;
			});
		}
		function sPlay(vSong){
			return createjs.Sound.play(vSong);
		}
		return {
			addLevel:addLevel,
			buildUI:buildUI
		}
	})(),
	
	l.prepare = (function(){
	
		function LevelFactory() {
	
		}
	
		LevelFactory.prototype.createLevel = function (options) {
	
		switch(options.difficulty){
			case 'easy':
				this.Level = DM.Type.Easy;
			break;
			case 'hard':
				this.Level = DM.Type.Hard;
			break;
			case 'expert':
				this.Level = DM.Type.Expert;
			break;
			case 'normal':
			default:
				this.Level = DM.Type.Normal;
			break
			}
		
		return new this.Level(options);
		
		};
	
		return {
			LevelFactory:LevelFactory
		}
	
	})();
	
	DM.Level = Level;		

}()); 
