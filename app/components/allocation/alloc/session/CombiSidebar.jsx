const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
/* all actions needed */
const actions = require('alertActions');

class CombiSidebar extends React.Component{
	componentDidMount(){
		// affix combinations sidebar to the right
		this.affixCombi();
		// do it again if window is resized
		$(window).resize( ()=>{
			this.affixCombi();
		});
		// attach sortable event
		const component = this;
		$(this.refs.combiWell).on("sortreceive", function( event, ui ){
			component.removeBatch(ui.item, ui.sender, $(this));
		});
	}

	removeBatch(batch, from, to){
		batch = JSON.parse(batch.attr('data-batch'));
		axios.put(`/alloc/rooms/${batch.room}/batches`, {
			batch: batch
		}).then( (response)=>{
			this.props.dispatch(actions.setAlert(true, `batch unassigned`, "success"));
		});
	}

	affixCombi(){
		const $combiWell = $(this.refs.affix);
		$combiWell.width( $(".col-combinations .page-header").width() - 2*parseInt($combiWell.css("padding-top")) );
		$combiWell.css({
			"max-height": ( $(window).outerHeight() - 40 ) + 'px'
		});
		$combiWell.affix({
			offset: {
				top: $combiWell.offset().top
			}
		});
	}

	render(){
		return <div className="col-xs-4 col-combinations">
			<div className="page-header">
				<h1>Combinations</h1>
			</div>
			<div className="combi well" ref="affix">
				<div id="combi-items-container" className="row connectedSortable" ref="combiWell">
					{
						this.props.session.batches.map( (currentBatch)=>{
							const combiObject = _.find(this.props.combinations, (combi)=>{
								return combi._id.toString() === currentBatch.combination.toString();
							});
							const batchObject = _.find(combiObject.batches, (batch)=>{
								return batch._id.toString() === currentBatch.batch.toString();
							});

							const toSend = {
								combination: combiObject._id,
								batch: batchObject._id,
							};

							return <a key={currentBatch.batch} className="batch-item btn btn-success col-xs-12 col-sm-12 col-md-6" id={batchObject._id} data-batch={JSON.stringify(toSend)}>
									{batchObject.year}{combiObject.name} 
									<span className="badge">
										{batchObject.strength}
									</span>
								</a>;
						} )
					}
				</div>
			</div>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		alert: state.alert
	};
})(CombiSidebar);