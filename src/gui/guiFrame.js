Application.GuiFrame = function(){
	this.components = [];

	this.update = function(){
		for(var c in this.components)if(this.components[c].update)
			this.components[c].update();
	};

	this.render = function(){
		// TODO: THE GUI SHOULD HAVE A REFERENCE TO ITS OWN CANVAS | CLEAR THE GUI INSIDE GUI'S RENDER, NOT HERE
		var guiCanvas = Application.Canvases.layers['GUI'];                          // TODO: CLEAN THIS UP
		guiCanvas.getContext('2d').clearRect(0,0,guiCanvas.width, guiCanvas.height); // TODO: CLEAN THIS UP

		for(var c in this.components)if(this.components[c].render)
			this.components[c].render();
	};
}

Application.CheckGuiClick = function(data,evt){
	var gui = Application.Gui;
	var ret = false;
	var x = data.x;
	var y = data.y;

	for(var c in gui.components){
		var comp = gui.components[c];
		if(x > comp.x && x < (comp.x + comp.width) &&
		   y > comp.y && y < (comp.y + comp.height)){
			comp.callback();
			ret = true;
		}
	}

	return ret;
}

Application.Button = function(menuName,x,y,width,height,text,callback){
	Application.Menus[menuName].components.push(this);

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.callback = callback;
	this.gfx = Application.GuiCanvas.getContext("2d");

	this.render = function(){
		this.gfx.fillStyle = "rgb(0,0,0)";
		this.gfx.fillRect(this.x,this.y,this.width,this.height);
		this.gfx.fillStyle = "rgb(255,255,255)";
		this.gfx.fillText(this.text, this.x + 5, this.y + 20);
		this.gfx.strokeStyle = "rgb(255,255,255)";
		this.gfx.strokeRect(this.x,this.y,this.width,this.height);
	}
}

Application.changeMenu = function(menuName){
	if(Application.Menus[menuName])
		Application.Gui = Application.Menus[menuName];
}

//a TEMPORARY function!!!!!!!!!
function constructMenus(){
	Application.GuiCanvas = Application.Canvases.addNewLayer("GUI",0);

	Application.Menus = [];

	Application.Menus['mainMenu'] = new Application.GuiFrame();
	new Application.Button('mainMenu',10,10,100,30,'PLAY',function(){Application.Game.enterPlanningMode();});	
	new Application.Button('mainMenu',10,50,100,30,'LIBRARY',function(){alert("BAR");});
	new Application.Button('mainMenu',10,90,100,30,'EDITOR',function(){Application.Game.enterPlanningMode();});

	Application.Menus['planning'] = new Application.GuiFrame();
	new Application.Button('planning',10,10,100,30,'Main Menu',function(){Application.changeMenu('mainMenu');});

	Application.Menus['simulation'] = new Application.GuiFrame();
}