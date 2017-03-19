const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('stagesActions'));


/* all plugable components  */
const NavigationBar = require('plugins/NavigationBar');
const Jumbotron = require('plugins/Jumbotron');


class Home extends React.Component{

	componentWillMount(){
		if(!this.props.stages.prereqs){
			/* get stages state from DB */
			axios.get(`/stages/${$.cookie('userName')}`).then( (response)=>{
				this.props.dispatch(actions.getStages(response.data));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read user stages", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}
	}

	render(){
		return <div id="home">
			<NavigationBar/>

			<Jumbotron>
				<h1 className="logo">Alloc</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis</p>
			</Jumbotron>
			
			{ 
				!_.isEmpty(this.props.stages) &&
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

								<td className={this.props.stages.prereqs.building.state===true?`building done`:`building`}>
									<div>
										<h2><span className="glyphicon glyphicon-ok-sign"></span> Building Details</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<a className="btn btn-success" href="#/building">Enter track</a>
									</div>
								</td>

								<td className={this.props.stages.prereqs.combinations.state===true?`combi-and-sessions done`:`combi-and-sessions`}>
									<div>
										<h2><span className="glyphicon glyphicon-ok-sign"></span> Combination batch Details</h2>
										<div className="progress">
											<div className="progress-bar progress-bar-default" style={{width: 50+'%'}}>
												<p>Details</p>
											</div>
											<div className="progress-bar progress-bar-default" style={{width: 50+'%'}}>
												<p>Conflicts</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<a className="btn btn-success" href="#/batches">Enter track</a>
									</div>
								</td>

								<td className={this.props.stages.prereqs.sessions.state===true?`combi-and-sessions done`:`combi-and-sessions`}>
									<div>
										<h2><span className="glyphicon glyphicon-ok-sign"></span> Session Details</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<a className="btn btn-success" href="#/sessions">Enter track</a>
									</div>
								</td>
							</tr>

							<tr>
								<td className="stage">
									<div>
										<h1 className="text-success"><strong>Stage 2</strong></h1>
									</div>
								</td>

								<td className={this.props.stages.prereqs.building.state===true?`building done`:`building`}>
								</td>

								<td colSpan="2" className={this.props.stages.combinationsToSessions.state===true?`combi-and-sessions done`:`combi-and-sessions`}>
									<div>
										<h2><span className="glyphicon glyphicon-ok-sign"></span> Session Allotment</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<a className="btn btn-success" href="#/combinations-to-sessions">Enter track</a>
									</div>
								</td>
							</tr>

							<tr>
								<td className="stage">
									<div>
										<h1 className="text-success"><strong>Stage 3</strong></h1>
									</div>
								</td>
							
								<td colSpan="3" className={this.props.stages.allocation.state===true?`allocation done`:`allocation`}>
									<div>
										<h2><span className="glyphicon glyphicon-ok-sign"></span> Combination Allotment</h2>
										<div className="progress">
											<div className="progress-bar progress-bar-default" style={{width: 33.33+'%'}}>
												<p>Morning</p>
											</div>
											<div className="progress-bar progress-bar-default" style={{width: 33.33+'%'}}>
												<p>Afternoon</p>
											</div>
											<div className="progress-bar progress-bar-default" style={{width: 33.33+'%'}}>
												<p>Evening</p>
											</div>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
										<a className="btn btn-success" href="#/allocation">Enter track</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			}
			
		</div>;
	}
}

Home.propTypes = {
	stages: React.PropTypes.object,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		stages: state.stages,
		alert: state.alert
	};
})(Home);
