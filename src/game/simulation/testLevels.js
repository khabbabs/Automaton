// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED

/*
	Instruction type id's

	 0: // spawn up			 1: // spawn down
	 2: // spawn left		 3: // spawn right
	 4: // up			 5: // down
	 6: // left			 7: // right
	 8: // rotate cw		 9: // rotate ccw
	10: // stream			11: // in
	12: // out			13: // grab
	14: // drop			15: // grab/drop
	16: // inc			17: // dec
	18: // switch 0			19: // switch +-
	20: // switch even odd		21: // sync
	22: // color toggle		23: // pause
*/

function test2(){
	var testLevel = new App.SimulationLevel(5,5);

	new App.SimulationAutomaton(testLevel,2,1,App.DIRECTIONS.RIGHT,true,true,true,true);
	new App.SimulationInstruction(testLevel,1,1,0,4);
	new App.SimulationInstruction(testLevel,3,3,0,5);
	new App.SimulationInstruction(testLevel,1,3,0,6);
	new App.SimulationInstruction(testLevel,3,1,0,7);

	new App.SimulationAutomaton(testLevel,2,2,App.DIRECTIONS.RIGHT,true,true,true,true);
	new App.SimulationInstruction(testLevel,2,2,0,8);

	new App.SimulationInstruction(testLevel,1,2,0,15);
	new App.SimulationInstruction(testLevel,3,2,0,15);
	new App.SimulationInstruction(testLevel,2,1,0,15);
	new App.SimulationInstruction(testLevel,2,3,0,15);

	new App.SimulationToken(testLevel,1,2,0);

	return testLevel;
}

function setupTestLevel(){
	App.Game.currentSimulationLevel = test2();
	App.Game.enterSimulationMode();
}

// DELETE THIS FILE ONCE PROPER LEVEL LOADING IS IMPLEMENTED
