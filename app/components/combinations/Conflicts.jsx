const _ = require('underscore');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));

class Conflicts extends React.Component{
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
								return <button key={combi.name+"-"+currentCombi.name} className="btn btn-danger">{combi.name}</button>;
							else
								return <button key={combi.name+"-"+currentCombi.name} className="btn btn-default">{combi.name}</button>;
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
