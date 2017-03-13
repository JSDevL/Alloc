module.exports.getSessions = function(sessions){
	return {
		type: "GET_SESSIONS",
		sessions: sessions
	};
};