const React = require('react');
/*  all child components   */
const Room = require('./rooms/Room');

class Rooms extends React.Component{
	render(){
		return <div>
			{
				this.props.rooms.map( function(room){
					return <Room key={room._id} room={room}/>;
				})
			}
		</div>;
	}
}

module.exports = Rooms;