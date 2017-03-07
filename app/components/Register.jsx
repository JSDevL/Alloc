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
            /* Successfully registered */
            this.props.dispatch(actions.setAlert(true, "Successfully Registered", "success"));
        })
        .catch( (error)=>{
            /* The request was made, but the server responded with a status code */
            /* that falls out of the range of 2xx */
            let err = error.response.data;
            /* if err object contains validation errors */
            if(err.errors){
                let messages = [];
                for( error in err.errors ){
                    /* get all messages */
                    messages.push( err.errors[error].message );
                    /* add classes to input fields */
                    $(this.refs[error]).addClass('bg-danger');
                }
                this.props.dispatch(actions.setAlert(true, messages.join('::'), "danger"));
            } else {
                this.props.dispatch(actions.setAlert(true, err.message, "danger"));
            }
        });
    }

    resetInput(event) {
        $(event.target).removeClass('bg-danger');
    }

    render(){
        return <div>
            <form>
                <label>username</label>
                <input type="text" ref="userName" onChange={this.resetInput}></input>
                <label>password</label>
                <input type="password" ref="password" onChange={this.resetInput}></input>
                <label>confirm password</label>
                <input type="password" ref="confirmPassword" onChange={this.resetInput}></input>

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
