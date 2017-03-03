export var getBlocks = function(blocks){
    return {
        type: "GET_BLOCKS",
        blocks: blocks
    }
}

export var addBlock = function(block){
    return {
        type: "ADD_BLOCK",
        block: block
    }
}

export var deleteBlock = function(_id){
    return {
        type: "DELETE_BLOCK",
        _id: _id 
    }
}
