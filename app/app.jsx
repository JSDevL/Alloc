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
/* Batch */
const Batch = require('Batch');
const BatchInputs = require('batch/BatchInputs');
//const BatchDetails = require('batch/BatchDetails');
/* sessions */
const Sessions = require('Sessions');
/* Batch to sessions */
//const BatchToSessions = require('BatchToSessions');
/* allocation */
//const Allocation = require('Allocation');


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

                <Route path="register" component={Register}></Route>

                <Route path="home" component={Home}></Route>

                <Route path="building" component={Building}></Route>

                <Route path="batches" component={Batch}>
                    <IndexRoute component={BatchInputs}></IndexRoute>
                </Route>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

        //<Route path="batch-details" component={BatchDetails}></Route>

//<Route path="batch-to-sessions" component={BatchToSessions}></Route>

// <Route path="sessions" component={Sessions}></Route>

// <Route path="allocation" component={Allocation}></Route>