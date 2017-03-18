const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/*  all required actions   */
const actions = require('sessionsActions');
Object.assign(actions, require('alertActions'));
/* all child components */
const StageValidator = require('StageValidator');
const NavigationBar = require('NavigationBar');
const Jumbotron = require('Jumbotron');
const SessionWell = require('./combinationsToSessions/SessionWell.jsx');
const CombinationsWell = require('./combinationsToSessions/CombinationsWell.jsx');

class CombinationsToSessions extends React.Component{
	constructor(props){
		super(props);
		/* get combinations from DB */
		axios.get(`/combinations`).then( (response)=>{
			const allCombis = response.data;
			this.props.dispatch(actions.getCombis(allCombis));
		}).catch( (error)=>{
			return console.log(error);
		});
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
						<h1>Session Allotment</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
				</Jumbotron>

				<div className="container">
					<div className="row">
						<div className="col-xs-6">
							{
								( () => {
									if(this.props.combinations.length && this.props.sessions.length){
										return this.props.sessions.map( (session)=>{
											return <SessionWell key={session._id} session={session} combinations={this.props.combinations}/>;
										});
									}
								} )()
							}
						</div>
						<div className="col-xs-6">
							{
								( () => {
									if(this.props.combinations.length && this.props.sessions.length){
										return <CombinationsWell sessions={this.props.sessions} combinations={this.props.combinations}/>;
									}
								} )()
							}
						</div>
					</div>
					<StageValidator stage="combinationsToSessions"/>
				</div>
            </div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		combinations: state.combinations
	};
})(CombinationsToSessions);
