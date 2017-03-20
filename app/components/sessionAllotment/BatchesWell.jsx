const React = require('react');
// const axios = require('axios');
const {connect} = require('react-redux');


class BatchesWell extends React.Component{
	componentWillMount(){
		// batches contained in all sessions
		let batchesInSessions = [];
		_.each(this.props.sessions, function(session){
			batchesInSessions = [
				...batchesInSessions,
				...session.batches
			];
		});

		// batches not in sessions
		this.batchesNotInSessions = _.reject(this.props.batches, function(batch){
			return _.find(batchesInSessions, function(batchInSession){ return batchInSession._id.toString() === batch._id.toString(); });
		});
	}

	render(){
		return <div>
			<div className="page-header">
				<h3>Combinations</h3>
			</div>
			<div id="combinations" className="well connectedSortable" ref="well">
				{
					this.batchesNotInSessions.map( (batch)=>{
						return <a key={batch._id} className="btn btn-success" data-batch-id={batch._id} data-strength={batch.strength}>
							{batch.year}{batch.combination} <span className="badge">{batch.strength}</span>
						</a>;
					})
				}
			</div>
		</div>;
	}
}

BatchesWell.propTypes = {
	batches: React.PropTypes.array,
	sessions: React.PropTypes.array
};

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		batches: state.batches,
	};
})(BatchesWell);