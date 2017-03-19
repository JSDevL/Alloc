const React = require('react');
// const axios = require('axios');
// const {connect} = require('react-redux');


/* all child components */
const Details = require('./Details.jsx');


class Years extends React.Component{
	render(){
		return (
			<div>
				<ul className="nav nav-tabs" role="tablist">
				{
					this.props.combiBatches.map( (batch)=>{
						return <li role="presentation" key={"presentational"+batch.combination+batch.year}>
							<a className={(batch.prefix && batch.strength)?"greened":""} href={"#"+batch.combination+batch.year} role="tab" data-toggle="tab">
								year {batch.year}
							</a>
						</li>;
					})
				}
				</ul>
				
				<div className="tab-content">
				{
					this.props.combiBatches.map( (batch)=>{
						return <div role="tabpanel" key={"tab"+batch.combination+batch.year} className="tab-pane" id={batch.combination+batch.year}>
							<br/>
							<Details batch={batch}/>
						</div>;
					})
				}
				</div>
			</div>
		);
	}
}

Years.propTypes = {
	combiBatches: React.PropTypes.array,
};

module.exports = Years;