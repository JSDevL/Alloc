const React = require("react");

class Jumbotron extends React.Component{
	componentDidMount(){
		$(document).on("scroll", ()=>{
			if($(document).scrollTop() > 0){
				$(this.refs.jumbotron).addClass("shrink");
			}
		});
	}

	render(){
		return <div className="jumbotron shrinkable" ref="jumbotron">
			<div className="container">
				{this.props.children}
			</div>
		</div>;
	}
}

module.exports = Jumbotron;