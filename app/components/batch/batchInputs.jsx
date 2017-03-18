const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));
/* all child components */
const Track = require('./Track.jsx');
const GradLevels = require('./batchInputs/GradLevels.jsx');

class BatchInputs extends React.Component{
	componentWillMount(){
		/* get initial Batches from DB */
		axios.get(`/batches`).then( (response)=>{
			this.props.dispatch(actions.getBatches(response.data));
			this.props.dispatch(actions.setAlert(true, "Loaded Batches", "success"));
		}).catch( (error)=>{
            /* The request was made, but the server responded with a status code that falls out of the range of 2xx */
			if(!error.response){
				/* standard error occured */
				return console.log(error);
			}
		});
	}

	render(){
		return <div>
			<Track status={[1, 0]}/>
			<GradLevels level="UG"/>
			<hr />
			<GradLevels level="PG"/>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(BatchInputs);