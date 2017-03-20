const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/*  all pluggable components   */
const NavigationBar = require('plugins/NavigationBar'); 
const Jumbotron = require('plugins/Jumbotron');


/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('sessionsActions'));
Object.assign(actions, require('blocksActions'));


/* all child components */
// const Session = require('./allocation/Session.jsx');


class Allocation extends React.Component{
	componentWillMount(){
		if(_.isEmpty(this.props.sessions)){
			/* get initial sessions from DB */
			axios.get(`/sessions`).then( (response)=>{
				this.props.dispatch(actions.getSessions(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded Sessions", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read sessions", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}

		if(_.isEmpty(this.props.blocks)){
			/* get initial blocks from DB */
			axios.get(`/blocks`).then( (response)=>{
				this.props.dispatch(actions.getBlocks(response.data));
				this.props.dispatch(actions.setAlert(true, "Loaded blocks", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read blocks", "danger"));
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
				</div>
            </div>
		);
	}
}

Allocation.propTypes = {
	sessions: React.PropTypes.array,
	blocks: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		sessions: state.sessions,
		blocks: state.blocks,
		alert: state.alert
	};
})(Allocation);
