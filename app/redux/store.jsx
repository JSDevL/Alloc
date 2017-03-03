var redux = require('redux');
var {blocksReducer} = require('./reducers');

export var configure = () => {
    var reducers = redux.combineReducers({
        blocks: blocksReducer
    });

    var store = redux.createStore(reducers);

    return store;
}
