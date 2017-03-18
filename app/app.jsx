const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

/*  custom styles  */
require('style!css!sass!./styles/App.scss');

/*  react components  */
const Alert = require('Alert');
const Login = require('Login');
const Home = require('Home');
const Register = require('Register');
/* building */
const Building = require('Building');
/* combinations */
const Combinations = require('Combinations');
const CombinationsInputs = require('combinations/CombinationsInputs');
const CombinationsDetails = require('combinations/CombinationsDetails');
/* sessions */
const Sessions = require('Sessions');
/* combinations to sessions */
const CombinationsToSessions = require('CombinationsToSessions');
/* allocation */
const Allocation = require('Allocation');

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

                <Route path="building" component={Building}></Route>

                <Route path="combinations" component={Combinations}>
                    <IndexRoute component={CombinationsInputs}></IndexRoute>
                    <Route path="combinations-details" component={CombinationsDetails}></Route>
                </Route>

                <Route path="sessions" component={Sessions}></Route>

                <Route path="combinations-to-sessions" component={CombinationsToSessions}></Route>

                <Route path="allocation" component={Allocation}></Route>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
