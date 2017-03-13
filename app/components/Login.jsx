const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
const {hashHistory} = require('react-router');

/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('userActions'));


class Login extends React.Component{
	componentDidMount(){
        // check if user is loggedIn
		let _id = $.cookie('_id');
		let userName = $.cookie('userName');
        // if loggedIn redirect to home
		if(_id && userName)
			hashHistory.push('/home');
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
            /* not an express error */
			if(!error.response){
				return console.log(error);
			}
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
					$(this.refs[error]).addClass('bg-danger');
				}
				this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
			} else {
				this.props.dispatch(actions.setAlert(true, err.message, "danger"));
			}
		});
	}


	render(){
		return <div className="container">
			<div className="container row">
                <div className="absolute-center is-responsive">
                    <form id="login-form" className="col-sm-12 col-md-10 greened">
						<h1 className="logo">Alloc</h1>
						<hr/>
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
