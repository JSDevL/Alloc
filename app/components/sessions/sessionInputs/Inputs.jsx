const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('sessionsActions');
Object.assign(actions, require('alertActions'));

class Inputs extends React.Component{
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
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
			let err = error.response.data;
            /* if err object contains validation errors */
			if(err.errors){
				let messages = [];
				for( error in err.errors ){
                    /* get all messages */
					messages.push( err.errors[error].message );
                    /* add classes to input fields */
					$(this.refs[err.errors[error].path]).addClass('bg-danger');
				}
				this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
			} else {
				this.props.dispatch(actions.setAlert(true, err.message, "danger"));
			}
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
											<button className="btn btn-default">Remove Session</button>
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
})(Inputs);