module.exports = function(sessions, action){
	if(sessions === undefined )
		sessions = [];

	switch(action.type){
	case "GET_SESSIONS":
		sessions = action.sessions;
		return sessions;
	default:
		return sessions;
	}
};