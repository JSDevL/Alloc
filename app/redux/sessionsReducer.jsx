module.exports = function(sessions, action){
	if(sessions===undefined){
		sessions = [];
	}

	switch(action.type){
	case "GET_SESSIONS":
		return action.sessions;

	default:
		return sessions;
	}
};