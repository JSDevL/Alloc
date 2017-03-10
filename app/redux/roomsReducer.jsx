var _ = require('underscore');

module.exports = function(rooms, action){
    if(rooms==undefined){
        rooms = [];
    }

    switch(action.type){
        case "GET_ROOMS":
            return action.rooms;

        case "ADD_ROOM":
            return [
                ...rooms,
                action.room
            ];

        case "DELETE_ROOM":
            return _.reject(rooms, function(room){
                return room._id === action._id
            })

        default:
            return rooms
    }
}
