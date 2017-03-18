const redux = require('redux');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');
const blocksReducer = require('./blocksReducer');
const combinationsReducer = require('./combinationsReducer');
const sessionsReducer = require('./sessionsReducer');
const stagesReducer = require('./stagesReducer');

export var configure = () => {
	var reducers = redux.combineReducers({
		alert: alertReducer,
		user: userReducer,
		blocks: blocksReducer,
		combinations: combinationsReducer,
		sessions: sessionsReducer,
		stages: stagesReducer
	});

	var store = redux.createStore(reducers);

	return store;
};
