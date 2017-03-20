const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');


class Rooms extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			rooms: []
		};
	}

	componentWillMount(){
		if(_.isEmpty(this.state.rooms)){
			/* get initial rooms from DB */
			axios.get(`/blocks/${this.props.blockID}/floors/${this.props.floorID}/rooms`).then( (response)=>{
				// set state when rooms are received, avoid infinite loops
				this.setState({
					rooms: response.data
				});
				this.props.dispatch(actions.setAlert(true, "Loaded rooms", "success"));
			}).catch( (error)=>{
				if(error.response && error.response.data.message === "Need to login"){
					/* if not loggedIn */
					this.props.dispatch(actions.setAlert(true, "Not logged In", "danger"));
				} else if (error.response){
					this.props.dispatch(actions.setAlert(true, "Cannot read rooms", "danger"));
				} else {
					/* if not an axios XHR error */
					throw error;
				}
			});
		}
	}

	componentDidMount(){
		

		
	}

	componentDidUpdate(){
		// after rooms are added to state, make sortable
		_.each(this.state.rooms, (room)=>{
			$(`#combi-items-container, #${room._id}-left, #${room._id}-right`).sortable({
				connectWith: ".connectedSortable"
			}).disableSelection();

			const component = this;
			$(`#${room._id}-left`).on("sortreceive", function( event, ui ){
				// component.getBatch("left", ui.item, ui.sender, $(this));
				console.log($(ui.item).data("foo"));
			});

			$(`#${room._id}-right`).on("sortreceive", function( event, ui ){
				// component.getBatch("right", ui.item, ui.sender, $(this));
			});
		});
	}

	getBatch(side, item, from, to){
		console.log(item);
	}

	render(){
		return <div className="col-xs-12">
			<div className="row panel-container">
			{	!_.isEmpty(this.state.rooms) &&
				this.state.rooms.map( (room)=>{
					return <div className="panel panel-default col-xs-12 col-md-6">
						<div className="panel-heading">
							<h3 className="panel-title">Room {room.number} <span className="badge">{room.benches}</span></h3>
						</div>
						<div className="panel-body">
							<div className="row">
								<div className="col-xs-6">
									<div id={`${room._id}-left`} className="well room-well left connectedSortable">
									</div>
								</div>
								<div className="col-xs-6">
									<div id={`${room._id}-right`} className="well room-well right connectedSortable">
									</div>
								</div>
							</div>
						</div>
					</div>;
				})
			}
			</div>
		</div>;
	}
}

Rooms.propTypes = {
	blockID: React.PropTypes.string,
	floorID: React.PropTypes.string,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(Rooms);