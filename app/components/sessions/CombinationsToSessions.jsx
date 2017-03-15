const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all child components */
const Track = require('./Track.jsx');
const SessionWell = require('./combinationsToSessions/SessionWell.jsx');
const CombinationsWell = require('./combinationsToSessions/CombinationsWell.jsx');

class CombinationsToSessions extends React.Component{
	render(){
		return (
			<div>
				<Track status={[0, 1]}/>
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
