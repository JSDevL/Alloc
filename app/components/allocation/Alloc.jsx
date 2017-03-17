const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));
Object.assign(actions, require('sessionsActions'));
Object.assign(actions, require('blocksActions'));
/*  all child components   */
const Session = require('./alloc/Session');

class Alloc extends React.Component{ 
	constructor(props){
		super(props);

		this.props.dispatch(actions.setAlert(true, "Loading... Please wait", "warning"));

		/* get combinations from DB */
		axios.get(`/combinations`).then( (response)=>{
			const allCombis = response.data;
			/* get sessions from DB */
			axios.get('/sessions').then( (response)=>{
				const sessions = response.data;
				/* get sessions from DB */
				axios.get("/alloc/blocks").then( (response)=>{
					const allBlocks = response.data;
					this.props.dispatch(actions.getCombis(allCombis));
					this.props.dispatch(actions.getSessions(sessions));
					this.props.dispatch(actions.getBlocks(allBlocks));
					this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
				});
			});
		}).catch( (error)=>{
			return console.log(error);
		});
	}

	render(){
		return (
            <div id="alloc">
				{
					( ()=>{
						if(this.props.combinations.length && this.props.sessions.length && this.props.blocks.length)
							return <Session/>;
					} )()
				}
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		blocks: state.blocks,
		combinations: state.combinations,
		sessions: state.sessions,
		alert: state.alert
	};
})(Alloc);
