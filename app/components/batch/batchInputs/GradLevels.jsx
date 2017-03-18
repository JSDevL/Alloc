const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));
/* all child components */
// const Conflicts = require('./Conflicts.jsx');

class Levels extends React.Component{
	addBatch(){
	}

	removeBatch(batch){
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Batches for {this.props.level}</div>

				<div className="panel-body">
					<form className="form-inline">
						<div className="form-group">
							<label>batchnation:</label>
							<input type="text" className="form-control" ref="batchnation"/>
						</div>
						<div className="form-group">
							<label>Year:</label>
							<input type="text" className="form-control" ref="year"/>
						</div>
						<button className="btn" onClick={()=>this.addBatch()}>Add batch</button>
					</form>
				</div>

				<table className="table table-bordered">
					<thead>
						{
							( ()=>{
								if( _.find(this.props.batches, (batch)=>{ return batch.gradLevel === this.props.level }) ){
									return <tr>
										<th>ID</th>
										<th>Combination</th>
										<th>Conflicts</th>
										<th></th>
									</tr>;
								}
							} )()
						}
					</thead>
					<tbody>
						{
							this.props.batches.map( (batch)=>{
								if( batch.gradLevel === this.props.level )
									return <tr key={batch._id}>
										<td>{batch._id}</td>
										<td>{batch.name}</td>
										
										<td><button className="btn" onClick={ ()=>this.removeBatch(batch) }>Remove</button></td>
									</tr>;
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(Levels);
//<td><Conflicts batch={batch}/></td>