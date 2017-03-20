const React = require('react');


/*  all pluggable components   */
const NavigationBar = require('plugins/NavigationBar'); 
const Jumbotron = require('plugins/Jumbotron');


/* all child components */
const Session = require('./allocation/Session.jsx');


class Allocation extends React.Component{
	componentWillMount(){
		if(_.isEmpty(this.props.batches)){
			/* get initial Batches from DB */
			axios.get(`/batches`).then( (response)=>{
				this.props.dispatch(actions.getBatches(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded Batches", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read batches", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}
	}

	render(){
		return (
            <div>
				<NavigationBar/>

				<Jumbotron>
					<h1>Allocation</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque ex sit amet nisl sagittis, et semper mi lobortis. Suspendisse interdum, augue vel congue dapibus, ante sem dapibus leo, eget dignissim tortor eros at libero. Praesent cursus mattis vestibulum. Nullam felis ligula, consequat a vestibulum vel, ullamcorper nec diam.</p>
				</Jumbotron>
				
				<div className="container">
					<Session/>
				</div>
            </div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		alert: state.alert
	};
})(Allocation);
