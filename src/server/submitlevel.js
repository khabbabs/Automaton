App.setupSubmitLevel = function(){
	var submit = App.ModeHandler.addNewMode('submit level');

		// ---------------------------------------------


	submit.gfx = App.Canvases.addNewLayer(2).getContext('2d');
	submit.gui = new App.guiFrame(submit.gfx);

	var returnFunc = function(){
		submit.requestStaticRenderUpdate = true;
		App.ModeHandler.popMode();
	}

	submit.cancelButton = new App.GuiTextButton(15,100,200,000,'Cancel', returnFunc,false,null,null);
	submit.cancelButton.hoverColor = '#af1010';

	submit.submitButton = new App.GuiTextButton(15,130,200,000,'Submit',function(){
		submitLevel();
	},false,null,null);
	submit.submitButton.hoverColor = '#10af10';

	submit.diffButton = new App.GuiTextButton(15,260,200,000,'Easy',function(){
		if(submit.diffButton.txt === 'Easy') submit.diffButton.txt = 'Medium';
		else if(submit.diffButton.txt === 'Medium') submit.diffButton.txt = 'Hard';
		else if(submit.diffButton.txt === 'Hard') submit.diffButton.txt = 'Easy';
	},false,null,null);
	submit.diffButton.w = 128;

	submit.accountButton = new App.GuiTextButton(15, 400, 200, 000, 'Create Account', function(){
		App.ModeHandler.pushMode('create account');
	}, false, null, null);


	submit.username = new App.GuiTextBox(15, 300, 200, 25, "Username", 100, 100, null, null);
	submit.password = new App.GuiTextBox(15,330, 200, 25, "Password", 100, 100, null, null);
	submit.password.passwordMode = true;
	submit.username.next = submit.password;

	submit.levelname = new App.GuiTextBox(15, 200, 200, 25, "Level Name", 100, 100, null, null);
	submit.leveldesc = new App.GuiTextBox(15, 230, 300, 25, "Level Description", 100, 100, null, null);
	submit.levelname.next = submit.leveldesc;
	submit.leveldesc.next = submit.username;

	submit.gui.addComponent(submit.cancelButton);
	submit.gui.addComponent(submit.submitButton);
	submit.gui.addComponent(submit.diffButton);
	submit.gui.addComponent(submit.username);
	submit.gui.addComponent(submit.password);
	submit.gui.addComponent(submit.levelname);
	submit.gui.addComponent(submit.leveldesc);
	submit.gui.addComponent(submit.accountButton);

	var submitLevel = function(){
		App.Server.putLevel(App.Game.currentPlanningLevel.generateParseString(),
			submit.username.txt,
			submit.password.passwordString,
			submit.diffButton.txt,
			submit.levelname.txt,
			submit.leveldesc.txt,
			submitCallback);
	}

	var submitCallback = function(data){
		var d = data.split(':')[1];

		d = d.substring(1, d.indexOf('}')-1);
		//TODO make this something other than an alert
		alert(d);
		if(d === 'level saved')
			returnFunc();
	}

	submit.alpha = submit.goalAlpha = 0;

		// ---------------------------------------------

	submit.enterFunc = function(){
		submit.requestStaticRenderUpdate = true;
		submit.updatingActive = true;
		submit.exitFlag = false;
		submit.gui.enter();
		submit.goalAlpha = 1;

		App.Shade.turnOn();
	}

	submit.updateFunc = function(){
		if(submit.gui.update())
			submit.requestStaticRenderUpdate = true;

		if(!submit.requestStaticRenderUpdate)return;
		submit.requestStaticRenderUpdate = false;

		submit.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);

		submit.gfx.fillStyle = '#fff';
		text(submit.gfx,"Level Submit",15,15,36,-3);

		if(submit.gui.render())
			submit.requestStaticRenderUpdate = true;

		if(submit.alpha !== submit.goalAlpha){
			submit.alpha += expInterp(submit.alpha,submit.goalAlpha,0.003,0.01);
			submit.gfx.globalAlpha = submit.alpha;
			submit.requestStaticRenderUpdate = true;
		}

		if(submit.exitFlag && submit.requestStaticRenderUpdate === false){
			submit.gfx.clearRect(0,0,App.Canvases.width,App.Canvases.height);
			submit.updatingActive = false;
		}
	}

	submit.exitFunc = function(){
		submit.requestStaticRenderUpdate = true;
		submit.exitFlag = true;

		submit.gui.exit();
		submit.goalAlpha = 0;
	}

	submit.registerMouseDownFunc(App.InputHandler.MOUSEBUTTON.LEFT, submit.gui.mouseDown);
	submit.registerMouseUpFunc(App.InputHandler.MOUSEBUTTON.LEFT, submit.gui.mouseUp);

	submit.registerKeyDownFunc('Enter', submitLevel);
	submit.registerKeyDownFunc('Esc', returnFunc);

	submit.registerResizeFunc(function(){
		App.GameRenderer.bestFit();
	});
}