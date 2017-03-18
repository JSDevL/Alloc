const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));
/* all child components */
const Track = require('./Track.jsx');
const Levels = require('./combinationsInputs/Levels.jsx');

class CombinationsInputs extends React.Component{
	componentDidMount(){
		/* get initial combinations from DB */
		axios.get(`/combinations`).then( (response)=>{
			const allCombis = response.data;
			this.props.dispatch(actions.getCombis(allCombis));
			this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
		}).catch( (error)=>{
            /* The request was made, but the server responded with a status code that falls out of the range of 2xx */
			if(!error.response){
				/* standard error occured */
				return console.log(error);
			}
		});
	}

	render(){
		return (
			<div>
				<Track status={[1, 0]}/>
				<Levels level="UG"/>
				<hr />
				<Levels level="PG"/>
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(CombinationsInputs);
