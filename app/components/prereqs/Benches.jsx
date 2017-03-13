const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));
/* all child components */
const Track = require('./Track.jsx');
const Blocks = require('./benches/Blocks.jsx');

class Prereqs extends React.Component{
	componentDidMount(){
		/* get initial blocks from DB */
		axios.get("/blocks").then( (response)=>{
			const allBlocks = response.data;
			this.props.dispatch(actions.getBlocks(allBlocks));
			this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
		}).catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
			if(!error.response){
				/* standard error occured */
				return console.log(error);
			}
		});
	}

	render(){
		return (
            <div>
				<Track status={[1, 0, 0]}/>
				<Blocks/>
            </div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		blocks: state.blocks,
		alert: state.alert
	};
})(Prereqs);
