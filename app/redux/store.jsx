const redux = require('redux');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');
const batchesReducer = require('./batchesReducer');
const stagesReducer = require('./stagesReducer');

export var configure = () => {
	var reducers = redux.combineReducers({
		alert: alertReducer,
		user: userReducer,
		batches: batchesReducer,
		stages: stagesReducer
	});

	var store = redux.createStore(reducers);

	return store;
};
