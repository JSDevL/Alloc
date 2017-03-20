const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');


/* all actions needed */
const actions = require('alertActions');


class CombiSidebar extends React.Component{
	// componentDidMount(){
		// const component = this;
		// $(this.refs.combiWell).on("sortreceive", function( event, ui ){
		// 	component.removeBatch(ui.item, ui.sender, $(this));
		// });
	// }

	// removeBatch(batch, from, to){
	// 	batch = JSON.parse(batch.attr('data-batch'));
	// 	axios.put(`/alloc/rooms/${batch.room}/batches`, {
	// 		batch: batch
	// 	}).then( (response)=>{
	// 		this.props.dispatch(actions.setAlert(true, `batch unassigned`, "success"));
	// 	});
	// }

	render(){
		return <div className="col-xs-4 col-batches">
			<div className="page-header">
				<h1>Combinations</h1>
			</div>
			<div id="combi-items-container" className="well combi-well row connectedSortable" ref="combiWell">
				{
					this.props.session.batches.map( (batch)=>{
						return <a key={batch._id} className="batch-item btn btn-success col-xs-12 col-sm-12 col-md-6">
							{batch.year}{batch.combination} <span className="badge">{batch.strength}</span>
						</a>;
					} )
				}
			</div>
		</div>;
	}
}

CombiSidebar.propTypes = {
	session: React.PropTypes.object,
	alert: React.PropTypes.object,
	dispatch: React.PropTypes.func
};

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(CombiSidebar);