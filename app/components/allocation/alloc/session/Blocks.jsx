const React = require('react');
/*  all child components   */
const Floors = require('./blocks/Floors');

class Blocks extends React.Component{
	render(){
		return <div className="col-xs-8">
			{
				this.props.blocks.map( function(block){
					return <div key={block._id}>
						<div className="page-header">
							<h1>{block.blockName} Block</h1>
						</div>
						
						<Floors floors={block.floors}/>;
					</div>;
				})
			}
		</div>;
	}
}

module.exports = Blocks;