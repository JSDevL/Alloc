import React from "react";
const {connect} = require("react-redux");
const axios = require("axios");
/*  all required actions   */
const actions = require("alertActions");
/* so we know jquery is used */
const $ = $;
const _ = require("underscore");

class RoomInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			rooms: []
		};
	}

	componentDidMount(){
        /* get initial rooms from DB */
		axios.get(`/blocks/${this.props.block._id}/floors/${this.props.floor._id}/rooms`).then( (response)=>{
			const allRooms = response.data;
			this.setState({
				rooms: allRooms
			});
			this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
		}).catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
			let err = error.response.data;
			this.props.dispatch(actions.setAlert(true, err.message, "danger"));
		});
	}

	postRoom(){
		axios.post(`/blocks/${this.props.block._id}/floors/${this.props.floor._id}/rooms/`, {
			number: this.refs.number.value,
			benches: this.refs.benches.value
		}).then( (response)=>{
			const newRoom = response.data;
			this.setState({
				rooms: [
					...this.state.rooms,
					newRoom
				]
			});
			this.props.dispatch(actions.setAlert(true, "New Room created", "success"));
			/* reset input fields */
			this.refs.number.value = this.refs.benches.value = "";
		})
		.catch( (error)=>{
			/* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
			let err = error.response.data;
            /* if err object contains validation errors */
			if(err.errors){
				let messages = [];
				for( error in err.errors ){
                    /* get all messages */
					messages.push( err.errors[error].message );
                    /* add classes to input fields */
					$(this.refs[err.errors[error].path]).addClass("bg-danger");
				}
				this.props.dispatch(actions.setAlert(true, messages.join("::"), "danger"));
			} else {
				this.props.dispatch(actions.setAlert(true, err.message, "danger"));
			}
		});
	}

	deleteRoom(roomID){
		axios.delete(`/blocks/${this.props.block._id}/floors/${this.props.floor._id}/rooms/${roomID}/`)
		.then( (response)=>{
			debugger;
			const deleteID = response.data;
			let updatedRooms = _.reject(this.state.rooms, function(room){
				return room._id.toString() === deleteID.toString();
			});
			this.setState({
				rooms: updatedRooms
			});
			this.props.dispatch(actions.setAlert(true, "Room Deleted", "success"));
		}).catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
			let err = error.response.data;
			this.props.dispatch(actions.setAlert(true, err.message, "danger"));
		});
	}

	resetInput(event) {
		$(event.target).removeClass("bg-danger");
	}

	render(){
		/* this is coming from redux */
		const block = this.props.block;
		const floor = this.props.floor;
		/* this is coming from state */
		const rooms = this.state.rooms;
		return(
			<div>
				<h4>Enter Rooms for Floor {floor.number} of {block.blockName} Block</h4>
				<table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Number</th>
                            <th>Benches</th>
							<th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.map( (room)=>{
								return <tr key={room._id}>
                                    <td>{room._id}</td>
                                    <td>{room.number}</td>
									<td>{room.benches}</td>
                                    <td><button className="btn" onClick={()=>this.deleteRoom(room._id)}>Remove Room</button></td>
                                </tr>;
							})
                        }
                        <tr>
                            <td></td>
                            <td><input type="text" placeholder="Enter Room Number" ref="number" onChange={this.resetInput}></input></td>
							<td><input type="text" placeholder="Enter Bench Count" ref="benches" onChange={this.resetInput}></input></td>
                            <td><button className="btn" onClick={()=>this.postRoom()} >Add Room</button></td>
                        </tr>
                    </tbody>
                </table>
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(RoomInput);
