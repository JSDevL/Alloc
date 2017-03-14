const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

/*  bootstrap styles and third party global dependencies  */
require('style!css!bootstrap/dist/css/bootstrap.min.css');
require('script!underscore/underscore.js');
/*  custom styles  */
require('style!css!sass!./styles/App.scss');

/*  react components  */
const Alert = require('Alert');
const Login = require('Login');
const Home = require('Home');
const Register = require('Register');
/* prereqs */
const Prereqs = require('Prereqs');
const Benches = require('prereqs/Benches');
const Combinations = require('prereqs/Combinations');
const CombinationDetails = require('prereqs/CombinationDetails');
/* sessions */
const Sessions = require('Sessions');
const SessionInputs = require('sessions/SessionInputs');
const CombinationsToSessions = require('sessions/CombinationsToSessions');

/*  store   */
const store = require('store').configure();
store.subscribe(()=>{
    //console.log(store.getState())
});

class App extends React.Component{
	render(){
		return(
            <div>
                <Alert/>
                {this.props.children}
            </div>
		);
	}
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}></IndexRoute>
                <Route path="home" component={Home}></Route>
                <Route path="register" component={Register}></Route>
                <Route path="prereqs" component={Prereqs}>
                    <IndexRoute component={Benches}></IndexRoute>
                    <Route path="combinations" component={Combinations}></Route>
                    <Route path="combination-details" component={CombinationDetails}></Route>
                </Route>
                <Route path="sessions" component={Sessions}>
                    <IndexRoute component={SessionInputs}></IndexRoute>
                    <Route path="combinations-to-sessions" component={CombinationsToSessions}></Route>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
