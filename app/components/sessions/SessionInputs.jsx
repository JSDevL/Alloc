const React = require('react');
/* all child components */
const Track = require('./Track.jsx');
const Inputs = require('./sessionInputs/Inputs.jsx');

class SessionInputs extends React.Component{
	render(){
		return (
			<div>
				<Track status={[1]}/>
				<Inputs/>
            </div>
		);
	}
}

module.exports = SessionInputs;
