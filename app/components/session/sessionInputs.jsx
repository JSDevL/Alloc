const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('sessionsActions'));


class SessionInputs extends React.Component{
	componentWillMount(){
		if(_.isEmpty(this.props.sessions)){
			/* get initial Batches from DB */
			axios.get(`/sessions`).then( (response)=>{
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
	}

	addSession(e){
		e.preventDefault();
		axios.post("/sessions", {
			name: this.refs.name.value,
			start: this.refs.start.value,
			end: this.refs.end.value
		}).then( (response)=>{
			const session = response.data;
			/* update current sessions */
			this.props.sessions.push(session);
			/* dispatch updated */
			this.props.dispatch(actions.getSessions(this.props.sessions));
			this.props.dispatch(actions.setAlert(true, "Session added", "success"));
			// set inputs to blank
			_.each(this.refs, (ref, key)=>{ ref.value = ''; });
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

	removeSession(e, session){
		e.preventDefault();
		axios.delete(`/sessions/${session._id}`).then( (response)=>{
			const removed = response.data;
			/* update current sessions */
			let newSessions = _.reject(this.props.sessions, function(session){ return session._id.toString() === removed._id.toString(); });
			/* dispatch updated */
			this.props.dispatch(actions.getSessions(newSessions));
			this.props.dispatch(actions.setAlert(true, "Session updated", "success"));
		});
	}

	render(){
		return <div>
			<h4>Enter Sessions</h4>
			<table className="table table-bordered table-striped">
				<thead>
					<tr>
						<th>ID</th>
						<th>Session Name</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th></th>
					</tr>
				</thead>
					<tbody>
						{	!_.isEmpty(this.props.sessions) &&
							this.props.sessions.map( (session)=>{
								return <tr key={session._id}>
									<td>{session._id}</td>
									<td>{session.name}</td>
									<td>{session.start}</td>
									<td>{session.end}</td>
									<td>
										<div className="form-group">
											<button className="btn btn-default" onClick={(e)=>this.removeSession(e, session)}>Remove Session</button>
										</div>
									</td>
								</tr>;
							})
						}
						<tr>
							<td></td>
							<td>
								<div className="form-group">
									<select className="form-control" ref="name">
										<option value="morning">Morning</option>
										<option value="afternoon">Afternoon</option>
										<option value="evening">Evening</option>
									</select>
								</div>
							</td>
							<td>
								<div className="form-group">
									<input type="time" className="form-control" ref="start" />
								</div>
							</td>
							<td>
								<div className="form-group">
									<input type="time" className="form-control" ref="end"/>
								</div>
							</td>
							<td>
								<div className="form-group">
									<button type="submit" className="btn btn-default" onClick={(e)=>this.addSession(e)}>Add Session</button>
								</div>
							</td>
						</tr>
					</tbody>
			</table>
		</div>;
	}
}

SessionInputs.propTypes = {
	sessions: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		alert: state.alert
	};
})(SessionInputs);