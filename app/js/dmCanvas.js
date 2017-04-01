// namespace:
this.DM = this.DM || {};

(function(){

	function Canvas(){
	
	}
	var c = Canvas;

	c.game = (function() {	
		
		var vcanvas;
		var context;
		var images = {};
		var totalResources = 15;
		var numResourcesLoaded = 0;
		var fps = 30;
		var charX = 145;
		var charY = 155;
		var breathInc = 0.1;
		var breathDir = 1;
		var breathAmt = 0;
		var breathMax = 2;
		var breathInterval = 0;
		var redrawInterval =0;
		var bangInterval = 0;
		var showRSTimeout;
		var showBangTimeout;
		var maxTimeShowing = 300;
		var curShowingTime = 0;
		var showReady = false;
		var showSteady = false; 
		var fpsInterval = 0;
		var playerStats;
		var numFramesDrawn = 0;
		var curFPS = 0;
		var shooting = false;
		var showBang = false;
		var moustache = '';
		var platerxBlood =false;
		var computerxBlood =false;
		var computerxShootTime=0;
		var playerxShootTime=0;
		var startGameInterval;
		var bullet = 1;
		var tc=0;
		var tcf=0;
		
			
		function updateFPS() {
			curFPS = numFramesDrawn;
			numFramesDrawn = 0;
		}
		function prepareCanvas(canvasDiv, canvasWidth, canvasHeight, objSettings) {
		
			playerStats = { ' nSpeed' : '',
							'sGameTitle' : '',
							'sGameInfo':''
			}
			
			breathInterval = setInterval(updateBreath, 1000 / fps);
			fpsInterval = setInterval(updateFPS, 1000);
			
			computerxShootTime = ((objSettings.nSpeed*1000) - objSettings.nVitality);
			
			vcanvas = document.createElement('canvas');
			vcanvas.setAttribute('width', canvasWidth);
			vcanvas.setAttribute('height', canvasHeight);
			vcanvas.setAttribute('id', 'canvas');
			canvasDiv.append(vcanvas);
			
			if(objSettings.nPic ==="" || objSettings.nPic == undefined){
				moustache = 'moustache1';
			}else{
				moustache = 'moustache'+objSettings.nPic; 
			}
		
		
			if(typeof G_vmlCanvasManager != 'undefined') {
				vcanvas = G_vmlCanvasManager.initElement(vcanvas);
			}
			context = vcanvas.getContext("2d"); // Grab the 2d canvas context
		
			vcanvas.width = vcanvas.width; // clears the canvas 
			context.fillText("loading...", 160, 140);
			loadImage("leftArm");
			loadImage("rightArm");
			loadImage("gunLeft");
			loadImage("gunRight");
			loadImage("gunLeft-shoot");
			loadImage("gunLeft-shootCover");
			loadImage("torso");
			loadImage("leftLeg");
			loadImage("rightLeg");
			loadImage("hat");
			loadImage(moustache);		
			loadImage("leftLeg-move");
			loadImage("bang-label");
			loadImage("compux-blood");
			loadImage("playerx-blood");
			startGameInterval =  setTimeout(showReadySteady, 1000);
			vcanvas.addEventListener("click", onClick, false);
			createjs.Sound.play('bgSnd');
			
		}
		function loadImage(name) {
		
			images[name] = new Image();
			images[name].onload = function() { 
				resourceLoaded();
			}
			images[name].src = "images/character/" + name + ".png";
		}
		function resourceLoaded() {
		
			numResourcesLoaded += 1;
			
			if(numResourcesLoaded === totalResources) {
				redrawInterval = setInterval(redraw, 1000 / fps);
			}
		}
		
		function redraw() {
		
			var x = charX;
			var y = charY;
			var jumpHeight = 2;
			var posx, posy = 0;
			vcanvas.width = vcanvas.width; // clears the canvas 
			
			// moustache pos
			if(moustache =="moustache1"){
				posx = x-26;
				posy = y-84;
			}else if (moustache =="moustache2"){
				posx = x-2;
				posy = y-86;
			}else if (moustache =="moustache3"){
				posx = x-4;
				posy = y-84;
			}else if (moustache =="moustache4"){
				posx = x-15;
				posy = y-85;
			}
			
			// Draw shadow
			if (shooting) {
				drawEllipse(x + 25, y + 32, 100 - breathAmt, 4);
			} else {
				drawEllipse(x + 28, y + 32, 160 - breathAmt, 6);
			}
			if (shooting) {
				y -= jumpHeight;
			}
			
			context.drawImage(images["torso"], x, y - 60);
			
			if (shooting) {
				context.drawImage(images["leftLeg-move"], x-20, y);
			} else {
				context.drawImage(images["leftLeg"], x-20, y);
			}
			
			context.drawImage(images["rightLeg"], x+40, y);
			context.drawImage(images["hat"], x-20, y - 130 - breathAmt);
			
			//Arms
			if (shooting) {
				context.drawImage(images["rightArm"], x + 55, y - 59 );
			} else {
				context.drawImage(images["rightArm"], x + 55, y - 59 - breathAmt);
			}
			
			if(computerxBlood){
				context.drawImage(images[moustache], posx, posy - breathAmt);
				context.drawImage(images["compux-blood"], x-20, y-70);
				clearInterval(breathInterval);
			}else{
			
				if (shooting) {
					context.drawImage(images["leftArm"], x - 30, y - 59);
				} else {
					context.drawImage(images["leftArm"], x-30 , y - 59 - breathAmt);
				}
				
				context.drawImage(images[moustache], posx, posy - breathAmt);
			}
			//Guns
			context.drawImage(images["gunRight"], x + 45, y - 31);
			
			if (shooting) {
				context.drawImage(images["gunLeft-shoot"], x - 22, y - 29);
				context.drawImage(images["gunLeft-shootCover"], x+6, y - 11);
			} else {
				context.drawImage(images["gunLeft"], x - 9, y-31);
			}
			
			//Legs
			if(showBang){
				context.drawImage(images["bang-label"], x-70, y+40);
			}
			
			if(platerxBlood){
				context.drawImage(images["playerx-blood"], x-130, y-170);
			}
			
			context.font = "bold 40px VT323";
			context.fillStyle = 'white';
			
			try {
				if(showReady==true){
					context.fillText("Ready ", 135, 280);
				}
				if(showSteady==true){
					context.fillText("Steady", 125, 280);
				}
			} catch (ex) { }
		}
		
		function randomFromInterval(from,to){
			return Math.floor(Math.random()*(to-from+1)+from);
		}
		
		function updateBreath() { 
	
			if (breathDir === 1) {  // breath in
				breathAmt -= breathInc;
				if (breathAmt < -breathMax) {
					breathDir = -1;
				}
			} else {  // breath out
				breathAmt += breathInc;
				if(breathAmt > breathMax) {
					breathDir = 1;
				}
			}
		}
		
		function showReadySteady() {
			
			curShowingTime+=1;
			clearTimeout(startGameInterval);
			
			if (curShowingTime == 200){
				showReady=true;
			}
			if (curShowingTime == 400){
				showReady=false;
			}
			if (curShowingTime == 600){
				showSteady=true;
			}
			if (curShowingTime == 800) {
				showSteady=false;
				var ramdomX = randomFromInterval(250,3500);
				setTimeout(displayBang, ramdomX);
				clearTimeout(showRSTimeout);
			}else{
				showRSTimeout=setTimeout(showReadySteady,1);	  
			}
		
		}
		function drawEllipse(centerX, centerY, width, height) {
	
			context.beginPath();
			context.moveTo(centerX, centerY - height/2);
	
			context.bezierCurveTo(
			centerX + width/2, centerY - height/2,
			centerX + width/2, centerY + height/2,
			centerX, centerY + height/2);
	
			context.bezierCurveTo(
			centerX - width/2, centerY + height/2,
			centerX - width/2, centerY - height/2,
			centerX, centerY - height/2);
	
			context.fillStyle = "black";
			context.fill();
			context.closePath();	
		}
		
		function displayBang(){
	
			if (showBang==false){
				shootTimeCount();	
				showBang = true;
			}else{
			
				showBang = false;
			
			}
		
		}
		
		function shootPlayer(){
			if(bullet==1){
				
				playerxShootTime = tc;
				createjs.Sound.play('shoot');		
				
				if(playerxShootTime !=0 && playerxShootTime < computerxShootTime){
					setTimeout(deathComputer, 1000);				
				}
				bullet = 0;		
			}
			
						
		}
		
		function shootTimeCount(){
			
			tc=tc+1;
			
			if(tc===22){
				displayBang();
			}
			
			if(playerxShootTime < computerxShootTime && playerxShootTime !=0 ){
				computerxBlood = true;
				clearTimeout(tcf);
			}else{
				if(tc===computerxShootTime){
			 		clearTimeout(tcf);
			 		shoot();
			 	}else{
				 	tcf=setTimeout(shootTimeCount,0);
				}				
			}
		}
		
		function shoot() {
			showBang = false;
		
			if (!shooting) {
				shooting = true;
				setTimeout(unholster, 300);
			}
		
		}
		
		function deathComputer(){
			playerStats.nSpeed = "Your speed " + (playerxShootTime/1000);
			playerStats.sGameTitle = "You Win";
			playerStats.sGameInfo = "Game Over";
			DM.Overlay.panel.show(playerStats);
		}
		
		function deathPlayer(){
			playerStats.nSpeed = "Speed " + (computerxShootTime/1000);
			playerStats.sGameTitle = "You Lose";
			playerStats.sGameInfo = "Game Over";
			DM.Overlay.panel.show(playerStats);
		}
		
		function unholster() {
			shooting = false;
			platerxBlood = true;
			setTimeout(deathPlayer, 1000);
		}
		
		function onClick(){
			shootPlayer();
		}
		
		function clearGameOver() {
		
			clearInterval(redrawInterval);
			clearInterval(breathInterval);
			clearTimeout(showRSTimeout);
			clearInterval(fpsInterval);
			breathAmt=0;
			curFPS = 0;
			computerxShootTime=0;
			curShowingTime=0;
			playerxShootTime = 0;
			redrawInterval = 0;
			breathInterval = 0;
			numResourcesLoaded = 0;
			tc = 0;
			tcf = 0;
			shooting = false;
			platerxBlood =false;
			computerxBlood =false;
			showSteady = false; 
			showReady = false;
			showBang = false;
			playerStats.nSpeed = 0;
			playerStats.sGameTitle = '';
			playerStats.sGameTitle='';
			bullet = 1;
		}
		
		return {
			prepareCanvas:prepareCanvas,
			shootPlayer:shootPlayer,
			clearGameOver:clearGameOver
		}	
	
	}()); // Core Game Canvas Manipulation
	
	DM.Canvas = Canvas;

}());


// Canvas is Based on the example of 
// Copyright 2011 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
