App.PlanningControls = function(){
	var that = this;
	this.downX; this.downY; this.downC;
	this.upX; this.upY; this.upC
	this.dragged = false;

	// TODO fix dragged

	this.setDown = function(mX, mY, mC){
		that.downX = mX;
		that.downY = mY;
		that.downC = mC;
		console.log(mX + ' ' + mY + ' ' + mC + ' ' + that.dragged);
	}
	
	this.setUp = function(mX, mY, mC){
		that.upX = mX; that.upY = mY; that.upC;
		if(that.downX !== that.upX || that.downY !== that.upY || that.downC !== that.upC){
			this.dragged = true;
		} else { this.dragged = false; }
		console.log(mX + ' ' + mY + ' ' + mC + ' ' + that.dragged);
	}
}