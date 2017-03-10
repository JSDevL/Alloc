var _ = require('underscore');

module.exports = function(rooms, action){
    if(rooms==undefined){
        rooms = []
    }

    switch(action.type){
        case "GET_ROOMS":
            return action.rooms;

        case "ADD_ROOM":
            return [
                ...rooms,
                action.room
            ];

        case "UPDATE_ROOM":
            return rooms.map( function(room){
                if(room._id == action.updatedRoom._id)
                    return action.updatedRoom
                return room;
            });

        case "DELETE_ROOM":
            return _.reject(rooms, function(room){
                return room._id === action._id
            })

        default:
            return rooms
    }
}
