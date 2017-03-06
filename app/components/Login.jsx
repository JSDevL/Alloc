const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
/* all actions needed */
const actions = require('alertActions');
Object.assign(actions, require('userActions'));

class Login extends React.Component{
    login(e){
        e.preventDefault();

        axios.post('/login', {
            userName: this.refs.userName.value,
            password: this.refs.password.value
        })
        .then( (response)=>{
            /* Successfully logged in */
            const user = response.data;
            this.props.dispatch(actions.logIn(user));
            this.props.dispatch(actions.setAlert(true, "logged in", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            this.props.dispatch(actions.setAlert(true, err.message, "danger"));
        });
    }

    render(){
        return <div>
            <form>
                <label>username</label>
                <input type="text" ref="userName"></input>
                <label>password</label>
                <input type="password" ref="password"></input>

                <button onClick={(e)=>this.login(e)}>Login</button>
            </form>
        </div>
    }
}

module.exports = connect((state)=>{
    return {
        alert: state.alert
    }
})(Login);
