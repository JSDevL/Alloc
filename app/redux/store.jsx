const redux = require('redux');
const blocksReducer = require('./blocksReducer');
const roomsReducer = require('./roomsReducer');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');

export var configure = () => {
    var reducers = redux.combineReducers({
        blocks: blocksReducer,
		rooms: roomsReducer,
        alert: alertReducer,
        user: userReducer
    });

    var store = redux.createStore(reducers);

    return store;
}
