export const getSessions = function(sessions){
	return {
		type: "GET_SESSIONS",
		sessions: sessions
	};
};