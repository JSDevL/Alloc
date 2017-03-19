const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));


/* all child components */
const Track = require('./Track.jsx');
const GradLevels = require('./batchDetails/GradLevels.jsx');


class BatchDetails extends React.Component{
	componentWillMount(){
		if(_.isEmpty(this.props.batches)){
			/* get initial Batches from DB */
			axios.get(`/batches`).then( (response)=>{
				this.props.dispatch(actions.getBatches(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded Batches", "success"));
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
		return <div>
			<Track status={[0, 1]}/>

			{	!_.isEmpty(this.props.batches) &&
				<div>
					<GradLevels gradLevel="UG"/>
					<hr />
					<GradLevels gradLevel="PG"/>
				</div>
			}
		</div>;
	}
}

BatchDetails.propTypes = {
	batches: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(BatchDetails);