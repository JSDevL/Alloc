const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, hashHistory, Link} = require('react-router');
const {Provider, connect} = require('react-redux');
/*  bootstrap styles and third party global dependencies  */
require('style!css!bootstrap/dist/css/bootstrap.min.css');
require('script!underscore/underscore.js');

/*  all actions requried */
const actions = require('userActions');
Object.assign(actions, require('alertActions'));
/*  store   */
const store = require('store').configure();
store.subscribe(()=>{
    //console.log(store.getState())
});

/*  react components  */
const Register = require('Register');
const Login = require('Login');
const Prereqs = require('Prereqs');
const Alert = require('Alert');
const Combinations = require('Combinations');

class App extends React.Component{
    constructor(props){
        super(props);

        /* check token from cached cookie */
        let _id = $.cookie('_id');
        let userName = $.cookie('userName');
        if(_id && userName)
            this.props.dispatch(actions.logIn({
                _id: _id,
                userName: userName
            }));
    }

    logOut(){
        /* remove token from cached cookie */
        $.removeCookie('token', { path: '/' });
        $.removeCookie('_id', { path: '/' });
        $.removeCookie('userName', { path: '/' });
        /* Successfully logged out */
        this.props.dispatch(actions.logOut());
        this.props.dispatch(actions.setAlert(true, "Successfully logged out", "success"));
    }

    render(){
        return(
            <div>
                <ul>
                    <li><Link to="/">Building Prereqs</Link></li>
                    <li><Link to="/combinations">Combinations</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    {
                        (()=>{
                            if(this.props.user.loggedIn){
                                return <li>
                                    <Link to="/login" onClick={()=>this.logOut()}>Logout</Link>
                                </li>
                            } else {
                                return <li></li>
                            }
                        })()
                    }
                </ul>

                {this.props.children}

                <Alert/>
            </div>
        )
    }
}

App = connect((state)=>{
    return {
        user: state.user,
        alert: state.alert
    }
})(App);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Prereqs}></IndexRoute>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/combinations" component={Combinations}></Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
