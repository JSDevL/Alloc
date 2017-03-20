const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('sessionsActions'));


class SessionsWell extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			strength: 0
		};
	}

	componentWillMount(){
		// before render calculate strength
		// get strength by adding strength of all batches in sessions
		let strength = 0;
		_.each(this.props.session.batches, (batch)=>{
			strength += batch.strength;
		});
		this.setState({
			strength: strength
		});
	}

	componentDidMount(){
		/* make both wells sortable */
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
		/* create new batch for session */
		axios.post(`/sessions/${this.props.session._id}/batches`, {
			batch: batch.attr('data-batch-id')
		}).then( (response)=>{
			this.setState({
				strength: this.state.strength + parseInt(batch.attr('data-strength'))
			});
			this.props.dispatch(actions.setAlert(true, `batch assigned to ${to[0].id} from ${from[0].id}`, "success"));
		});
	}

	removeBatch(batch, to, from){
		/*  delete batch from session */
		axios.delete(`/sessions/${this.props.session._id}/batches/${batch.attr('data-batch-id')}`).then( (response)=>{
			this.setState({
				strength: this.state.strength - parseInt(batch.attr('data-strength'))
			});
			this.props.dispatch(actions.setAlert(true, `batch removed from ${from[0].id}`, "success"));
		});
	}

	render(){
		return <div>
			<div className="page-header session-well-header">
				<h3>{this.props.session.name} Session <span className="badge">{this.state.strength}</span></h3>
			</div>
			<div id={this.props.session.name} className="well session-well connectedSortable" ref="well">
			{	
				this.props.session.batches.map( (batch)=>{
					return <a key={batch._id} className="btn btn-success" data-batch-id={batch._id} data-strength={batch.strength}>
						{batch.year}{batch.combination} <span className="badge">{batch.strength}</span>
					</a>;
				})
			}
			</div>
		</div>;
	}
}

SessionsWell.propTypes = {
	sessions: React.PropTypes.array,
	session: React.PropTypes.object,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		alert: state.alert
	};
})(SessionsWell);