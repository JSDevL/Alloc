import React from 'react';
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('roomsActions');
Object.assign(actions, require('alertActions'));

/* all child Components */
const FloorInput = require('./FloorInput.jsx');

class RoomInput extends React.Component{
    componentDidMount(){
        /* get initial rooms from DB */
        axios.get("/rooms")
        .then( (response)=>{
            const allRooms = response.data;
            this.props.dispatch(actions.getRooms(allRooms));
            this.props.dispatch(actions.setAlert(true, "Loaded", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            this.props.dispatch(actions.setAlert(true, err.message, "danger"));
        });
    }

    postRoom(){
        axios.post('/rooms', {
            number: this.refs.number.value,
            benches: this.refs.benches.value
        })
        .then( (response)=>{
            const newRoom = response.data;
            this.props.dispatch(actions.addRoom(newRoom));
            this.props.dispatch(actions.setAlert(true, "New Room created", "success"));
            /* reset input fields */
            this.refs.number.value = this.refs.benches.value = '';
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
                    $(this.refs[err.errors[error].path]).addClass('bg-danger');
                }
                this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
            } else {
                this.props.dispatch(actions.setAlert(true, err.message, "danger"));
            }
        });
    }

    deleteRoom(_id){
        axios.delete(`/rooms/${_id}`)
        .then( (response)=>{
            const deleteID = response.data;
            this.props.dispatch(actions.deleteRoom(deleteID));
            this.props.dispatch(actions.setAlert(true, "Room Deleted", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            this.props.dispatch(actions.setAlert(true, err.message, "danger"));
        });
    }

    resetInput(event) {
        $(event.target).removeClass('bg-danger');
    }

    render() {
        return (
            <div>
                <h4>Enter Rooms</h4>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Room Number</th>
                            <th>No of Benches</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.rooms.map( (room)=>{
                                return(
                                    <tr key={room._id}>
                                        <td>{room._id}</td>
                                        <td>{room.number}</td>
                                        <td>{room.benches}</td>
                                        <td><button className="btn" onClick={ ()=>this.deleteRoom(room._id) }>Remove Room</button></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <td><input type="text" placeholder="Enter Number" ref="number" onChange={this.resetInput}></input></td>
                            <td><input type="text" placeholder="Enter Benches" ref="benches" onChange={this.resetInput}></input></td>
                            <td><button className="btn" onClick={ ()=>this.postRoom() }>Add Room</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = connect((state)=>{
    return {
        rooms: state.rooms,
        alert: state.alert
    }
})(RoomInput);
