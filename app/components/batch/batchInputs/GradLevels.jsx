const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all child components */
const Conflicts = require('./Conflicts.jsx');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));


class Levels extends React.Component{
	addCombination(e){
		e.preventDefault();
		/* On adding combination, create multiple batches for combinations depending on gradLevel*/
		const years = this.props.gradLevel === "UG" ? 3 : 2;
		let year = 1;
		while( year<=years )
			axios.post('/batches', {
				combination: this.refs.combination.value,
				year: year++,
				gradLevel: this.props.gradLevel,
			}).then( (response)=>{
				this.props.dispatch(actions.getBatches([
					...this.props.batches,
					response.data
				]));
				this.props.dispatch(actions.setAlert(true, "Added Combination", "success"));
			}).catch( (error)=>{
				/* The request was made, but the server responded with a status code that falls out of the range of 2xx */
				if( error.response.data.errors ){
					let messages = [];
					_.each(error.response.data.errors, (error)=>{
						messages.push( error.message );
						$(this.refs[ error.path ]).addClass('greened');
					});
					this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
				} else if( error.response.data.message ) {
					this.props.dispatch(actions.setAlert(true, error.response.data.message, "danger"));
				}
			});
	}

	removeCombination(e, combination){
		e.preventDefault();
		/* remove all batches belonging to combination */
		axios.delete(`/batches/${this.combinations[combination][0]._id}`).then( (response)=>{
			this.props.dispatch(actions.getBatches(response.data));
			this.props.dispatch(actions.setAlert(true, "Removed Combination", "success"));
		});
	}

	getCombinationsForGradLevel(){
		/* filter out gradLevel batches */
		const gradLevelBatches = _.filter(this.props.batches, (batch)=>{ return batch.gradLevel === this.props.gradLevel; }); 
		/* group incoming batches by combinations */
		this.combinations = _.groupBy(gradLevelBatches, "combination");
	}

	componentWillReceiveProps(){
		this.getCombinationsForGradLevel();
	}

	componentWillMount(){
		this.getCombinationsForGradLevel();
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Batches for {this.props.gradLevel}</div>

				<div className="panel-body">
					<form className="form-inline">
						<div className="form-group">
							<label>Combination:</label>
							<input type="text" className="form-control" ref="combination"/>
						</div>
						<button className="btn" onClick={(e)=>this.addCombination(e)}>Add Combination</button>
					</form>
				</div>

				<table className="table table-bordered">
					<thead>
						{ 
							(_.find(this.props.batches, (batch)=>{ return batch.gradLevel === this.props.gradLevel; }) ) &&
							<tr>
								<th>Combination</th>
								<th>Conflicts</th>
								<th></th>
							</tr>
						}
					</thead>
					<tbody>
						{
							( ()=>{
								const rows = [];
								_.each(this.combinations, (batches, combination)=>{
									rows.push( <tr key={combination}>
										<td>{combination}</td>
										<td><Conflicts combinations={this.combinations} combination={combination}/></td>
										<td><button className="btn" onClick={ (e)=>this.removeCombination(e, combination) }>Remove Combination</button></td>
									</tr> );
								});
								return rows;
							} )()
						}
					</tbody>
				</table>
			</div>
		);
	}
}

Levels.propTypes = {
	batches: React.PropTypes.array,
	alert: React.PropTypes.object,
	gradLevel: React.PropTypes.string,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(Levels);