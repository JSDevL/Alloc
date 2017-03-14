const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('sessionsActions');
Object.assign(actions, require('alertActions'));
Object.assign(actions, require('combinationsActions'));
/* all child components */
const Track = require('./Track.jsx');

class SessionInputs extends React.Component{
	componentDidMount(){
		/* get combinations from DB */
		axios.get(`/combinations`).then( (response)=>{
			const allCombis = response.data;
			this.props.dispatch(actions.getCombis(allCombis));
			this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
		}).catch( (error)=>{
			if(!error.response){
				/* standard error occured */
				return console.log(error);
			}
		});


		//const component = this;

		// $( "#combinations, #morning, #afternoon, #evening" ).sortable({
		// 	connectWith: ".connectedSortable"
		// }).disableSelection();

		// $( "#morning" ).on( "sortreceive", function( event, ui ) {
		// 	component.myLogger(ui.item, ui.sender, $(this));
		// } );
	}

	// myLogger(item, sender, receiver){
	// 	console.log(item, sender[0].id, receiver[0].id);
	// }

	render(){
		return (
			<div>
				<Track status={[0, 1]}/>
				<div className="row">
					<div className="col-xs-6">
						{
							this.props.sessions.map( function(session){
								return <div key={session._id}>
									<div className="page-header">
										<h3>{session.name} Session</h3>
									</div>
									<div id={session.name} className="well connectedSortable">
									</div>
								</div>;
							})
						}
					</div>
					<div className="col-xs-6">
						<div className="page-header">
							<h3>Combinations</h3>
						</div>
						<div id="combinations" className="well connectedSortable">
							{
								this.props.combinations
							}
							<a className="btn btn-success">1 BCA <span className="badge">34</span></a>
						</div>
					</div>
				</div>
            </div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		alert: state.alert
	};
})(SessionInputs);
