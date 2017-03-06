import React from 'react'
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'))

class BlockInput extends React.Component{
    componentDidMount(){
        /* get initial blocks from DB */
        axios.get("/blocks")
        .then( (response)=>{
            const allBlocks = response.data;
            this.props.dispatch(actions.getBlocks(allBlocks));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            this.props.dispatch(actions.setAlert(true, error.response.data, "danger"));
        });
    }

    componentDidUpdate(){
        /* empty input fields */
        this.refs.inputName.value = this.refs.inputTag.value = '';
    }

    postBlock(blockName, tag){
        axios.post('/blocks', {
            blockName: blockName,
            tag: tag
        })
        .then( (response)=>{
            const newBlock = response.data;
            this.props.dispatch(actions.addBlock(newBlock));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            this.props.dispatch(actions.setAlert(true, error.response.data, "danger"));
        });
    }

    deleteBlock(_id){
        axios.delete(`/blocks/${_id}`)
        .then( (response)=>{
            const deleteID = response.data;
            this.props.dispatch(actions.deleteBlock(deleteID));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            this.props.dispatch(actions.setAlert(true, error.response.data, "danger"));
        });
    }

    render() {
        return (
            <div>
                <h4>Enter Blocks</h4>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Block Name</th>
                            <th>Tag</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.blocks.map( (block)=>{
                                return(
                                    <tr key={block._id}>
                                        <td>{block._id}</td>
                                        <td>{block.blockName}</td>
                                        <td>{block.tag}</td>
                                        <td><button className="btn" onClick={ ()=>this.deleteBlock(block._id) }>Remove Block</button></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td><input type="text" placeholder="Enter Name" ref="inputName"></input></td>
                            <td><input type="text" placeholder="Enter Tag" ref="inputTag"></input></td>
                            <td><button className="btn" onClick={ ()=>this.postBlock(this.refs.inputName.value, this.refs.inputTag.value) }>Add Block</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = connect((state)=>{
    return {
        blocks: state.blocks,
        alert: state.alert
    }
})(BlockInput);
