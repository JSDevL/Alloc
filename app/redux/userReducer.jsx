module.exports = function(user, action){
    if(user===undefined){
        user = {
            loggedIn: false,
            _id: '',
            name: ''
        }
    }

    switch(action.type){
        case "LOGGED_IN":
            return {
                loggedIn: true,
                _id: action._id,
                name: action.name
            }
        case "LOGGED_OUT":
            return {
                loggedIn: false,
                _id: '',
                name: ''
            }
        default:
            return user;
    }
}
