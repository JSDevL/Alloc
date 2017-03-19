const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');


/*  custom styles  */
require('style!css!sass!./styles/App.scss');


/*  app children components   */
/* Alert plugin */
const Alert = require('plugins/Alert');
/* Home page */
const Home = require('Home');
/* Login page */
const Login = require('Login');
/* Register page */
const Register = require('Register');
/* Batch Page */
const Batch = require('Batch');
const BatchInputs = require('batch/BatchInputs');


/*  store   */
const store = require('store').configure();
store.subscribe(()=>{
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

                <IndexRoute component={Home}></IndexRoute>

                <Route path="login" component={Login}></Route>

                <Route path="register" component={Register}></Route>

                <Route path="batches" component={Batch}>
                    <IndexRoute component={BatchInputs}></IndexRoute>
                </Route>

            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);