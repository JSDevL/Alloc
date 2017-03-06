var _ = require('underscore');

module.exports = function(alert, action){
    if(alert===undefined){
        alert = {
            show: false,
            message: '',
            style: ''
        }
    }

    switch(action.type){
        case "SET_ALERT":
            return {
                show: action.show,
                message: action.message,
                style: action.style
            }
        case "RESET_ALERT":
            return {
                show: false,
                message: '',
                style: ''
            }
        default:
            return alert
    }
}
