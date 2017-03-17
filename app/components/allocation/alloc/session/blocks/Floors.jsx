const React = require('react');
/*  all child components   */
const Rooms = require('./floors/Rooms');

class Floors extends React.Component{
	render(){
		return <div className="row">
			{
				this.props.floors.map( function(floor){
					return <div key={floor._id}>
						<div className="col-xs-12">
							<a><span className="label label-default">Floor {floor.number}</span></a>
						</div>

						<Rooms rooms={floor.rooms}/>
					</div>;
				})
			}
		</div>;
	}
}

module.exports = Floors;