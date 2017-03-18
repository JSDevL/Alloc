const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('sessionsActions');
Object.assign(actions, require('alertActions'));

class SessionsInputs extends React.Component{
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

			_.each(this.refs, (ref, key)=>{ ref.value = '' });
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
			let newSessions = _.reject(this.props.sessions, function(session){ return session._id.toString() === removed._id.toString() });
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
						{
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

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		alert: state.alert
	};
})(SessionsInputs);