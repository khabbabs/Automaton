// TODO: WHY DOES THIS FLASH WHEN ENTERED
// TODO: DISPLAY SCORES
// TODO: NEXT LEVEL

App.setupSuccessGui = function(){
	var success = App.ModeHandler.addNewMode('success');

	success.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	success.gui = new App.guiFrame(success.gfx);

	success.backButton = new App.GuiTextButton(15, 56+28*0, 200, 000, 'Back to Planning', function(){
		App.ModeHandler.popMode(2);
		success.requestStaticRenderUpdate = true;
	}, false, null, null);

	success.returnButton = new App.GuiTextButton(15, 56+28*1, 200, 000, 'Back to Menu', function(){
		App.ModeHandler.popMode(3);
		success.requestStaticRenderUpdate = true;
		App.loadDemo();
	}, false, null, null);

	success.gui.addComponent(success.backButton);
	success.gui.addComponent(success.returnButton);

	success.alpha = success.goalAlpha = 0;

	success.enterFunc = function(){
		success.requestStaticRenderUpdate = true;
		success.updatingActive = true;
		success.exitFlag = false;

		success.gui.enter();
		success.goalAlpha = 1;

		App.Shade.turnOn();
		App.Game.requestPause = true;
	}

	success.updateFunc = function(){

		if(success.gui.update())
			success.requestStaticRenderUpdate = true;

		if(!success.requestStaticRenderUpdate) return;
		success.requestStaticRenderUpdate = false;

		success.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		success.gfx.fillStyle = '#fff';
		text(success.gfx,"Success",15,15,36,-3);

		if(success.gui.render())
			success.requestStaticRenderUpdate = true;

		if(success.alpha !== success.goalAlpha){
			success.alpha += expInterp(success.alpha,success.goalAlpha,0.003,0.01);
			success.gfx.globalAlpha = success.alpha;
			success.requestStaticRenderUpdate = true;
		}

		if(success.exitFlag && success.requestStaticRenderUpdate === false){
			success.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			success.updatingActive = false;
		}
	}

	success.exitFunc = function(){
		success.requestStaticRenderUpdate = true;
		success.exitFlag = true;

		success.gui.exit();
		success.goalAlpha = 0;
		App.Shade.turnOff();
		App.Game.setMode(App.Game.modes.PLANNING);
	}

		// ---------------------------------------------

	success.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, success.gui.mouseDown);
	success.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, success.gui.mouseUp);

	success.registerKeyDownFunc('Esc',function(){
		App.ModeHandler.popMode(3);
		success.requestStaticRenderUpdate = true;
		App.loadDemo();
	});
}
