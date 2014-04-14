App.setupLevelSelect = function(){
	var levelSelect = App.ModeHandler.addNewMode('level select');

		// ---------------------------------------------

	levelSelect.gfx = App.Canvases.addNewLayer(1).getContext('2d');
	levelSelect.lvl1Button = new App.Button('Level 1','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*0,168,24,200,000);
	levelSelect.lvl2Button = new App.Button('Level 2','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*0,168,24,230,030);
	levelSelect.lvl3Button = new App.Button('Level 3','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*0,168,24,260,060);
	levelSelect.lvl4Button = new App.Button('Level 4','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*1,168,24,300,100);
	levelSelect.lvl5Button = new App.Button('Level 5','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*1,168,24,330,130);
	levelSelect.lvl6Button = new App.Button('Level 6','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*1,168,24,360,160);
	levelSelect.lvl7Button = new App.Button('Level 7','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*0,56+28*2,168,24,400,200);
	levelSelect.lvl8Button = new App.Button('Level 8','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*1,56+28*2,168,24,430,230);
	levelSelect.lvl9Button = new App.Button('Level 9','#fff','#000','#f00','#fff',levelSelect.gfx,15+172*2,56+28*2,168,24,460,260);
	levelSelect.backButton = new App.Button('Back to Main Menu','#fff','#000','#f00','#fff',levelSelect.gfx,15,56+28*3,512,24,500,300);
	levelSelect.alpha = levelSelect.goalAlpha = 0;

		// ---------------------------------------------

	levelSelect.enterFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.updatingActive = true;
		levelSelect.exitFlag = false;
		App.GameRenderer.bestFit();

		levelSelect.lvl1Button.enter();
		levelSelect.lvl2Button.enter();
		levelSelect.lvl3Button.enter();
		levelSelect.lvl4Button.enter();
		levelSelect.lvl5Button.enter();
		levelSelect.lvl6Button.enter();
		levelSelect.lvl7Button.enter();
		levelSelect.lvl8Button.enter();
		levelSelect.lvl9Button.enter();
		levelSelect.backButton.enter();
		levelSelect.goalAlpha = 1;
	}

	levelSelect.updateFunc = function(){
		if(!levelSelect.requestStaticRenderUpdate)return;
		levelSelect.requestStaticRenderUpdate = false;

		levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

//		levelSelect.gfx.fillStyle = 'rgba(0,0,0,0.5)';
//		levelSelect.gfx.fillRect(0,0,App.Canvases.width,App.Canvases.height);

		levelSelect.gfx.fillStyle = '#fff';
		text(levelSelect.gfx,"Level Select",15,15,36,-3);

		if(levelSelect.lvl1Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl2Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl3Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl4Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl5Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl6Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl7Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl8Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl9Button.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.backButton.render())levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.alpha !== levelSelect.goalAlpha){
			levelSelect.alpha += expInterp(levelSelect.alpha,levelSelect.goalAlpha,0.003,0.01);
			levelSelect.gfx.globalAlpha = levelSelect.alpha;
			levelSelect.requestStaticRenderUpdate = true;
		}

		if(levelSelect.exitFlag && levelSelect.requestStaticRenderUpdate === false){
			levelSelect.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			levelSelect.updatingActive = false;
		}
	}

	levelSelect.exitFunc = function(){
		levelSelect.requestStaticRenderUpdate = true;
		levelSelect.exitFlag = true;

		levelSelect.lvl1Button.exit();
		levelSelect.lvl2Button.exit();
		levelSelect.lvl3Button.exit();
		levelSelect.lvl4Button.exit();
		levelSelect.lvl5Button.exit();
		levelSelect.lvl6Button.exit();
		levelSelect.lvl7Button.exit();
		levelSelect.lvl8Button.exit();
		levelSelect.lvl9Button.exit();
		levelSelect.backButton.exit();
		levelSelect.goalAlpha = 0;
	}

		// ---------------------------------------------

	levelSelect.registerMouseMoveFunc(function(x,y){
		if(levelSelect.lvl1Button.collide(x,y) && !levelSelect.lvl1Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl1Button.oldHover     !== levelSelect.lvl1Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl2Button.collide(x,y) && !levelSelect.lvl2Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl2Button.oldHover     !== levelSelect.lvl2Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl3Button.collide(x,y) && !levelSelect.lvl3Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl3Button.oldHover     !== levelSelect.lvl3Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl4Button.collide(x,y) && !levelSelect.lvl4Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl4Button.oldHover     !== levelSelect.lvl4Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl5Button.collide(x,y) && !levelSelect.lvl5Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl5Button.oldHover     !== levelSelect.lvl5Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl6Button.collide(x,y) && !levelSelect.lvl6Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl6Button.oldHover     !== levelSelect.lvl6Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl7Button.collide(x,y) && !levelSelect.lvl7Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl7Button.oldHover     !== levelSelect.lvl7Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl8Button.collide(x,y) && !levelSelect.lvl8Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl8Button.oldHover     !== levelSelect.lvl8Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.lvl9Button.collide(x,y) && !levelSelect.lvl9Button.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.lvl9Button.oldHover     !== levelSelect.lvl9Button.hover)levelSelect.requestStaticRenderUpdate = true;

		if(levelSelect.backButton.collide(x,y) && !levelSelect.backButton.oldHover)levelSelect.requestStaticRenderUpdate = true;
		if(levelSelect.backButton.oldHover !== levelSelect.backButton.hover)levelSelect.requestStaticRenderUpdate = true;
	});

	levelSelect.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT,function(x,y){
		if(levelSelect.lvl1Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("moving`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl2Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("increment`0`9`5~2`2`0`8`I`random(0,10)~6`2`0`9`O`I+3`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl3Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("mod 2`0`11`5~2`2`0`8`I`random(0,10)~8`2`0`9`O`I%2`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl4Button.collide(x,y)){
			App.Game.setMode(App.Game.modes.PLANNING);
			App.Game.currentPlanningLevel = App.Game.parseLevel("test`0`5`5~1`1`0`8`A`random(0,10)~1`2`0`8`B`random(0,10)~1`3`0`8`C`random(0,10)~3`1`0`9`X`A`10~3`2`0`9`Y`B`10~3`3`0`9`Z`C`10");
			App.GameRenderer.bestFit();
			App.ModeHandler.pushMode('planning');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl5Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl6Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl7Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl8Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.lvl9Button.collide(x,y)){
			App.ModeHandler.pushMode('coming soon');
			levelSelect.requestStaticRenderUpdate = true;
		}if(levelSelect.backButton.collide(x,y)){
			App.ModeHandler.popMode();
			levelSelect.requestStaticRenderUpdate = true;
		}
	});

	levelSelect.registerKeyDownFunc('Esc',function(){
		levelSelect.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	});
}
