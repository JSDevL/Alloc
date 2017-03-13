const React = require('react');
const {connect} = require('react-redux');
const actions = require('alertActions');

class Alert extends React.Component{
	componentDidUpdate(prevProps, prevState){
		clearTimeout(this.timer);
        // prevent infinite loop
		if(this.props.alert.show){
			this.timer = setTimeout( ()=>{
				this.props.dispatch(actions.resetAlert());
			}, 5000);
		}
	}

	render(){
		if(this.props.alert.show){
			return <div id="floating-alert" className={`alert alert-${this.props.alert.style} alert-dismissible`} role="alert" ref="alert">
                {
                    this.props.alert.message.split('::').map(function(message, index){
						return <p key={index}>
                            <strong>{message}</strong>
                        </p>;
					})
                }
            </div>;
		} else {
			return <div></div>;
		}
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(Alert);
