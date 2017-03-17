const React = require('react');
const {connect} = require('react-redux');
const {hashHistory, Link} = require('react-router');
const axios = require('axios');
/*  all actions requried */
const actions = require('userActions');
Object.assign(actions, require('alertActions'));

class NavigationBar extends React.Component{
	constructor(props){
		super(props);
        /* check token from cached cookie */
		let _id = $.cookie('_id');
		let userName = $.cookie('userName');
		/* if loggedIn */
		if(_id && userName)
			this.props.dispatch(actions.logIn({
				_id: _id,
				userName: userName
			}));
		else
			hashHistory.push('/');
	}

	logOut(){
        /* remove token from cached cookie */
		$.removeCookie('token', { path: '/' });
		$.removeCookie('_id', { path: '/' });
		$.removeCookie('userName', { path: '/' });
        /* Successfully logged out */
		this.props.dispatch(actions.logOut());
		this.props.dispatch(actions.setAlert(true, "Successfully logged out", "success"));
		hashHistory.push('/');
	}

	changePassword(){
		axios.put("/login", {
			userName: $.cookie('userName'),
			oldPwd: this.refs.oldPwd.value,
			newPwd: this.refs.newPwd.value,
			repPwd: this.refs.repPwd.value
		}).then( (response)=>{
			$('#change-pwd-modal').modal('hide');
			this.props.dispatch(actions.setAlert(true, "Password has been changed. Use new password to login next time", "success"));
		}).catch( (error)=>{
			/* The request was made, but the server responded with a status code that falls out of the range of 2xx */
			if( error.response.data.errors ){
				let messages = [];
				_.each(error.response.data.errors, (error, key)=>{
					messages.push( error.message );
					$(this.refs[error.path]).addClass('greened');
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
		return <nav id="navigation-bar" className="navbar greened">
			<div className="container">
				<div className="navbar-header">
					<Link to="/home" className="navbar-brand logo">Alloc</Link>
				</div>

				<ul className="nav navbar-nav navbar-left">
					<li><a href="#/">Home</a></li>
					<li><Link>About</Link></li>
				</ul>

				<ul className="nav navbar-nav navbar-right">
					<li><a href="#" data-toggle="modal" data-target="#change-pwd-modal">Change Password</a></li>
					<li><Link to="/" onClick={()=>this.logOut()}>Logout</Link></li>
				</ul>
			</div>

			<div className="modal fade" id="change-pwd-modal" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label>Old Password</label>
									<input type="password" className="form-control" ref="oldPwd" onChange={this.resetInput}/>
								</div>
								<div className="form-group">
									<label>Password</label>
									<input type="password" className="form-control" ref="newPwd" onChange={this.resetInput}/>
								</div>
								<div className="form-group">
									<label>Repeat Password</label>
									<input type="password" className="form-control" ref="repPwd" onChange={this.resetInput} />
								</div>
								<button type="button" className="btn btn-success" onClick={()=>this.changePassword()}>Change Password</button>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</nav>;
	}
}

module.exports = connect((state)=>{
	return {
		user: state.user,
		alert: state.alert
	};
})(NavigationBar);
