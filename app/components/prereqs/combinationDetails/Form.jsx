const _ = require('underscore');
const axios = require('axios');
const React = require('react');
const {connect} = require('react-redux');
/* all actions required */
const actions = require('alertActions');
Object.assign(actions, require('combinationsActions'));

class Levels extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			found: false,
			prefix: "",
			strength: 1,
			exclusions: []
		};
	}

	componentDidMount(){
		let batch = null;
		/* check if component exits and populate */
		if( batch = _.find(this.props.combi.batches, (batch)=>{ if( batch && batch.year === this.props.year ) return true } ) )
			this.setState({
				found: true,
				prefix: batch.prefix,
				strength: batch.strength,
				exclusions: batch.exclusions
			});
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
			exclusions: _.reject(this.state.exclusions, function(exclusion){ return exclusion === ex })
		});
	}

	addBatch(e){
		e.preventDefault();

		axios.post(`/combinations/${this.props.combi._id}/batches`, {
			year: this.props.year,
			prefix: this.state.prefix,
			strength: this.state.strength,
			exclusions: this.state.exclusions
		}).then( (response)=>{
            /* Successfully registered */
			this.props.dispatch(actions.setAlert(true, "Added Batch", "success"));
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

	updateBatch(e){
		e.preventDefault();

		axios.put(`/combinations/${this.props.combi._id}/batches`, {
			year: this.props.year,
			prefix: this.state.prefix,
			strength: this.state.strength,
			exclusions: this.state.exclusions
		}).then( (response)=>{
            /* Successfully registered */
            this.props.dispatch(actions.setAlert(true, "Updated Batch", "success"));
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

	render(){
		return (
			<form>
				<div className="form-group">
					<label>Roll number prefix:</label>
					<input type="text" className="form-control" value={this.state.prefix} onChange={(e)=>this.setState({ prefix: e.target.value })}/>
				</div>
				<div className="form-group">
					<label>Strength</label>
					<input type="text" className="form-control" value={this.state.strength} onChange={(e)=>this.setState({ strength: e.target.value })}/>
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
								let tEx = exclusion;
								if(parseInt(exclusion) < 10)
									exclusion = "0" + exclusion;
								return <button key={this.combi+'-'+this.year+'-'+exclusion} className="btn btn-default" onClick={(e)=>this.removeExclusion(e, tEx)}>{this.state.prefix+exclusion}</button>
							})
						}
					</div>
				</div>

				{
					( ()=>{
						if(this.state.found)
							return <button className="btn btn-primary" onClick={(e)=>this.updateBatch(e)}>Update</button>
						else
							return <button className="btn btn-primary" onClick={(e)=>this.addBatch(e)}>Create</button>
					} )()
				}
			</form>
		);
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(Levels);
