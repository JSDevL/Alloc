module.exports = function(batches, action){
	if(batches===undefined){
		batches = [];
	}

	switch(action.type){
	case "GET_BATCHES":
		return action.batches;

	default:
		return batches;
	}
};