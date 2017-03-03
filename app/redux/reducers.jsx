var _ = require('underscore');

export var blocksReducer = function(blocks, action){
    if(blocks==undefined){
        blocks = []
    }

    switch(action.type){
        case "GET_BLOCKS":
            return action.blocks;

        case "ADD_BLOCK":
            return [
                ...blocks,
                action.block
            ];

        case "DELETE_BLOCK":
            return _.reject(blocks, function(block){
                return block._id === action._id
            })

        default:
            return blocks
    }
}
