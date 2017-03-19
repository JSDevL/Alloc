const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
const {hashHistory} = require('react-router');
const actions = require('alertActions');
Object.assign(actions, require('stagesActions'));

class StageValidator extends React.Component{

	componentWillMount(){
		var toFinalise = this.props.stage;

		/* don't allow on page if previous stage not complete */
		if( toFinalise === "combinationsToSessions" ){
			if( this.props.stages.prereqs.subStages.combinations.state === false || this.props.stages.prereqs.subStages.sessions.state === false ){
				this.props.dispatch(actions.setAlert(true, "Previous stages need to be finalised", "danger"));
				hashHistory.push('/home');
			} else if ( this.props.stages[toFinalise].state === true ){
				this.props.stages[toFinalise].state = false;
				this.updateStages();
			}
		}

		/* don't allow on page if previous stage not complete */
		else if( toFinalise === "allocation" ){
			if( this.props.stages.prereqs.subStages.building.state === false || this.props.stages.combinationsToSessions.state === false ){
				this.props.dispatch(actions.setAlert(true, "Previous stages need to be finalised", "danger"));
				hashHistory.push('/home');
			} else if ( this.props.stages[toFinalise].state === true ){
				this.props.stages[toFinalise].state = false;
				this.updateStages();
			}
		}

		/* get stages state from DB and reset */
		else if( toFinalise === "building" || toFinalise === "combinations" || toFinalise === "sessions" ){
			if( this.props.stages.prereqs.subStages[toFinalise].state === true ){
				this.props.stages.prereqs.subStages[toFinalise].state = false;
				this.updateStages();
			}
		}
	}

	finalise(){
		const toFinalise = this.props.stage;
		if( toFinalise === "building" || toFinalise === "combinations" || toFinalise === "sessions" ){
			this.props.stages.prereqs.subStages[toFinalise].state = true;
		} else {
			this.props.stages[toFinalise].state = true;
		}

		this.updateStages();

		hashHistory.push('/home');
	}

	updateStages(){
		/* set stages state to DB */
		axios.put(`/stages`, {
			userName: $.cookie('userName'),
			stages: this.props.stages
		}).then( (response)=>{
			this.getStages(this.props.stages);
			this.props.dispatch(actions.setAlert(true, "Stage status changed", "success"));
		});
	}

	render(){
		return <div className="row">
			<div className="col-xs-12">
				<hr/>
				<p>To proceed to the next stage, respective dependencies from previous page need to be finalised</p>
				<button className="btn btn-success" onClick={()=>this.finalise()}>Finalize</button>
			</div>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		stages: state.stages,
		alert: state.alert
	};
})(StageValidator);
