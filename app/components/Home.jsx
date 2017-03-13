const React = require('react');

/*  all child components   */
const NavigationBar = require('NavigationBar');

class Home extends React.Component{
	render(){
		return (
            <div id="home">
				<NavigationBar/>
				<div className="jumbotron">
					<div className="container">
						<h1 className="logo">Alloc</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis</p>
					</div>
				</div>
				<div className="container">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
					<div className="page-header track">
						<h1>Prerequisites <small>Subtext for header</small></h1>
						<div className="progress">
							<div className="progress-bar progress-bar-success" style={{width: 33.33+'%'}}>
								<p><span className="badge">1</span> Building and Benches</p>
							</div>
							<div className="progress-bar progress-bar-warning" style={{width: 33.33+'%'}}>
								<p><span className="badge">2</span> Combination and Conflicts</p>
							</div>
							<div className="progress-bar progress-bar-warning" style={{width: 33.33+'%'}}>
								<p><span className="badge">3</span> Combination Details</p>
							</div>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
						<button className="btn btn-default">Continue track</button>
					</div>

					<div className="page-header track inaccessible">
						<h1>Sessions <small>Subtext for header</small></h1>
						<div className="progress">
							<div className="progress-bar progress-bar-warning" style={{width: 50+'%'}}>
								<p>Sessions</p>
							</div>
							<div className="progress-bar progress-bar-warning" style={{width: 50+'%'}}>
								<p>Combinations and Sessions</p>
							</div>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
					</div>

					<div className="page-header track inaccessible">
						<h1>Allotment <small>Subtext for header</small></h1>
						<div className="progress">
							<div className="progress-bar progress-bar-success" style={{width: 33.33+'%'}}>
								<p>Morning</p>
							</div>
							<div className="progress-bar progress-bar-warning" style={{width: 33.33+'%'}}>
								<p>Afternoon</p>
							</div>
							<div className="progress-bar progress-bar-success" style={{width: 33.33+'%'}}>
								<p>Evening</p>
							</div>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
					</div>
				</div>
            </div>
		);
	}
}

module.exports = Home;
