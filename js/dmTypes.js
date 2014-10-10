// namespace:
this.DM = this.DM || {};

(function(){

	function Type(){
	
	}

	var t = Type;

	t.Easy = function(options) {
		this.sName = options.name || "Rollie Fingers";
		this.sPicture = options.img || "images/scene2-moustache1.png";
		this.nSpeed = 0.158;
		this.nVitality = options.vitality || 2;
		this.nKills = options.kills || 0;
		this.sDifficulty = options.difficulty; 
	}
	t.Normal = function(options) {
		this.sName = options.name || "Charlie Chaplin";
		this.sPicture = options.img || "images/scene2-moustache2.png";
		this.nSpeed = 0.106;
		this.nVitality = options.vitality || 4;
		this.nKills = options.kills || 0;
		this.sDifficulty = options.difficulty; 
	}
	t.Hard = function(options) {
		this.sName = options.name || "Gene Shalit";
		this.sPicture = options.img || "images/scene2-moustache3.png";
		this.nSpeed = 0.095;
		this.nVitality = options.vitality || 7;
		this.nKills = options.kills || 0;
		this.sDifficulty = options.difficulty; 
	}
	t.Expert = function(options) {
		this.sName = options.name || "Yosemite Sam";
		this.sPicture = options.img || "images/scene2-moustache4.png";
		this.nSpeed = 	0.061;
		this.nVitality = options.vitality || 9;
		this.nKills = options.kills || 0;
		this.sDifficulty = options.difficulty; 
	}
	
	DM.Type = Type;	

}());

