const React = require('react');
//const axios = require('axios');
const {connect} = require('react-redux');


/* all child components */
const Rooms = require('./Rooms');



class Blocks extends React.Component{
	render(){
		return <div className="col-xs-8">
			{
				this.props.blocks.map( function(block){
					return <div key={block._id}>
						<div className="page-header">
							<h1>{block.blockName} Block</h1>
						</div>

						<div className="row">
							{
								block.floors.map( function(floor){
									return <div key={floor._id}>
										<div className="col-xs-12">
											<a><span className="label label-default">Floor {floor.number}</span></a>
										</div>
										<div>
											<Rooms blockID={block._id} floorID={floor._id}/>
										</div>
									</div>;
								})
							}
						</div>
					</div>;
				})
			}
		</div>;
	}
}

Blocks.propTypes = {
	blocks: React.PropTypes.array
};

module.exports = connect((state)=>{
	return {
		blocks: state.blocks
	};
})(Blocks);