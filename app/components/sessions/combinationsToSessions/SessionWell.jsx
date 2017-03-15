const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('alertActions');

class SessionWell extends React.Component{
	componentDidMount(){
		const component = this;
		$(`#combinations, #${this.props.session.name}`).sortable({
			connectWith: ".connectedSortable"
		}).disableSelection();

		$(this.refs.well).on("sortreceive", function( event, ui ){
			component.getBatch(ui.item, ui.sender, $(this));
		});

		$(this.refs.well).on("sortremove", function( event, ui ){
			component.removeBatch(ui.item, ui.receiver, $(this));
		});
	}

	getBatch(batch, from, to){
		const batch_ID = batch.attr('data-batch-id');
		const combi_ID = batch.attr('data-combi-id');
		axios.post(`/sessions/${this.props.session._id}/combinations`, {
			combi_ID: combi_ID,
			batch_ID: batch_ID
		}).then( (response)=>{
			this.props.dispatch(actions.setAlert(true, `batch assigned to ${to[0].id} from ${from[0].id}`, "success"));
		});
	}

	removeBatch(batch, to, from){
		const batch_ID = batch.attr('data-batch-id');
		const combi_ID = batch.attr('data-combi-id');
		axios.put(`/sessions/${this.props.session._id}/combinations`, {
			combi_ID: combi_ID,
			batch_ID: batch_ID
		}).then( (response)=>{
			this.props.dispatch(actions.setAlert(true, `batch removed from ${from[0].id}`, "success"));
		});
	}

	render(){
		return <div>
			<div className="page-header">
				<h3>{this.props.session.name} Session</h3>
			</div>
			<div id={this.props.session.name} className="well session-well connectedSortable" ref="well">
			{
				this.props.session.batches.map( (batchInSession)=>{
					let combi = _.find(this.props.combinations, function(combi){ return combi._id.toString() === batchInSession.combination.toString(); });
					let batch = _.find(combi.batches, function(batch){ return batch._id.toString() === batchInSession.batch.toString(); });

					return <a key={batch._id} className="btn btn-success" data-batch-id={batch._id} data-combi-id={combi._id}>
						{batch.year}{combi.name} <span className="badge">{batch.strength}</span>
					</a>;
				})
			}
			</div>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(SessionWell);