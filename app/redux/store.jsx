const redux = require('redux');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');
const batchesReducer = require('./batchesReducer');
const sessionsReducer = require('./sessionsReducer');
const stagesReducer = require('./stagesReducer');

export var configure = () => {
	var reducers = redux.combineReducers({
		alert: alertReducer,
		user: userReducer,
		batches: batchesReducer,
		sessions: sessionsReducer,
		stages: stagesReducer
	});

	var store = redux.createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

	return store;
};
