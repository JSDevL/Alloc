module.exports = function(stages, action){
	if(stages === undefined )
		stages = {};

	switch(action.type){
	case "GET_STAGES":
		stages = action.stages;
		return stages;
	default:
		return stages;
	}
};