export const setAlert = function(show, message, style){
    return {
        type: "SET_ALERT",
        show: show,
        message: message,
        style: style
    }
}

export const resetAlert = function(){
    return {
        type: "RESET_ALERT"
    }
}
