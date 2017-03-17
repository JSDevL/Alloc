const React = require('react');
const axios = require('axios');
const {connect} = require('react-redux');
/* all actions needed */
const actions = require('alertActions');

class Room extends React.Component{
	componentDidMount(){
		$(`#combi-items-container, #room-left-${this.props.room.number}-items-container, #room-right-${this.props.room.number}-items-container`).sortable({
			connectWith: ".connectedSortable"
		}).disableSelection();

		const component = this;

		$(this.refs.leftWell).on("sortreceive", function( event, ui ){
			component.getBatch("left", ui.item, ui.sender, $(this));
		});

		$(this.refs.rightWell).on("sortreceive", function( event, ui ){
			component.getBatch("right", ui.item, ui.sender, $(this));
		});
	}

	getBatch(side, item, from, to){
		const batch = JSON.parse(item.attr('data-batch'));

		if( from.hasClass('room-well') ){
			axios.put(`/alloc/rooms/${batch.room}/batches`, {
				batch: batch
			}).then( (response)=>{
				this.props.dispatch(actions.setAlert(true, `batch assigned`, "success"));
			});
		}

		batch.room = this.props.room._id;
		batch.side = side;
		item.attr('data-batch', JSON.stringify(batch));

		axios.post(`/alloc/rooms/${this.props.room._id}`, {
			batch: batch
		}).then( (response)=>{
			this.props.dispatch(actions.setAlert(true, `batch assigned`, "success"));
		});
	}

	populateBatches(side){
		const BatchesForSide = _.filter(this.props.room.batches, function(batch){
			return batch && batch.side === side;
		});

		return BatchesForSide.map( (currentbatch)=>{
			const combiObject = _.find(this.props.combinations, (combi)=>{
				return combi._id.toString() === currentbatch.combination.toString();
			});
			const batchObject = _.find(combiObject.batches, (batch)=>{
				return batch._id.toString() === currentbatch.batch.toString();
			});

			$(`#${batchObject._id}.batch-item`).remove();

			const toSend = {
				combination: combiObject._id,
				batch: batchObject._id,
				room: this.props.room._id
			};

			return <a key={currentbatch.batch} className="batch-item btn btn-success col-xs-12 col-sm-12 col-md-6" data-batch={JSON.stringify(toSend)}>
				{batchObject.year}{combiObject.name} 
				<span className="badge">
					{batchObject.strength}
				</span>
			</a>;
		})
	}

	render(){
		return <div className="col-xs-12 col-md-6">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Room {this.props.room.number}</h3>
				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-xs-6">
							<div className="room well">
								<div id={`room-left-${this.props.room.number}-items-container`} className="room-well connectedSortable" ref="leftWell">
									{
										this.populateBatches("left")
									}
								</div>
							</div>
						</div>
						<div className="col-xs-6">
							<div className="room well">
								<div id={`room-right-${this.props.room.number}-items-container`} className="room-well connectedSortable" ref="rightWell">
									{
										this.populateBatches("right")
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	}
}

module.exports = connect((state)=>{
	return {
		combinations: state.combinations,
		alert: state.alert
	};
})(Room);