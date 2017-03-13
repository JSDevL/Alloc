const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));

class Conflicts extends React.Component{
	toggleConflict(isConflicting, currentCombi, otherCombi){
		// add conflicts for current and for other
		axios.put(`/combinations`, {
			isConflicting: isConflicting,
			current: currentCombi,
			other: otherCombi
		}).then( (response)=>{
			// to fill
			const updatedCombis = response.data;
			this.props.dispatch(actions.getCombis(updatedCombis));
			this.props.dispatch(actions.setAlert(true, "updated", "success"));
		});
	}

	render(){
		const currentCombi = this.props.combi;
		const currentCombiConflicts = this.props.combi.conflicts;
		return (
			<div>
				{
					this.props.combinations.map( (combi)=>{
						// shouldn't be checking conflict for currentCombi and for different level
						if( combi._id.toString() !== currentCombi._id.toString() && combi.gradLevel === currentCombi.gradLevel ){
							// check if combi belongs to conflicts array
							if( _.find(currentCombiConflicts, function(conflict){ return conflict._id.toString() === combi._id.toString() }) )
								return <button key={combi.name+"-"+currentCombi.name} className="btn btn-danger" onClick={()=>this.toggleConflict(1, currentCombi, combi)}>{combi.name}</button>;
							else
								return <button key={combi.name+"-"+currentCombi.name} className="btn btn-default" onClick={()=>this.toggleConflict(0, currentCombi, combi)}>{combi.name}</button>;
						}
					})
				}
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(Conflicts);
