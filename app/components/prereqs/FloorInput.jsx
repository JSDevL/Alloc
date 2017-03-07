import React from 'react'
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'))

class FloorInput extends React.Component{
    postFloor(blockID){
        axios.post(`/blocks/${blockID}/floors`, {
            number: this.refs.number.value
        })
        .then( (response)=>{
            const updatedBlock = response.data;
            this.props.dispatch(actions.updateBlock(updatedBlock));
            this.props.dispatch(actions.setAlert(true, "New Floor created", "success"));
            /* reset input fields */
            this.refs.number.value = '';
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            /* if err object contains validation errors */
            if(err.errors){
                console.log(err.errors);
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

    deleteFloor(blockID, floorID){
        axios.delete(`/blocks/${blockID}/floors/${floorID}`)
        .then( (response)=>{
            const updatedBlock = response.data;
            this.props.dispatch(actions.updateBlock(updatedBlock));
            this.props.dispatch(actions.setAlert(true, "FLoor Deleted", "success"));
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
    }loor

    render() {
        const block = this.props.block;
        return (
            <div>

                <h4>Enter Floors for Block {block.blockName}</h4>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            block.floors.map( (floor)=>{
                                return <tr key={floor._id}>
                                    <td>{floor._id}</td>
                                    <td>{floor.number}</td>
                                    <td><button className="btn" onClick={ ()=>this.deleteFloor(block._id, floor._id) }>Remove Floor</button></td>
                                </tr>
                            })
                        }
                        <tr>
                            <td></td>
                            <td><input type="text" placeholder="Enter Floor Number" ref="number" onChange={this.resetInput}></input></td>
                            <td><button className="btn" onClick={()=>this.postFloor(block._id)}>Add Floor</button></td>
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
    }
})(FloorInput);
