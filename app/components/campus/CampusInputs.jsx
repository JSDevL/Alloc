const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));


/* all child components */
const Blocks = require('./Blocks.jsx');


class CampusInputs extends React.Component{
	componentDidMount(){
		if(_.isEmpty(this.props.blocks)){
			/* get initial blocks from DB */
			axios.get("/blocks").then( (response)=>{
				const allBlocks = response.data;
				this.props.dispatch(actions.getBlocks(allBlocks));
				this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
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
				<Blocks/>
            </div>
		);
	}
}

CampusInputs.propTypes = {
	blocks: React.PropTypes.array,
	rooms: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		rooms: state.rooms,
		blocks: state.blocks,
		alert: state.alert
	};
})(CampusInputs);