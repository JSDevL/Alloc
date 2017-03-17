const React = require('react');

/*  all child components   */
const NavigationBar = require('NavigationBar');
const Jumbotron = require('Jumbotron');

class Home extends React.Component{
	render(){
		return (
            <div id="home">
				<NavigationBar/>

				<Jumbotron>
					<h1 className="logo">Alloc</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis</p>
				</Jumbotron>
				
				<div className="container">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>

					<hr/>

					<table id="track-table" className="table table-hover">
						<tbody>
							<tr>
								<td className="stage">
									<div>
										<h1 className="text-success"><strong>Stage 1</strong></h1>
									</div>
								</td>

								<td className="building">
									<div>
										<h2>Building Details</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<button className="btn btn-success">Enter track</button>
									</div>
								</td>

								<td className="combi-and-sessions">
									<div>
										<h2>Combination Details</h2>
										<div className="progress">
											<div className="progress-bar progress-bar-success active" style={{width: 50+'%'}}>
												<p>Details</p>
											</div>
											<div className="progress-bar progress-bar-default" style={{width: 50+'%'}}>
												<p>Conflicts</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<button className="btn btn-success">Enter track</button>
									</div>
								</td>

								<td className="combi-and-sessions">
									<div>
										<h2>Session Details</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<button className="btn btn-success">Enter track</button>
									</div>
								</td>
							</tr>

							<tr>
								<td className="stage">
									<div>
										<h1 className="text-success"><strong>Stage 2</strong></h1>
									</div>
								</td>

								<td className="building">

								</td>

								<td colSpan="2" className="combi-and-sessions">
									<div>
										<h2>Session Allotment</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<button className="btn btn-success">Enter track</button>
									</div>
								</td>
							</tr>

							<tr>
								<td className="stage">
									<div>
										<h1 className="text-success"><strong>Stage 3</strong></h1>
									</div>
								</td>
							
								<td colSpan="3" className="allocation">
									<div>
										<h2>Combination Allotment</h2>
										<div className="progress">
											<div className="progress-bar progress-bar-success active" style={{width: 33.33+'%'}}>
												<p>Morning</p>
											</div>
											<div className="progress-bar progress-bar-warning" style={{width: 33.33+'%'}}>
												<p>Afternoon</p>
											</div>
											<div className="progress-bar progress-bar-success active" style={{width: 33.33+'%'}}>
												<p>Evening</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<button className="btn btn-success">Enter track</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
            </div>
		);
	}
}

module.exports = Home;
