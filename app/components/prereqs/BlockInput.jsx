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
            this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            this.props.dispatch(actions.setAlert(true, err.message, "danger"));
        });
    }

    postBlock(){
        axios.post('/blocks', {
            blockName: this.refs.blockName.value,
            tag: this.refs.tag.value
        })
        .then( (response)=>{
            const newBlock = response.data;
            this.props.dispatch(actions.addBlock(newBlock));
            this.props.dispatch(actions.setAlert(true, "New Block created", "success"));
            /* reset input fields */
            this.refs.blockName.value = this.refs.tag.value = '';
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            /* if err object contains validation errors */
            if(err.errors){
                let messages = [];
                for( error in err.errors ){
                    /* get all messages */
                    messages.push( err.errors[error].message );
                    /* add classes to input fields */
                    $(this.refs[error]).addClass('bg-danger');
                }
                this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
            } else {
                this.props.dispatch(actions.setAlert(true, err.message, "danger"));
            }
        });
    }

    deleteBlock(_id){
        axios.delete(`/blocks/${_id}`)
        .then( (response)=>{
            const deleteID = response.data;
            this.props.dispatch(actions.deleteBlock(deleteID));
            this.props.dispatch(actions.setAlert(true, "Block Deleted", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            this.props.dispatch(actions.setAlert(true, err.message, "danger"));
        });
    }

    resetInput(event) {
        $(event.target).removeClass('bg-danger');
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
                            <td><input type="text" placeholder="Enter Name" ref="blockName" onChange={this.resetInput}></input></td>
                            <td><input type="text" placeholder="Enter Tag" ref="tag" onChange={this.resetInput}></input></td>
                            <td><button className="btn" onClick={ ()=>this.postBlock() }>Add Block</button></td>
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
