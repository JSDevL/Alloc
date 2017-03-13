const redux = require('redux');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');
const blocksReducer = require('./blocksReducer');
const combinationsReducer = require('./combinationsReducer');
const sessionsReducer = require('./sessionsReducer');

export var configure = () => {
	var reducers = redux.combineReducers({
		alert: alertReducer,
		user: userReducer,
		blocks: blocksReducer,
		combinations: combinationsReducer,
		sessions: sessionsReducer
	});

	var store = redux.createStore(reducers);

	return store;
};
