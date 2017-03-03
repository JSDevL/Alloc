/*  all major dependencies    */

var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, Link} = require('react-router');
var {Provider} = require('react-redux')

/*  bootstrap styles and third party global dependencies  */

require('style!css!bootstrap/dist/css/bootstrap.min.css');
require('script!underscore/underscore.js');

/*  store   */

var store = require('store').configure();

store.subscribe(()=>{
    console.log(store.getState())
})

/*  all child components   */

var Prereqs = require('Prereqs');

class App extends React.Component{
    render(){
        return(
            <div>
                <ul>
                    <li><Link to="/">Building Prereqs</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Prereqs}></IndexRoute>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
