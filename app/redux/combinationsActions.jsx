export const getCombis = function(combinations){
	return {
		type: "GET_COMBIS",
		combinations: combinations
	};
};

export const addCombi = function(newCombi){
	return {
		type: "ADD_COMBI",
		newCombi: newCombi
	};
};
