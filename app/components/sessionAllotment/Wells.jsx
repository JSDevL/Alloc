const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('sessionsActions'));


/* all child components */
const SessionsWell = require('./SessionsWell.jsx');
const BatchesWell = require('./BatchesWell.jsx');


class SessionAllotment extends React.Component{
	componentWillMount(){
		if(_.isEmpty(this.props.sessions) || this.props.sessions.batches[0].match(/^[0-9a-fA-F]{24}$/) ){
			/* if empty or not populated get initial sessions with populated batches from DB */
			axios.get(`/sessions/populated`).then( (response)=>{
				this.props.dispatch(actions.getSessions(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read sessions", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}

		if(_.isEmpty(this.props.batches)){
			/* get initial Batches from DB */
			axios.get(`/batches`).then( (response)=>{
				this.props.dispatch(actions.getBatches(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read batches", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}
	}

	render(){
		return (
			<div>
				<div className="row">
					<div className="col-xs-6">
						{	(!_.isEmpty(this.props.sessions) && !_.isEmpty(this.props.batches)) &&
							this.props.sessions.map( (session)=>{
								return <SessionsWell key={session._id} session={session}/>;
							})
						}
					</div>
					<div className="col-xs-6">
						{	(!_.isEmpty(this.props.sessions) && !_.isEmpty(this.props.batches)) &&
							<BatchesWell/>
						}
					</div>
				</div>
            </div>
		);
	}
}

SessionAllotment.propTypes = {
	batches: React.PropTypes.array,
	sessions: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		batches: state.batches
	};
})(SessionAllotment);