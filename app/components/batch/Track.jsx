const React = require('react');

class Track extends React.Component{
	render(){
		const status = this.props.status;
		const printProgressStatus = (i) => {
			return status[i] ? "progress-bar progress-bar-success active" : "progress-bar progress-bar-success deactive";
		};

		return (
			<div className="progress">
				<div className={ printProgressStatus(0) } style={{width: 50+'%'}}>
					<p><span className="badge">1</span> <a href="#/combinations/">Combinations and Conflicts</a></p>
				</div>
				<div className={ printProgressStatus(1) } style={{width: 50+'%'}}>
					<p><span className="badge">2</span> <a href="#/combinations/combinations-details">Combinaton Details</a></p>
				</div>
			</div>
		);
	}
}

module.exports = Track;
