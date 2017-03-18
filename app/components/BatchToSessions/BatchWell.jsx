const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('alertActions');

class CombinationsWell extends React.Component{
	componentWillMount(){
		// batches contained in all sessions
		let batchesInSessions = [];
		_.each(this.props.sessions, function(session){
			batchesInSessions = [
				...batchesInSessions,
				...session.batches
			];
		});

		// all availableBatches
		this.availableBatches = [];
		_.each(this.props.combinations, (combi)=>{
			_.each(combi.batches, (batch)=>{
				if( !_.find(batchesInSessions, function(batchInSession){ return batchInSession.batch.toString() == batch._id.toString(); }) ){
					this.availableBatches.push(
						<a key={batch._id} className="btn btn-success" data-batch-id={batch._id} data-combi-id={combi._id} data-strength={batch.strength}>
							{batch.year}{combi.name} <span className="badge">{batch.strength}</span>
						</a>
					);
				}
			});	
		});
	}

	render(){
		return <div>
			<div className="page-header">
				<h3>Combinations</h3>
			</div>
			<div id="combinations" className="well connectedSortable" ref="well">
				{this.availableBatches}
			</div>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(CombinationsWell);