const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
const {hashHistory} = require('react-router');
/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('userActions'));


class Login extends React.Component{
	componentWillMount(){
        // check if user is loggedIn
		let _id = $.cookie('_id');
		let userName = $.cookie('userName');
        // if loggedIn redirect to home
		if(_id && userName)
			hashHistory.push('/home');

		/* If no users exist, register */
		axios.get('/login').then( ()=>{}).catch( ()=>{
			hashHistory.push('/register');
			this.props.dispatch(actions.setAlert(true, "No user for app found. Please Register", "danger"));
		});
	}

	login(e){
		e.preventDefault();
		axios.post('/login', {
			userName: this.refs.userName.value,
			password: this.refs.password.value
		}).then( (response)=>{
            /* Successfully logged in */
			const user = response.data;
			this.props.dispatch(actions.logIn(user));
			this.props.dispatch(actions.setAlert(true, "logged in", "success"));
			hashHistory.push('/home');
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
		return <div className="container">
			<div className="container row">
                <div className="absolute-center is-responsive col-xs-12 col-sm-6 col-md-3">
                    <form id="login-form" className="greened">
						<h1 className="logo">Alloc</h1>
						<hr/>
						<p>Active Admin found. Please Login.</p>
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" className="form-control" ref="userName"></input>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" className="form-control" ref="password"></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default" onClick={(e)=>this.login(e)}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
	}
}


module.exports = connect((state)=>{
	return {
		user: state.user,
		alert: state.alert
	};
})(Login);
