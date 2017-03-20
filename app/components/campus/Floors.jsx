const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));


/* all child components */
const Rooms = require('./Rooms.jsx');


class Floors extends React.Component{
	postFloor(blockID){
		axios.post(`/blocks/${blockID}/floors`, {
			number: this.refs.number.value
		}).then( (response)=>{
			const updatedBlock = response.data;
			this.props.dispatch(actions.updateBlock(updatedBlock));
			this.props.dispatch(actions.setAlert(true, "New Floor created", "success"));
			/* reset input fields */
			this.refs.number.value = '';
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

	deleteFloor(blockID, floorID){
		axios.delete(`/blocks/${blockID}/floors/${floorID}`).then( (response)=>{
			const updatedBlock = response.data;
			this.props.dispatch(actions.updateBlock(updatedBlock));
			this.props.dispatch(actions.setAlert(true, "Floor Deleted", "success"));
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code */
			/* that falls out of the range of 2xx */
			let err = error.response.data;
			this.props.dispatch(actions.setAlert(true, err.message, "danger"));
		});
	}

	onToggle(floorId){
		var $clickedRow = $(`#${floorId}`);
		$clickedRow.collapse('toggle');
	}

	resetInput(event) {
		$(event.target).removeClass('bg-danger');
	}

	render() {
		const block = this.props.block;
		return (
			<div>
				<h4>Enter Floors for {block.blockName} Block</h4>

				<table className="table table-bordered table-striped">
					<tbody>
						<tr>
							<td className="table-column">Floor:</td>
							<td className="table-column"><input type="text" className="form-control" placeholder="Enter Floor Number" ref="number" onChange={this.resetInput}></input></td>
							<td className="table-column"><button className="btn" onClick={()=>this.postFloor(block._id)}>Add Floor</button></td>
						</tr>
					</tbody>
				</table>

				<hr/>
				
				{
					block.floors.map( (floor)=>{
						return <div key={floor._id} className="panel-group" role="tablist">
							<div className="panel panel-default">
								<div className="panel-heading" role="tab">
									<h4 className="panel-title">
										<table className="table table-bordered">
											<thead>
												<tr>
													<th className="table-column">Id</th>
													<th className="table-column">Number</th>
													<th className="table-column"></th>
												</tr>
											</thead>
											<tbody className="floors" onClick={ ()=>this.onToggle(floor._id) }>
												<tr>
													<td className="table-column">{floor._id}</td>
													<td className="table-column">{floor.number}</td>
													<td className="table-column"><button className="btn btn-default" onClick={ ()=>this.deleteFloor(block._id, floor._id) }>Remove Floor</button></td>
												</tr>
											</tbody>
										</table>
										<div id={floor._id} className="panel-collapse collapse" role="tabpanel">
											<div className="panel-body floors">
												<Rooms key={floor._id} floor={floor} block={block}/>
											</div>
										</div>
									</h4>
								</div>
							</div>
						</div>;
					})
				}
			</div>
		);
	}
}

Floors.propTypes = {
	block: React.PropTypes.object,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(Floors);