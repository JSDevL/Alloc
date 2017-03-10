export const getRooms = function(rooms){
	return {
		type: "GET_ROOMS",
		rooms: rooms
	}
}

export const addRoom = function(room){
	return {
        type: "ADD_ROOMS",
        room: room
    }
}

export const deleteRoom = function(_id){
    return {
        type: "DELETE_ROOM",
        _id: _id
    }
}
