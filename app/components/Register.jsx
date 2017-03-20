const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
const {hashHistory} = require('react-router');


/* all actions needed */
const actions = require('alertActions');


class Register extends React.Component{
	componentWillMount(){
		/* If user exist, login */
		axios.get('/login').then( ()=>{
			hashHistory.push('/login');
			this.props.dispatch(actions.setAlert(true, "User for app found. Please login", "success"));
		});
	}

	register(e){
		e.preventDefault();

		axios.post('/register', {
			userName: this.refs.userName.value,
			password: this.refs.password.value,
			confirmPassword: this.refs.confirmPassword.value,
		}).then( ()=>{
            /* Successfully registered */
			hashHistory.push('/login');
			this.props.dispatch(actions.setAlert(true, "Successfully Registered", "success"));
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

	resetInput(event) {
		$(event.target).removeClass('greened');
	}

	render(){
		return <div className="container">
			<div className="container row">
                <div className="absolute-center is-responsive col-xs-12 col-sm-6 col-md-3 ">
                    <form id="login-form" className="greened">
						<h1 className="logo">Alloc</h1>
						<hr/>
						<p>No Admin found. Please Register as Admin.</p>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" ref="userName" onChange={this.resetInput}></input>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" ref="password" onChange={this.resetInput}></input>
                        </div>
						<div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" ref="confirmPassword" onChange={this.resetInput}></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default" onClick={(e)=>this.register(e)}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(Register);
