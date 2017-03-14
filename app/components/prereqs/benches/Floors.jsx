import React from 'react';
const {connect} = require('react-redux');
const axios = require('axios');
/*  all required actions   */
const actions = require('blocksActions');
Object.assign(actions, require('alertActions'));

const Rooms = require('./Rooms.jsx');


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
			this.props.dispatch(actions.setAlert(true, "Floor Deleted", "success"));
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
        const block = this.props.block;
        return (
            <div>
                <h4>Enter Floors for {block.blockName} Block</h4>
                {
                    block.floors.map( (floor)=>{
                        return <div key={floor._id} className="panel-group" role="tablist">
							<div className="panel panel-default">
                                <div className="panel-heading" role="tab">
									<h4 className="panel-title">
										<table className="table table-bordered table-striped">
											<thead>
                                                <tr onClick={ ()=>$(`#${floor._id}`).collapse('toggle') } >
                                                    <th className="table-column">Id</th>
                                                    <th className="table-column">Number</th>
                                                    <th className="table-column"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr onClick={ ()=>$(`#${floor._id}`).collapse('toggle') } >
                                                    <td className="table-column">{floor._id}</td>
                                                    <td className="table-column">{floor.number}</td>
                                                    <td className="table-column"><button className="btn" onClick={ ()=>this.deleteFloor(block._id, floor._id) }>Remove Floor</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div id={floor._id} className="panel-collapse collapse" role="tabpanel">
                                            <div className="panel-body">
                                                <Rooms key={floor._id} floor={floor} block={block}/>
                                            </div>
                                        </div>
                                    </h4>
                                </div>
                            </div>
                        </div>;
                    })
                }
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <td className="table-column">Floors :</td>
                            <td className="table-column"><input type="text" placeholder="Enter Floor Number" ref="number" onChange={this.resetInput}></input></td>
                            <td className="table-column"><button className="btn" onClick={()=>this.postFloor(block._id)}>Add Floor</button></td>
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
