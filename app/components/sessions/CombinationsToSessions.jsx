const React = require('react');
/* all child components */
const Track = require('./Track.jsx');

class SessionInputs extends React.Component{
	componentDidMount(){
		const component = this;

		$( "#combinations, #morning" ).sortable({
			connectWith: ".connectedSortable"
		}).disableSelection();

		$( "#morning" ).on( "sortreceive", function( event, ui ) {
			component.myLogger(ui.item, ui.sender, $(this));
		} );
	}

	myLogger(item, sender, receiver){
		console.log(item, sender[0].id, receiver[0].id);
	}

	render(){
		return (
			<div>
				<Track status={[0, 1]}/>
				<div className="row">
					<div className="col-xs-6">
						<div className="page-header">
							<h3>Morning Session</h3>
						</div>
						<div id="morning" className="well connectedSortable">
						</div>

						<div className="page-header">
							<h3>Afternoon Session</h3>
						</div>
						<div className="well">
						</div>

						<div className="page-header">
							<h3>Evening Session</h3>
						</div>
						<div className="well">
						</div>
					</div>
					<div className="col-xs-6">
						<div className="page-header">
							<h3>Combinations</h3>
						</div>
						<div id="combinations" className="well connectedSortable">
							<a className="btn btn-success">1 BCA <span className="badge">34</span></a>
						</div>
					</div>
				</div>
            </div>
		);
	}
}

module.exports = SessionInputs;
