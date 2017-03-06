export const logIn = function(user){
    return {
        type: "LOGGED_IN",
        _id: user._id,
        name: user.userName
    }
}

export const logOut = function(){
    return {
        type: "LOGGED_OUT",
    }
}
