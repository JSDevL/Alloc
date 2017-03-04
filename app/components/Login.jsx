const React = require('react');
const axios = require('axios');

class Login extends React.Component{
    componentDidMount(){
    }

    login(e){
        e.preventDefault();

        axios.post('/login', {
            userName: this.refs.userName.value,
            password: this.refs.password.value
        })
        .then( (response)=>{
            console.log("logged in");
        })
        .catch( (error)=>{
            console.log(error);
        });
    }

    render()
    {
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

module.exports = Login;
