const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all child components */
const Forms = require('./Forms.jsx');

class Levels extends React.Component{
	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">{this.props.level} combinations</h3>
				</div>
				<div className="panel-body">
					<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					{
						this.props.combinations.map( (combi)=>{
							if( combi.gradLevel === this.props.level )
								return <div key={this.props.level+'-'+combi.name} className="panel panel-default">
									<div className="panel-heading" role="tab" id={"panel-"+combi.name}>
										<h4 className="panel-title">
											<a role="button" data-toggle="collapse" data-parent="#accordion" href={"#accordian-"+combi.name} aria-expanded="false" aria-controls="collapseOne">
												{combi.name}
											</a>
										</h4>
									</div>
									<div id={"accordian-"+combi.name} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"panel-"+combi.name}>
										<div className="panel-body">
											<Forms combi={combi}/>
										</div>
									</div>
								</div>;
						})
					}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(Levels);
