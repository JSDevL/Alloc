const redux = require('redux');
const blocksReducer = require('./blocksReducer');
const alertReducer = require('./alertReducer');
const userReducer = require('./userReducer');

export var configure = () => {
    var reducers = redux.combineReducers({
        blocks: blocksReducer,
        alert: alertReducer,
        user: userReducer
    });

    var store = redux.createStore(reducers);

    return store;
}
