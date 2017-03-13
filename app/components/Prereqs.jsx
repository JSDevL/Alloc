const React = require('react');

/*  all child components   */
const NavigationBar = require('NavigationBar');

class Prereqs extends React.Component{
	render(){
		return (
            <div>
				<NavigationBar/>

				<div className="jumbotron">
					<div className="container">
						<h1>Prereqs</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
					</div>
				</div>
				
				<div className="container">
					{this.props.children}
				</div>
            </div>
		);
	}
}

module.exports = Prereqs;
