const React = require('react');
const {connect} = require('react-redux');
const {hashHistory, Link} = require('react-router');
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

	render(){
		return <nav id="navigation-bar" className="navbar greened">
			<div className="container">
				<div className="navbar-header">
					<Link to="/home" className="navbar-brand logo">Alloc</Link>
				</div>

				<ul className="nav navbar-nav navbar-left">
					<li><Link>Home</Link></li>
					<li><Link>About</Link></li>
					<li><Link>Extras</Link></li>
				</ul>

				{
					(()=>{
						return <ul className="nav navbar-nav navbar-right">
							<li><Link>Change Password</Link></li>
							<li><Link to="/" onClick={()=>this.logOut()}>Logout</Link></li>
						</ul>;
					})()
				}
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
