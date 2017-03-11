var _ = require('underscore');

module.exports = function(combinations, action){
	if(combinations==undefined){
		combinations = [];
	}

	switch(action.type){
	case "GET_COMBIS":
		return action.combinations;

	case "ADD_COMBI":
		return [
			...combinations,
			action.newCombi
		];

	default:
		return combinations;
	}
};
