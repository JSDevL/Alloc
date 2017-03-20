const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));


/* all child components */
const Floors = require('./Floors.jsx');


class Blocks extends React.Component{
	postBlock(){
		axios.post('/blocks', {
			blockName: this.refs.blockName.value,
			tag: this.refs.tag.value
		}).then( (response)=>{
			const newBlock = response.data;
			this.props.dispatch(actions.addBlock(newBlock));
			this.props.dispatch(actions.setAlert(true, "New Block created", "success"));
			/* reset input fields */
			this.refs.blockName.value = this.refs.tag.value = '';
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code that falls out of the range of 2xx */
			if( error.response.data.errors ){
				let messages = [];
				_.each(error.response.data.errors, (error, key)=>{
					messages.push( error.message );
					$(this.refs[ error.path ]).addClass('greened');
				});
				this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
			} else if( error.response.data.message ) {
				this.props.dispatch(actions.setAlert(true, error.response.data.message, "danger"));
			}
		});
	}

	deleteBlock(_id){
		axios.delete(`/blocks/${_id}`).then( (response)=>{
			const deleteID = response.data;
			this.props.dispatch(actions.deleteBlock(deleteID));
			this.props.dispatch(actions.setAlert(true, "Block Deleted", "success"));
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code */
			/* that falls out of the range of 2xx */
			let err = error.response.data;
			this.props.dispatch(actions.setAlert(true, err.message, "danger"));
		});
	}
	
	onToggle(blockId){
		var $clickedRow = $(`#${blockId}`);
		$clickedRow.collapse('toggle');
	}

	resetInput(event) {
		$(event.target).removeClass('bg-danger');
	}

	render() {
		return (
			<div>
				<h4>Enter Blocks</h4>

				<table className="table table-bordered table-striped">
					<tbody>
						<tr>
							<td className="table-column">Block:</td>
							<td className="table-column"><input type="text" className="form-control" placeholder="Enter Name" ref="blockName" onChange={this.resetInput}></input></td>
							<td className="table-column"><input type="text" className="form-control" placeholder="Enter Tag" ref="tag" onChange={this.resetInput}></input></td>
							<td className="table-column"><button className="btn" onClick={ ()=>this.postBlock() }>Add Block</button></td>
						</tr>
					</tbody>
				</table>

				<hr/>

				{
					this.props.blocks.map( (block)=>{
						return <div key={block._id} className="blocks-panel panel-group" role="tablist">
							<div className="panel panel-default">
								<div className="panel-heading" role="tab">
									<h4 className="panel-title">
										<table className="table table-bordered">
											<thead>
												<tr>
													<th className="table-column">Id</th> 
													<th className="table-column">Block Name</th>
													<th className="table-column">Tag</th>
													<th className="table-column"></th>
												</tr>
											</thead>
											<tbody className="blocks" onClick={ ()=>this.onToggle(block._id) }>
												<tr>
													<td className="table-column">{block._id}</td>
													<td className="table-column">{block.blockName}</td>
													<td className="table-column">{block.tag}</td>
													<td className="table-column"><button className="btn btn-default" onClick={ ()=>this.deleteBlock(block._id) }>Remove Block</button></td>
												</tr>
											</tbody>
										</table>
										<div id={block._id} className="panel-collapse collapse" role="tabpanel">
											<div className="panel-body blocks">
												<Floors key={block._id} block={block}/>
											</div>
										</div>
									</h4>
								</div>
							</div>
						</div>;
					} )
				}
			</div>
		); 
	}
}

Blocks.propTypes = {
	blocks: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		blocks: state.blocks,
		alert: state.alert
	};
})(Blocks);