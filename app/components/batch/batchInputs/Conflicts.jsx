const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));


class Conflicts extends React.Component{
	toggleConflict(isConflicting, combination, target){
		// toggle conflicts for current and for targetr
		if(isConflicting){
			// if combination is conflicting with target, remove from conflicts
			axios.put(`/batches/${this.props.combinations[combination][0]._id}/remove-conflict`, {
				target: target
			}).then( (response)=>{
				this.props.dispatch(actions.getBatches(response.data));
				this.props.dispatch(actions.setAlert(true, "updated", "success"));
			});
		} else {
			axios.put(`/batches/${this.props.combinations[combination][0]._id}/add-conflict`, {
				target: target
			}).then( (response)=>{
				this.props.dispatch(actions.getBatches(response.data));
				this.props.dispatch(actions.setAlert(true, "updated", "success"));
			});
		}
	}

	render(){
		return (
			<div>
				{
					( ()=>{
						const rows = [];
						_.each(this.props.combinations, (batches, combination)=>{
							// if combination not current combination
							if(combination !== this.props.combination){
								// if combination conflicting with current combination
								if( _.find(this.props.combinations[this.props.combination][0].conflicts, (conflict)=>{return conflict===combination;}) )
									rows.push(<button key={combination+"-"+this.props.combination} className="btn btn-danger" onClick={()=>this.toggleConflict(1, this.props.combination, combination)}>{combination}</button>);
								else
									rows.push(<button key={combination+"-"+this.props.combination} className="btn btn-default" onClick={()=>this.toggleConflict(0, this.props.combination, combination)}>{combination}</button>);
							}
						});
						return rows;
					} )()
				}
			</div>
		);
	}
}

Conflicts.propTypes = {
	combination: React.PropTypes.string,
	combinations: React.PropTypes.object,
	batches: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(Conflicts);
