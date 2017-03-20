const React = require('react');


/*  all pluggable components   */
const NavigationBar = require('./plugins/NavigationBar');
const Jumbotron = require('./plugins/Jumbotron');


/* all child components */
const CampusInputs = require('./campus/CampusInputs.jsx');


class Campus extends React.Component{
	render(){
		return (
            <div>
				<NavigationBar/>

				<Jumbotron>
					<h1>Campus Details</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
				</Jumbotron>
				
				<div className="container">
					<CampusInputs/>
				</div>
            </div>
		);
	}
}

module.exports = Campus;