import React from 'react'
var {connect} = require('react-redux');
var actions = require('actions');
const axios = require('axios');

/*  all child components   */
const Alert = require('Alert');

class BlockInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: false,
            errorMessage: ''
        }
    }

    componentDidMount(){
        // get initial blocks from DB
        this.getBlocks();
    }

    componentDidUpdate(){
        // empty input fields
        this.refs.inputName.value = this.refs.inputTag.value = '';
    }

    getBlocks(){
        axios.get("/blocks")
        .then( (response)=>{
            const allBlocks = response.data;
            this.props.dispatch(actions.getBlocks(allBlocks));
        })
        .catch( (error)=>{
            this.setError(error.response.data);
        });
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
            this.setError(error.response.data);
        });
    }

    deleteBlock(_id){
        axios.delete(`/blocks/${_id}`)
        .then( (response)=>{
            const deleteID = response.data;
            this.props.dispatch(actions.deleteBlock(deleteID));
        })
        .catch( (error)=>{
            this.setError(error.response.data);
        });
    }

    setError(errorMessage){
        this.setState({
            error: true,
            errorMessage: errorMessage
        })
    }

    reset(){
        this.setState({
            error: false,
            errorMessage: ''
        })
    }

    render() {
        let printError = ()=>{
            if(this.state.error){
                return <Alert onReset={()=>this.reset()}>{this.state.errorMessage}</Alert>
            }
        }
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
                                        <td>
                                            <button className="btn" onClick={ ()=>this.deleteBlock(block._id) }>Remove Block</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Name" ref="inputName"></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Tag" ref="inputTag"></input>
                            </td>
                            <td>
                                <button className="btn" onClick={ ()=>this.postBlock(this.refs.inputName.value, this.refs.inputTag.value) }>Add Block</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {
                    printError()
                }
            </div>
        );
    }
}

module.exports = connect((state)=>{
    return {
        blocks: state.blocks
    }
})(BlockInput);
