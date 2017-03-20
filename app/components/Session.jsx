const React = require('react');


/*  all pluggable components   */
const NavigationBar = require('plugins/NavigationBar');
const Jumbotron = require('plugins/Jumbotron');


/* all child components */
const SessionInputs = require('./session/SessionInputs.jsx');


class Session extends React.Component{
	render(){
		return (
            <div>
				<NavigationBar/>

				<Jumbotron>
					<h1>Sessions</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
				</Jumbotron>
				
				<div className="container">
					<SessionInputs/>
				</div>
            </div>
		);
	}
}

module.exports = Session;