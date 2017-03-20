const React = require('react');
// const axios = require('axios');
// const {connect} = require('react-redux');


/* all child components */
const Item = require('./Item');


class CombiSidebar extends React.Component{
	render(){
		return <div className="col-xs-4 col-batches">
			<div className="page-header">
				<h1>Combinations</h1>
			</div>
			<div id="combi-items-container" className="well combi-well row connectedSortable" ref="combiWell">
			{
				( ()=>{

					const items = [];
					_.each(this.props.session.batches, (batch)=>{
						items.push( <Item key={batch._id} batch={batch}/> );
					} );
					return items;

				} )()
			}
			</div>
		</div>;
	}
}

CombiSidebar.propTypes = {
	session: React.PropTypes.object
};

module.exports = CombiSidebar;