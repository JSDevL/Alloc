const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('sessionsActions');
Object.assign(actions, require('alertActions'));
/*  all child components   */
const StageValidator = require('StageValidator');
const NavigationBar = require('NavigationBar');
const Jumbotron = require('Jumbotron');
const SessionsInputs = require('sessions/SessionsInputs');

class Sessions extends React.Component{

	constructor(props){
		super(props);
		/* get sessions from DB */
		axios.get('/sessions').then( (response)=>{
			const sessions = response.data;
			this.props.dispatch(actions.getSessions(sessions));
			this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
		}).catch( (error)=>{
			return console.log(error);
		});
	}

	render(){
		return (
            <div>
				<NavigationBar/>

				<Jumbotron>
					<h1>Sessions</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
				</Jumbotron>
				
				<div className="container">
					<SessionsInputs/>
					<StageValidator stage="sessions"/>
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
})(Sessions);