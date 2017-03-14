import React from 'react';
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));
/* all child Components */
const Floors = require('./Floors.jsx');

class BlockInput extends React.Component{
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
                    $(this.refs[err.errors[error].path]).addClass('bg-danger');
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
				{
					this.props.blocks.map( (block)=>{
						return <div key={block._id} className="panel-group" role="tablist">
							<div className="panel panel-default">
                                <div className="panel-heading" role="tab">
									<h4 className="panel-title">
										<table className="table table-bordered table-striped">
											<thead>
                                                <tr onClick={ ()=>$(`#${block._id}`).collapse('toggle') } >
                                                    <th className="table-column">Id</th> 
                                                    <th className="table-column">Block Name</th>
                                                    <th className="table-column">Tag</th>
                                                    <th className="table-column"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
												<tr onClick={ ()=>$(`#${block._id}`).collapse('toggle') } >
													<td className="table-column">{block._id}</td>
													<td className="table-column">{block.blockName}</td>
													<td className="table-column">{block.tag}</td>
													<td className="table-column"><button className="btn" onClick={ ()=>this.deleteBlock(block._id) }>Remove Block</button></td>
												</tr>
											</tbody>
										</table>
                                        <div id={block._id} className="panel-collapse collapse" role="tabpanel">
                                            <div className="panel-body">
                                                <Floors key={block._id} block={block}/>
                                            </div>
                                        </div>
									</h4>
								</div>
							</div>
						</div>;
					} )
				}
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td className="table-column">Blocks :</td>
                            <td className="table-column"><input type="text" placeholder="Enter Name" ref="blockName" onChange={this.resetInput}></input></td>
                            <td className="table-column"><input type="text" placeholder="Enter Tag" ref="tag" onChange={this.resetInput}></input></td>
                            <td className="table-column"><button className="btn" onClick={ ()=>this.postBlock() }>Add Block</button></td>
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
	};
})(BlockInput);
