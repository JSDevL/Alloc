const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('batchesActions'));


class Details extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			exclusions: this.props.batch.exclusions
		};
	}
	
	addExclusion(e){
		e.preventDefault();
		this.setState({ 
			exclusions: [
				...this.state.exclusions, 
				this.refs.exclusion.value
			] 
		});
		e.target.value = '';
	}

	removeExclusion(e, ex){
		e.preventDefault();
		this.setState({ 
			exclusions: _.reject(this.state.exclusions, function(exclusion){ return exclusion === ex; })
		});
	}

	updateBatch(e){
		e.preventDefault();

		axios.put(`/batches/${this.props.batch._id}`, {
			prefix: this.refs.prefix.value,
			strength: this.refs.strength.value,
			exclusions: this.state.exclusions
		}).then( (response)=>{
			this.props.dispatch(actions.setAlert(true, "Updated Batch Details", "success"));
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code that falls out of the range of 2xx */
			if( error.response.data.errors ){
				let messages = [];
				_.each(error.response.data.errors, (error, key)=>{
					messages.push( error.message );
					$(this.refs[ error.path ]).addClass('greened');
				});
				this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
			} else if( error.response.data.message ) {
				this.props.dispatch(actions.setAlert(true, error.response.data.message, "danger"));
			}
		});
	}

	render(){
		return (
			<form>
				<div className="form-group">
					<label>Roll number prefix:</label>
					<input type="text" className="form-control" defaultValue={this.props.batch.prefix} ref="prefix"/>
				</div>
				<div className="form-group">
					<label>Strength</label>
					<input type="text" className="form-control" defaultValue={this.props.batch.strength} ref="strength"/>
				</div>
				<div className="form-group">
					<label>Exclusions</label>
					<input type="text" className="form-control" ref="exclusion"/>
				</div>
				<div className="form-group">
					<button className="btn btn-default" onClick={(e)=>this.addExclusion(e)}>Add Exclusion</button>
				</div>
				<div className="form-group">
					<div className="well">
						{ 
							this.state.exclusions.map( (exclusion)=>{
								// add trailing zeroes for numbers less than 10
								let printEx = exclusion;
								if(parseInt(exclusion) < 10)
									printEx = "0" + exclusion;
								return <button key={this.props.batch.combination+'-'+this.props.batch.year+'-'+printEx} className="btn btn-default" onClick={(e)=>this.removeExclusion(e, exclusion)}>{this.props.batch.prefix+printEx}</button>;
							})
						}
					</div>
				</div>
				<div>
					<button type="submit" className="btn btn-success" onClick={(e)=>this.updateBatch(e)}>Update Batch Details</button>
				</div>
			</form>
		);
	}
}

Details.propTypes = {
	batch: React.PropTypes.object,
	batches: React.PropTypes.array,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		batches: state.batches,
		alert: state.alert
	};
})(Details);
