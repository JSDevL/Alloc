const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
/* all actions needed */
const actions = require('alertActions');

class Register extends React.Component{
    register(e){
        e.preventDefault();

        axios.post('/register', {
            userName: this.refs.userName.value,
            password: this.refs.password.value,
            confirmPassword: this.refs.confirmPassword.value,
        })
        .then( (response)=>{
            /* Successfully logged in */
            this.props.dispatch(actions.setAlert(true, response.data, "success"));
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
                <label>confirm password</label>
                <input type="password" ref="confirmPassword"></input>

                <button onClick={(e)=>this.register(e)}>Register</button>
            </form>
        </div>
    }
}

module.exports = connect((state)=>{
    return {
        alert: state.alert
    }
})(Register);
