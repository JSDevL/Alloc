const React = require('react');
// const axios = require('axios');
const {connect} = require('react-redux');


/* all child components */
const Years = require('./Years.jsx');


class GradLevels extends React.Component{
	componentWillMount(){
		/* filter out gradLevel batches */
		const gradLevelBatches = _.filter(this.props.batches, (batch)=>{ return batch.gradLevel === this.props.gradLevel; }); 
		/* group incoming batches by combinations */
		this.combinations = _.groupBy(gradLevelBatches, "combination");
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">{this.props.gradLevel} batches</h3>
				</div>
				<div className="panel-body">
					<div className="panel-group" id="accordion" role="tablist">
					{
						( ()=>{
							const rows = [];
							_.each(this.combinations, (batches, combination)=>{
								rows.push(
									<div key={this.props.gradLevel+'-'+combination} className="panel panel-default">
										<div className="panel-heading" data-toggle="collapse" role="tab" id={"panel-"+combination}>
											<h4 className="panel-title">
												<a role="button" data-toggle="collapse" data-parent="#accordion" href={"#accordian-"+combination}>
													{combination}
												</a>
											</h4>
										</div>
										<div id={"accordian-"+combination} className="panel-collapse collapse" role="tabpanel">
											<div className="panel-body">
												<Years combiBatches={batches}/>
											</div>
										</div>
									</div>
								);
							});
							return rows;
						} )()
					}
					</div>
				</div>
			</div>
		);
	}
}

GradLevels.propTypes = {
	gradLevel: React.PropTypes.string, 
	batches: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(GradLevels);
