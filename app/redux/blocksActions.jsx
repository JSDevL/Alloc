export const getBlocks = function(blocks){
	return {
		type: "GET_BLOCKS",
		blocks: blocks
	}}

export const addBlock = function(block){
	return {
        type: "ADD_BLOCK",
        block: block
    }
}

export const updateBlock = function(updatedBlock){
    return {
        type: "UPDATE_BLOCK",
        updatedBlock: updatedBlock
    }
}

export const deleteBlock = function(_id){
    return {
        type: "DELETE_BLOCK",
        _id: _id
    }
}
