const React = require('react');
// const axios = require('axios');
//const {connect} = require('react-redux');


class Item extends React.Component{
	componentDidMount(){
		$(this.refs.item).data( "foo", 52 );
	}

	render(){
		return <a className="batch-item btn btn-success col-xs-12 col-sm-12 col-md-6" ref="item">
			{this.props.batch.year}{this.props.batch.combination} <span className="badge">{this.props.batch.strength}</span>
		</a>;
	}
}

Item.propTypes = {
	batch: React.PropTypes.object,
};

module.exports = Item;