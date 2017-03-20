const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');


class Rooms extends React.Component{
	// getBatch(side, item, from, to){
	// 	const batch = JSON.parse(item.attr('data-batch'));

	// 	if( from.hasClass('room-well') ){
	// 		axios.put(`/alloc/rooms/${batch.room}/batches`, {
	// 			batch: batch
	// 		}).then( (response)=>{
	// 			this.props.dispatch(actions.setAlert(true, `batch assigned`, "success"));
	// 		});
	// 	}

	// 	batch.room = this.props.room._id;
	// 	batch.side = side;
	// 	item.attr('data-batch', JSON.stringify(batch));

	// 	axios.post(`/alloc/rooms/${this.props.room._id}`, {
	// 		batch: batch
	// 	}).then( (response)=>{
	// 		this.props.dispatch(actions.setAlert(true, `batch assigned`, "success"));
	// 	});
	// }
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
		const component = this;

		$(this.refs.leftWell).on("sortreceive", function( event, ui ){
			component.getBatch("left", ui.item, ui.sender, $(this));
		});

		$(this.refs.rightWell).on("sortreceive", function( event, ui ){
			component.getBatch("right", ui.item, ui.sender, $(this));
		});
	}

	componentDidUpdate(){
		// after rooms are added to state, make sortable
		_.each(this.state.rooms, (room)=>{
			$(`#combi-items-container, #${room._id}-left, #${room._id}-right`).sortable({
				connectWith: ".connectedSortable"
			}).disableSelection();
		});
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
									<div id={`${room._id}-left`} className="well room-well left connectedSortable" ref="leftWell">
									</div>
								</div>
								<div className="col-xs-6">
									<div id={`${room._id}-right`} className="well room-well right connectedSortable" ref="rightWell">
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