
/*Creates a Gui object that:
3. allows adding components
5. updates components that have an update method
6. renders components that have a render method (all should)
*/
App.guiFrame = function(gfx){
	this.gfx = gfx;
	this.frame = [];

	//gets reset after one frame.
	this.drawStatic = false;
	this.guilock = false;
	var that = this;

	this.load = function(){
		this.guilock = false;
		this.drawStatic = true;
	}

	this.addComponent = function(comp){
		this.frame.push(comp);
	}

	this.testCoordinates = function(x,y){

		var ret = {f:[],p:[]};
		for(var c in this.frame){
			if(this.frame[c].collides(x, y)){
					if(this.frame[c].functional)
						ret.f.push(this.frame[c]);
					ret.p.push(this.frame[c]);
			}
		}
		return ret;
	}

	//lmb must be true or false. if it's false, it will block input but not do anything
	this.mouseDown = function(x, y){
		var comps = that.testCoordinates(x, y);
		if(!comps.f && !comps.p)
			return false;

		for(var fn in comps.f){
			if(comps.f[fn].locked) continue;
			comps.f[fn]._clickStart();
			comps.f[fn].clickStart();
		}
		return true;
	}

	//Only needs to be called when lmb is released. Returns nothing.
	this.mouseUp = function(x, y){
		var comps = that.testCoordinates(x, y);

		for(var fn in comps.f){
			if(comps.f[fn].locked) continue;
			comps.f[fn].clickEnd();
			
		}
		for(var f in that.frame)
			that.frame[f]._clickEnd();
	}

	this.update = function(){
		var flag = false;
		for(var c in this.frame)if(this.frame[c].update){
			if(this.frame[c]._update()) flag = true; //if we need to render
			this.frame[c].update();
		}
		return flag;
	}

	this.windowResized = function(){
		that.drawStatic = true;

		for(var c in that.frame) {
			if(that.frame[c].updatePosition)
				that.frame[c].updatePosition();
		}
	}

	this.render = function(){
		var flag = false;

		for(var c in this.frame){
			if(this.frame[c].render){
				if(this.frame[c].render(this.gfx))
					flag = true;

			}
		}

		return flag;
	}
}
