const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));
/* all child components */
const Conflicts = require('./Conflicts.jsx');

class Levels extends React.Component{
	addCombi(e){
		e.preventDefault();
		axios.post(`/combinations`, {
			name: this.refs.name.value,
			duration: this.refs.duration.value,
			gradLevel: this.props.level
		}).then( (response)=>{
			const newCombi = response.data;
			this.props.dispatch(actions.addCombi(newCombi));
			this.props.dispatch(actions.setAlert(true, "New Combi created", "success"));
            /* reset input fields */
			this.refs.name.value = '';
			this.refs.duration.value = '3';
		}).catch( (error)=>{
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

	removeCombi(combi){
		// remove combi
		axios.delete(`/combinations/${combi._id}`).then( (response)=>{
			// to fill
			const updatedCombis = response.data;
			this.props.dispatch(actions.getCombis(updatedCombis));
			this.props.dispatch(actions.setAlert(true, "updated", "success"));
		}).catch( (error)=>{
			let err = error.response.data;
			this.props.dispatch(actions.setAlert(true, err.message, "danger"));
		});
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">Combinations for {this.props.level}</div>

				<div className="panel-body">
					<form className="form-inline">
						<div className="form-group">
							<label>Name:</label>
							<input type="text" className="form-control" ref="name"/>
						</div>
						<div className="form-group">
							<label>Duration:</label>
							<input type="text" className="form-control" ref="duration" defaultValue="3"/>
						</div>
						<button className="btn" onClick={(e)=>this.addCombi(e)}>Add combination</button>
					</form>
				</div>

				<table className="table table-bordered table-striped">
					<thead>
						{
							( ()=>{
								if( _.find(this.props.combinations, (combi)=>{ return combi.gradLevel === this.props.level }) ){
									return <tr>
										<th>ID</th>
										<th>Name</th>
										<th>Conflicts</th>
										<th></th>
									</tr>;
								}
							} )()
						}
					</thead>
					<tbody>
						{
							this.props.combinations.map( (combi)=>{
								if( combi.gradLevel === this.props.level )
									return <tr key={combi._id}>
										<td>{combi._id}</td>
										<td>{combi.name}</td>
										<td><Conflicts combi={combi}/></td>
										<td><button className="btn" onClick={ ()=>this.removeCombi(combi) }>Remove</button></td>
									</tr>;
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(Levels);
