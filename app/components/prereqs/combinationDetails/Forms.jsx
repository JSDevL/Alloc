const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all child components */
const Form = require('./Form.jsx');

class Forms extends React.Component{
	render(){
		const combi = this.props.combi;
		return (
			<div>
				<ul className="nav nav-tabs" role="tablist">
				{
					( ()=>{
						const years = [];
						for(let i=0; i<combi.duration; i++){
							years.push(
								<li role="presentation" key={"presentational"+combi.name+i}>
									<a href={"#"+combi.name+i} aria-controls={combi.name+i} role="tab" data-toggle="tab">
										year {i+1}
									</a>
								</li>
							);
						}
						return years;
					} )()
				}
				</ul>
				
				<div className="tab-content">
				{
					( ()=>{
						const years = [];
						for(let i=0; i<combi.duration; i++){
							years.push(
								<div role="tabpanel" key={"tab"+combi.name+i} className="tab-pane" id={combi.name+i}>
									<br/>
									<Form combi={combi} year={i}/>
								</div>
							);
						}
						return years;
					} )()
				}
				</div>
			</div>
		);
	}
}

module.exports = Forms;
