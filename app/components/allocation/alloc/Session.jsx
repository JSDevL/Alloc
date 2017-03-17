// Morning session


const React = require('react');
const {connect} = require('react-redux');
/*  all child components   */
const Blocks = require('./session/Blocks');
const CombiSidebar = require('./session/CombiSidebar');

class Home extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return <div className="row">
			<Blocks blocks={this.props.blocks}/>

			<CombiSidebar session={this.props.sessions[1]} combinations={this.props.combinations}/>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		blocks: state.blocks,
		combinations: state.combinations,
		sessions: state.sessions,
		alert: state.alert
	};
})(Home);
