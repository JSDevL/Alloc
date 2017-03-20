const React = require('react');
//const axios = require('axios');
const {connect} = require('react-redux');


/* all child components */
const Blocks = require('./Blocks');
const CombiSidebar = require('./CombiSidebar');


class Session extends React.Component{
	render(){
		return <div className="row">
			<Blocks/>
			<CombiSidebar session={this.props.session}/>
		</div>;
	}
}

Session.propTypes = {
	session: React.PropTypes.object
};

module.exports = connect((state)=>{
	return {
		blocks: state.blocks
	};
})(Session);